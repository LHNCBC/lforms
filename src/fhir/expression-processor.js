// Processes FHIR Expression Extensions
// There are three types of expressions: FHIRPath, x-fhir-query (to a FHIR
// server), and CQL (but we do not yet support CQL).
// Various extensions have an Expression as a value, such as variable,
// initialExpression, calculatedExpression, and answerExpression.  When the
// Expression contains a name, that creates a variable which can be used by
// other Expressions defined either on the same item or a child item.
//
// The general processing pattern is depth-first traversal of the "tree" of the
// Questionnaire's items, and while we go through the expressions we keep track
// of whether a field has changed and whether a variable has changed.  If there
// are any changes, we traverse the tree again, but if the only things that
// changed were variables, then we only have to traverse the parts of the tree
// for which those variables are in scope.
//
// A further complication is that x-fhir-query Expressions require an
// asynchronous call.  So, after each traversal, we have to wait for those to
// complete before starting the next traversal (if one is needed).  This is also
// why the main function, runCalculations, returns a promise that resolves
// when the expression run has been completed.
//
// Also, because there is possibility of asynchronous queries, we have to handle
// the fact that runCalculations might get called again while before the first
// call has finished.

export let ExpressionProcessor;
const deepEqual = require('fast-deep-equal'); // faster than JSON.stringify

(function() {
  "use strict";
  // A class whose instances handle the running of FHIR expressions.

  /**
   *   Constructor.
   *  @param lfData an instance of LForms.LFormsData.  The _fhir attribute
   *   should be set before this is called.
   */
  ExpressionProcessor = function(lfData) {
    // A cache of x-fhir-query URIs to results
    this._queryCache = {};

    // An array of pending x-fhir-query results
    this._pendingQueries = [];

    // A hash of calculated values, where the keys are the part of item_.elememntId
    // minus the final repetition number (so it is shared by instances of
    // repeating fields).
    this._calculatedValues = {};

    // A hash of item._elementId values to "repitition key" values which can be used as
    // keys in this._calcualtedValues.
    this._repetitionKeys = {};

    // Keeps track of whether a request to run the calculations has come in
    // while we were already busy.
    this._pendingRun = false;

    // The promise returned by runCalculations, when a run is active.
    this._currentRunPromise = undefined;

    this._lfData = lfData;
    if (!lfData._fhir)
      throw new Error('lfData._fhir should be set');
    this._fhir = lfData._fhir;
    this._compiledExpressions = {};
  };


  ExpressionProcessor.prototype = {
    /**
     *   Runs the FHIR expressions in the form.  This the main function in this
     *   module.
     *  @param includeInitialExpr whether to include the "initialExpression"
     *   expressions (which should only be run once, after asynchronous loads
     *   from questionnaire-launchContext have been completed).
     *  @return a Promise that resolves when the expressions have been run, and
     *   there are no pending runs left to do.
     */
    runCalculations: function(includeInitialExpr) {
      // Defer running calculations while we are waiting for earlier runs to
      // finish.
      if (this._currentRunPromise) // then we will just return that promise
        this._pendingRun = true; // so we know to run them when we can
      else {
        this._pendingRun = false; // clear this because we are running them now
        this._runStart = new Date();
        // Create an export of Questionnaire for the %questionnaire variable in
        // FHIRPath.  We only need to do this once per form.
        var lfData = this._lfData;
        if (!lfData._fhirVariables.questionnaire) {
          lfData._fhirVariables.questionnaire =
            this._fhir.SDC.convertLFormsToQuestionnaire(lfData);
        }
        this._regenerateQuestionnaireResp();
        self = this;
        this._currentRunPromise =
          this._asyncRunCalculations(includeInitialExpr, false).then(()=>{
            // At this point, every promise for the pending queries has been
            // resolved, and we are done.
            console.log("Ran expressions in "+(new Date()-self._runStart)+" ms");
            if (!self._firstExpressionRunComplete) // if this is the first run
              self._firstExpressionRunComplete = true;
            self._currentRunPromise = undefined;
            if (self._pendingRun)
              return self.runCalculations(false); // will set self._currentRunPromise again
          },
          (failureReason) => {
            console.log("Run of expressions failed; reason follows");
            console.log(failureReason);
            self._currentRunPromise = undefined;
            self._pendingRun = false;
            self._pendingQueries = []; // reset
            throw failureReason;
          });
      }
      return this._currentRunPromise;
    },


    /**
     *  Waits for any pending queries.
     * @return a Promise the resolves when everything is finished, including any
     *  pending re-run request.  The returned promise will be rejected if something
     *  goes wrong.
     * @return the same map about changes as in _evaluateExpressions.
     */
    _handlePendingQueries: function() {
      const self = this;
      return Promise.allSettled(this._pendingQueries).then(function(results) {
        self._pendingQueries = []; // reset
        var varsChanged=false, fieldsChanged=false;
        for (var i=0, len=results.length;
             (!varsChanged || !fieldsChanged) && i<len; ++i) {
          var changes = results[i].value;
          if (changes) {
            varsChanged = varsChanged || changes.variables;
            fieldsChanged = fieldsChanged || changes.fields;
          }
          else if (results[i].status == 'rejected')
            return Promise.reject(results[i].reason);
        }
        return {fields: fieldsChanged, variables: varsChanged};
      });
    },


    /**
     *  This is conceptually a part of runCalculations, but it is this part of
     *  it that might need to call itself if fields or variables update.
     *  The basic algorithm is a depth-first traversal of the items to run their
     *  expressions.  Some of those might be asynchronous (e.g. x-fhir-query
     *  variables), so we wait for those to complete before looking at what has
     *  changed and deciding whether to run the expressions again.
     * @param includeInitialExpr whether to include the "initialExpression"
     *  expressions (which should only be run once, after asynchronous loads
     *  from questionnaire-launchContext have been completed).
     * @param changesByVarsOnly whether to run all field expressions, or just the ones
     *  that are likely to have been affected by changes from variable expressions.
     * @return a promise that resolves when all Expressions which needed to be
     *  processed have been processed and the values have stablized.
     */
    _asyncRunCalculations: function(includeInitialExpr, changesByVarsOnly) {
      const self = this;
      const lfData = this._lfData;
      var changes = null; // data about what the calculations changed
      changes = this._evaluateExpressions(lfData, includeInitialExpr, changesByVarsOnly);
      // Wait for any asynchronous queries to complete
      return this._handlePendingQueries().then(function(queryChanges) {
        // Two types of reported changes are possible -- variables and field values
        let varsChanged = changes.variables || queryChanges.variables;
        let fieldsChanged = changes.fields || queryChanges.fields;
        if (varsChanged || fieldsChanged) {
          // Run again
          if (fieldsChanged)
            self._regenerateQuestionnaireResp();
          let onlyVarsChanged = !fieldsChanged;
          return self._asyncRunCalculations(includeInitialExpr, onlyVarsChanged);
        }
      });
    },


    /**
     *  Updates the value of an item's FHIR variable.  If the variable value has changed,
     *  item._varChanged will be set to true.
     * @param item the item on which the variable is defined
     * @param varName the name of the variable
     * @param newVal the new value of the variable.
     * @return whether the value changed.
     */
    _updateItemVariable: function (item, varName, newVal) {
      var oldVal = item._fhirVariables[varName];
      item._fhirVariables[varName] = newVal;
      if (!deepEqual(oldVal, newVal)) {
        item._varChanged = true; // flag for re-running expressions.
      }
      return item._varChanged;
    },



    /**
     *  Evaluates the expressions for a given item.
     * @param item an LFormsData or item from LFormsData.
     * @param includeInitialExpr whether or not to run expressions from
     *  initialExpression extensions (which should only be run when the form is
     *  loaded).
     * @param changesByVarsOnly whether to run all field expressions, or just the ones
     *  that are likely to have been affected by changes from variable expressions.
     * @return a map with two fields, "variables" and "fields", which will be
     *  present and set to true if the evaluation changed variables (including
     *  implicit variables created by named expressions of some other
     *  non-variable type) or field values, respectively.
     */
    _evaluateExpressions: function(item, includeInitialExpr, changesByVarsOnly) {
      var rtn = {};
      // If changesByVarsOnly, for any item that has _varChanged set, we run any field
      // expressions that are within that group (or item).
      if (changesByVarsOnly && item.items && item._varChanged) {
        item._varChanged = false; // clear flag
        changesByVarsOnly = false; // clear it, so we process this and all child items
      }
      if (!changesByVarsOnly) { // process this and all child items
        item._varChanged = false; // clear flag in case it was set
        var fhirExt = item._fhirExt;
        if (fhirExt) {
          var sdc = this._fhir.SDC;
          var exts = item._exprExtensions;
          if (exts) {
            var fieldChanged = false;
            var self = this;
            for (let i=0, len=exts.length; i<len; ++i) {
              let ext = exts[i];
              // Skip initialExpressions if we are not including those.
              let isInitialExp = ext.url == sdc.fhirExtInitialExp;
              if (includeInitialExpr || !isInitialExp) {
                let isCalcExp = ext.url == sdc.fhirExtCalculatedExp;
                // We only run initialExpression or calculatedExpression
                // on one of the repeating items of the repeating group (the
                // last one, because there is a flag to mark the last one).
                if ((isCalcExp || isInitialExp) && item._questionRepeatable && !item._lastRepeatingItem)
                  continue; // skip to next expression extension for this item

                // Skip calculated expressions of editable fields for which the user has
                // edited the value.
                // Compare the item.value to the last calculated value (if any).  If
                // they differ, then the user has edited the field, and in that case we
                // skip setting the value and halt further calculations for the field.
                var calcVal = this._calculatedValues[this._getRepetitionKey(item)];
                if (isCalcExp && !item._userModifiedCalculatedValue && calcVal) {
                  // Get the current values for the item, which might be
                  // repeating.
                  var currentVals = this._lfData.getItemValues(item);
                  if (!deepEqual(calcVal, currentVals))
                    item._userModifiedCalculatedValue = true;
                }

                if (!isCalcExp || !item._userModifiedCalculatedValue) {
                  let varName = ext.valueExpression.name; // i.e., a variable name
                  var itemVars;
                  if (varName)
                    itemVars = this._getItemVariables(item); // creates item._fhirVariables if necessary
                  var oldVal;
                  let newVal;
                  var updateValue = false;
                  if (ext.valueExpression.language=="text/fhirpath") {
                    if (varName) {
                      // Temporarily delete the old value, so we don't have
                      // circular references.
                      oldVal = itemVars[varName];
                      delete itemVars[varName];
                    }
                    newVal = this._evaluateFHIRPath(item,
                      ext.valueExpression.expression);
                    updateValue = true;
                    if (varName)
                      itemVars[varName] = oldVal; // update handled below
                  }
                  else if (ext.valueExpression.language=="application/x-fhir-query") {
                    let queryURL = ext.valueExpression.expression;
                    // The expression might have embedded FHIRPath in the URI, inside {{...}}
                    // Use "undefinedExprVal" to keep track of whether one of
                    // the embedded FHIRPath expressions returns undefined (or
                    // null).
                    let undefinedExprVal = false;
                    queryURL = queryURL.replace(/\{\{([^}]+)\}\}/g, function(match, fpExp) {
                      // Replace the FHIRPath with the evaluated expressions
                      let result = self._evaluateFHIRPath(item, fpExp)[0];
                      if (result === null || result === undefined)
                        undefinedExprVal = true; // i.e., URL likely not usable
                      return undefinedExprVal ? '' : '' + result;
                    });
                    if (!item._currentFhirQueryURLs)
                      item._currentFhirQueryURLs = {};
                    let oldQueryURL = item._currentFhirQueryURLs[varName];
                    // If queryURL is not a new value, we don't need to do anything
                    if (queryURL !== oldQueryURL) {
                      item._currentFhirQueryURLs[varName] = queryURL;
                      if (undefinedExprVal) {
                        newVal = undefined;
                        updateValue = true;
                      }
                      else {
                        // Look for a cached result
                        if (this._queryCache.hasOwnProperty(queryURL)) {
                          newVal = this._queryCache[queryURL];
                          updateValue = true;
                        }
                        else { // query not cached
                          let fetchPromise = this._fetch(queryURL);
                          // Store the promise that handles the response. We
                          // will have to wait for it later.
                          this._pendingQueries.push(fetchPromise.then(function(parsedJSON) {
                            newVal = (self._queryCache[queryURL] = parsedJSON);
                          }, function fail(e) {
                            console.error("Unable to load FHIR data from "+queryURL);
                          }).then(function() {
                            // Update the item with the fetched value, and
                            // update the variable if there was a name defined.
                            var fChanged = self._updateItemFromExp(
                              item, ext.url, varName, newVal, isCalcExp);
                            if (varName) {
                              var vChanged = self._updateItemVariable(item, varName,
                                newVal);
                            }
                            return {fields: fChanged, variables: vChanged};
                          }));
                        }
                      }
                    }
                  }
                  // else CQL (TBD)

                  if (updateValue) {
                    // Update the item with the fetched value, and
                    // update the variable if there was a name defined.
                    var fChanged = this._updateItemFromExp(
                      item, ext.url, varName, newVal, isCalcExp);
                    fieldChanged = fieldChanged || fChanged;
                    if (varName)
                      this._updateItemVariable(item, varName, newVal);
                  }
                }
              }
            }
            rtn = {fields: fieldChanged, variables: item._varChanged};
          }
        }
      }

      // Process child items
      if (item.items) {
        var childChanges;
        var childItems = item.items;
        for (var j=0; j<childItems.length; ++j) { // childItem.length can change as we process expressions
          // Note:  We need to process all the child items; we cannot do an
          // early loop exit based on rtn.
          childChanges = this._evaluateExpressions(item.items[j], includeInitialExpr, changesByVarsOnly);
          if (childChanges.fields)
            rtn.fields = true;
          if (childChanges.variables)
            rtn.variables = true;
        }
      }

      return rtn;
    },


    /**
     *  Regenerates the QuestionnaireResponse resource and the map from
     *  LFormsData _elementIDs to items in the QuestionnaireResponse.
     */
    _regenerateQuestionnaireResp: function() {
      var questResp = this._fhir.SDC.convertLFormsToQuestionnaireResponse(this._lfData);
      this._lfData._fhirVariables.resource = questResp;
      this._elemIDToQRItem = this._createIDtoQRItemMap(questResp);
    },


    /**
     *  Returns the nearest ancestor of item (or item itelf) that has
     *  _fhirVariables defined.
     * @param item either an LFormsData or an item from an LFormsData.
     */
    _itemWithVars: function(item) {
      var itemWithVars = item;
      while (!itemWithVars._fhirVariables)
        itemWithVars = itemWithVars._parentItem; // should terminate at lfData
      return itemWithVars;
    },


    /**
     *  Gets or creates if not yet initialized, the item's _fhirVariables
     *  map (storing its variable values).  This should not be called until it is
     *  known that the item should have a _fhirVariables map.
     * @param item either an LFormsData or an item from an LFormsData.
     * @return the item's _fhirVariables map
     */
    _getItemVariables: function(item) {
      var rtn = item._fhirVariables;
      if (!rtn) {
        // Create a hash for variables that will have access to
        // variables defined higher up in the tree.
        rtn = item._fhirVariables = Object.create(
          this._itemWithVars(item)._fhirVariables);
      }
      return rtn;
    },


    /**
     *  Fetches an x-fhir-query URL.
     * @param queryURL the URL (possibly relative) to fetch.
     * @return a Promise that resolves to the (parsed) JSON response.
     */
    _fetch: function(queryURL) {
      var fetchPromise;
      // If the queryURL is a relative URL, then if there is a FHIR
      // context (set via LForms.Util.setFHIRContext), use that to send
      // the query; otherwise just use fetch.
      // Also, set the format to JSON.
      queryURL += (queryURL.indexOf('?')>0 ? '&' : '?')+'_format=json';
      if (!/^https?:/.test(queryURL) && LForms.fhirContext?.client) {
        fetchPromise = LForms.fhirContext.client.request(queryURL);
      }
      else {
        fetchPromise = fetch(queryURL).then(function(response) {
          return response.json();
        });
      }
      return fetchPromise;
    },


    /**
     *  Updates an item's data following the run of an expression.
     * @param item either an LFormsData or an item from an LFormsData.
     * @param expURL the URL of the expression
     * @param varName variable name from the expression (if any)
     * @param newVal the new value of the variable (if any)
     * @param isCalcExp whether the expression was a calculated expression.
     *  This could be detected from expURL, but the caller already knows it.
     * @return true if the field value changed
     */
    _updateItemFromExp(item, expURL, varName, newVal, isCalcExp) {
      var fieldChanged = false;
      var sdc = this._fhir.SDC;
      if (isCalcExp || expURL != sdc.fhirExtVariable) {
        if (expURL == sdc.fhirExtAnswerExp)
          fieldChanged = this._setItemListFromFHIRPath(item, newVal);
        else if (expURL == sdc.fhirExtEnableWhenExp) {
          // The new value should be a boolean.  Coerce it to a boolean, and
          // report a warning if it was not a boolean.
          var actualNewVal = newVal[0];
          newVal = !!actualNewVal;
          if (newVal !== actualNewVal) {
            LForms.Util.showWarning('An expression from enableWhenExpression '+
              'did not resolve to a Boolean as required', item);
          }
          if (varName) { // if there is a variable name defined, a change in the value matters
            var oldVal = !!item._enableWhenExpVal; // _enableWhenExpVal could be undefined
            fieldChanged = oldVal != newVal;
          }
          item._enableWhenExpVal = newVal;
        }
        else // else initial or calculated expression
          fieldChanged = this._setItemValueFromFHIRPath(item, newVal, isCalcExp);
      }
      return fieldChanged;
    },


    /**
     *  Evaluates the given FHIRPath expression defined in an extension on the
     *  given item.
     * @param item either an LFormsData or an item from an LFormsData.
     * @param expression the FHIRPath to evaluate with the context of item's
     *  equivalent node in the QuestionnaireResponse.
     * @returns the result of the expression.
     */
    _evaluateFHIRPath: function(item, expression) {
      var fhirPathVal;
      // Find the item-level fhirpathVars
      var itemVars = this._itemWithVars(item)._fhirVariables;
      try {
        // We need to flatten the fhirVariables chain into a simple hash of key/
        // value pairs.
        var fVars = {};
        for (var k in itemVars)
          fVars[k] = itemVars[k];
        let contextNode, base;
        if (item._elementId) {
          contextNode = this._elemIDToQRItem[item._elementId];
          contextNode ||= {}; // the item might not be present in the QR if there is no value
          base = 'QuestionnaireResponse.item';
        }
        else {
          contextNode = this._lfData._fhirVariables.resource;
        }

        var compiledExpr = this._compiledExpressions[expression];
        if (!compiledExpr) {
          if (base)
            expression = {base, expression};
          compiledExpr = this._compiledExpressions[expression] =
            this._fhir.fhirpath.compile(expression, this._fhir.fhirpathModel);
        }
        fhirPathVal = compiledExpr(contextNode, fVars);
      }
      catch (e) {
        // Sometimes an expression will rely on data that hasn't been filled in yet.
        console.log(e);
      }
      return fhirPathVal;
    },


    /**
     *  Returns a hash from the LForms _elementId of each item to the
     *  corresponding QuestionnaireResponse item.
     * @param qr the QuestionnaireResponse corresponding to the current
     * LFormsData.
     */
    _createIDtoQRItemMap: function(qr) {
      var map = {};
      this._addToIDtoQRItemMap(this._lfData, qr, map);
      return map;
    },


    /**
     *  Adds to the map from LFormsData items to QuestionnaireResponse items and
     *  returns the number of items added.
     * @param lfItem an LFormsData, or an item within it.
     * @param qrItem the corresponding QuestionnaireResponse or an item within
     * it.
     * @param map the map to which entries will be added.
     * @return the number of items added to the map.
     */
    _addToIDtoQRItemMap: function(lfItem, qrItem, map) {
      var added = 0;
      if (lfItem.linkId === qrItem.linkId) {
        if (lfItem.items) {
          // lfItem.items might contain items that don't have values, but
          // qrItem.item will not, so we need to skip the blank items.
          //
          // Also, for a repeating question, there will be multiple answers on an
          // qrItem.item, but repeats of the item in lfItem.items with one answer
          // each, unless answerCardinality is '*' (list items), in which case
          // there can be multiple answers per lforms item.

          // LForms does not currently support items that contain both answers
          // and child items, but I am trying to accomodate that here for the
          // future.
          if (qrItem && qrItem.item && qrItem.item.length > 0) {
            var lfItems = lfItem.items, qrItems = qrItem.item;
            var numLFItems = lfItems.length;
            for (var i=0, qrI=0, len=qrItems.length; qrI<len && i<numLFItems; ++qrI) {
              // Answers are repeated in QR, but items are repeated in LForms
              var qrIthItem = qrItems[qrI];
              var lfIthItem = lfItems[i];
              if (!qrIthItem.answer) {
                // process item anyway to handle child items with data
                let newlyAdded = this._addToIDtoQRItemMap(lfIthItem, qrIthItem, map);
                if (newlyAdded === 0) {
                  // lfIthItem was blank, so qrIthItem must be for a following
                  // item.
                  --qrI; // so we try qrIthItem with the next lfIthItem
                }
                else
                  added += newlyAdded;
                ++i;
              }
              else { // there are answers on the qrIthItem item
                var numAnswers = qrIthItem.answer ? qrIthItem.answer.length : 0;
                for (var a=0; a<numAnswers; ++i) {
                  if (i >= numLFItems)
                    throw new Error('Logic error in _addToIDtoQRITemMap; ran out of lfItems');
                  let lfIthItem = lfItems[i];
                  let newlyAdded = this._addToIDtoQRItemMap(lfIthItem, qrIthItem, map);
                  if (newlyAdded != 0) { // lfItems[i] was not blank
                    if (Array.isArray(lfIthItem.value))
                      a += lfIthItem.value.length;
                    else
                      a += 1;
                  }
                  added += newlyAdded;
                }
              }
            }
          }
        }

        // this item has _elementId and has a value
        if (lfItem._elementId && (added || lfItem.value !== undefined && lfItem.value !== null && lfItem.value !== "")) {
          if (!qrItem) { // if there is data in lfItem, there should be a qrItem
            throw new Error('Logic error in _addToIDtoQRItemMap; missing qrItem');
          }
          else {
            map[lfItem._elementId] = qrItem;
            added += 1;
          }
        }
      }
      return added;
    },


    /**
     *  Assigns the given list result to the item.  If the list has changed, the
     *  field is cleared.
     * @param list an array of list items computed from a FHIRPath expression.
     * @return true if the list changed
     */
    _setItemListFromFHIRPath: function(item, list) {
      let currentList = item.answers;
      let hasCurrentList = !!currentList && Array.isArray(currentList);
      let listHasData = !!list && Array.isArray(list);
      let changed = (hasCurrentList != listHasData) ||
        listHasData && (list.length != currentList.length);
      let newList = []; // a reformatted version of "list"
      const scoreURI = this._fhir.SDC.fhirExtUrlOptionScore;
      if (listHasData) {
        // list should be an array of any item type, including Coding.
        // (In R5, FHIR will start suppoing lists of types other than Coding.)
        for (let i=0, len=list.length; i<len; ++i) {
          // Assume type "object" means a coding, and that otherwise what we have
          // is something useable as display text. It is probably necessary to
          // convert them to strings in that case, which means that in the future
          // (R5), we might have to save/re-create the original data type and value.
          // Work will need to be done to autocomplete-lhc to support data objects
          // associated with list values.
          let entry = list[i], newEntry = (newList[i] = {});
          if (typeof entry === 'object') {
            let code = entry.code;
            if (code !== undefined)
              newEntry.code = code;
            let display = entry.display;
            if (display !== undefined)
              newEntry.text = display;
            let system = entry.system;
            if (system !== undefined)
              newEntry.system = system;
            // A Coding can have the extension for scores
            let scoreExt = item._fhirExt && item._fhirExt[scoreURI];
            if (scoreExt)
              newEntry.score = scoreExt[0].valueDecimal;
          }
          else
            newEntry.text = '' + entry;
          if (!changed) {
            changed = (!hasCurrentList ||
              !this._lfData._objectEqual(newEntry, currentList[i]));
          }
        }
      }

      if (changed) {
        item.answers = newList;
        this._lfData._updateAutocompOptions(item, true);
        this._lfData._resetItemValueWithModifiedAnswers(item);
      }
      return changed;
    },


    /**
     *  Assigns the given FHIRPath result to the given item.
     * @param item the item from the LFormsData object that is receiving the new
     *  value.
     * @param fhirPathRes the result of a FHIRPath evaluation.
     * @param isCalcExp whether this is from a calculated expression, in which
     *  case a decision will be made whether to skip setting the value.
     * @return true if the value changed
     */
    _setItemValueFromFHIRPath: function(item, fhirPathRes, isCalcExp) {
      var oldVal = this._lfData.getItemValues(item);
      // If the FHIRPath expression resulted in an error, fhirPathRes is
      // undefined.  TBD - show an error to the user.  I think the safest thing
      // to do here is to leave the item untouched.
      var changed = false;
      if (fhirPathRes !== undefined) {
        var newVal = this._fhir.SDC._convertFHIRValues(item, fhirPathRes);
        changed = !deepEqual(oldVal, newVal);
        // If this is the first run of the expressions, and there is
        // saved user data, then we check whether the calculated value matches
        // what the user entered (or erased) and if it doesn't, we halt further
        // calculations for this field and restore the saved value.
        if (changed && isCalcExp && !this._firstExpressionRunComplete
            && this._lfData.hasSavedData) {
          item._userModifiedCalculatedValue = true;
          changed = false;
        }
        else if (changed) {
          var newLastItem = this._lfData.setRepeatingItems(item, newVal);
        }

        // Store the calculated value.
        this._calculatedValues[this._getRepetitionKey(item)] = newVal;
      }
      return changed;
    },


    /**
     *  Returns the key used to store/retrieve the calculated value for a given
     *  item's repetitions.
     * @param item an instance of a repeating item.
     */
    _getRepetitionKey: function(item) {
      var rtn = this._repetitionKeys[item._elementId];
      if (!rtn && item._elementId) {
        var found = item._elementId.match(/\/\d+$/);
        if (found) {
          rtn = this._repetitionKeys[item._elementId] = item._elementId.substring(0, found.index);
        }
      }
      return rtn;
    }
  };

})();
