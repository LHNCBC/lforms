// Processes FHIR Expression Extensions

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
    this._lfData = lfData;
    if (!lfData._fhir)
      throw new Error('lfData._fhir should be set');
    this._fhir = lfData._fhir;
    this._compiledExpressions = {};

    // Define some arrays that will be reused frequently.
    const sdc = this._fhir.SDC;
    this._responsiveFieldExpURIs = [sdc.fhirExtAnswerExp, sdc.fhirExtCalculatedExp];
    (this._initialFieldExpURIs = this._responsiveFieldExpURIs.slice()).splice(1, 0,
      sdc.fhirExtInitialExp); // add fhirExtInitialExp
  };


  ExpressionProcessor.prototype = {
    // A cache of x-fhir-query URIs to results
    queryCache_: {},

    // An array of pending x-fhir-query results
    pendingQueries_: [],

    // Keeps track of whether a request to run the calculations has come in
    // while we were already busy.
    pendingRun_: false,

    // Whether we are deferring running calculations until a batch of queries is
    // finished being processed.
    deferRuns_: false,


    /**
     *   Runs the FHIR expressions in the form.
     *  @param includeInitialExpr whether to include the "initialExpression"
     *   expressions (which should only be run once, after asynchronous loads
     *   from questionnaire-launchContext have been completed).
     */
    runCalculations: function(includeInitialExpr) {
      // Defer running calculations while we are waiting for earlier runs to
      // finish.
      if (this.deferRuns_)
        this.pendingRun_ = true; // so we know to run them when we can
      if (!this.deferRuns_) {
        this.pendingRun_ = false; // clear this because we are running them now
        this.runStart_ = new Date();
        // Create an export of Questionnaire for the %questionnaire variable in
        // FHIRPath.  We only need to do this once per form.
        var lfData = this._lfData;
        if (!lfData._fhirVariables.questionnaire) {
          lfData._fhirVariables.questionnaire =
            this._fhir.SDC.convertLFormsToQuestionnaire(this._lfData);
        }
        this._asyncRunCalculations(true);
      }
    },

    // 1) Wait for pending field expression queries, then evaluate variables
    // 2) If there are pending variable queries, defer further calls to
    // runCalculations
    // 3) Wait for pending variable queries, then if anything changed (or
    // firstCall), run the field/answer expressions; else deferRuns_=false
    // 4) If there are changes or pending field field/answer queries, go to (1);
    // otherwise deferRuns_=false
    // 5) If there is a pendingRun_, go to (1)

    /**
     *  Waits any pending queries and runs the next step if the pending queries
     *  indicate something has changed.
     * @param runNextStep if set to true, nextStep will be run even if the
     *  pending queries do not indicate a change.
     * @param nextStep the function to run the next step.
     * @return a Promise the resolves when everything is finished.
     */
    _handlePendingQueries: function(runNextStep, nextStep) {
      return Promise.allSettled(this.pendingQueries_).then(function(results) {
        this.pendingQueries_ = []; // reset
        for (let i=0, len=results.length; !runNextStep && i<len; ++i) {
          if (results[i].value)
            runNextStep = true;
        }
        if (runNextStep)
          nextStep();
      });
    },

    /**
     *  This is conceptually a part of runCalculations, but it is this part of
     *  it that might need to call itself if fields or variables update.
     *  The basic algorithm is that first we evaluate the variables, and wait
     *  for any AJAX-based variables to finish loading.  Then we evaluate field
     *  expressions (calculatedExpression and answerExpresion) and again wait
     *  for any AJAX based expressions to finish loading.
     * @param firstCall whether this is the first call in a possibly recursive
     *  sequence.  We use this to optimize whether there is a need to evaluate
     *  all of the expressions or just the ones that might have changed.
     */
    _asyncRunCalculations: function(firstCall) {
      var changed; // whether the calculations result in changed values
      if (firstCall) {
        this._regenerateQuestionnaireResp();
        changed = this._evaluateVariables(lfData);
      }
      return Promise.allSettled(this.pendingQueries_).then(function(results) {
        this.pendingQueries_ = []; // reset
        for (let i=0, len=results.length; !changed && i<len; ++i) {
          if (results[i].value)
            changed = true;
        }
        if (changed || firstCall) {
          changed = this._evaluateFieldExpressions(lfData, includeInitialExpr, !firstCall);
          // In the future, field expressions might by asynchronous too.
          // Adding support for that now.
          return Promise.allSettled(this.pendingQueries_).then(function(results) {
            this.pendingQueries_ = []; // reset
            for (let i=0, len=results.length; !changed && i<len; ++i) {
              if (results[i].value)
                changed = true;
            }
            if (changed) // then return a new promise
              return this._asyncRunCalculations(false);
          });
        }
      }).then(()=>{
        // At this point, every promise for the pending queries has been resolved, and we are done.
        this.deferRuns_ = false; // we are done
        console.log("Ran FHIRPath expressions in "+(new Date()-this.runStart_)+" ms");
        if (this.pendingRun_)
          this.runCalculations(false);
      });
    },


    /**
     *  Updates the value of an item's FHIR variable.
     * @param item the item on which the variable is defined
     * @param varName the name of the variable
     * @param newVal the new value of the variable.
     */
    updateItemVariable(item, varName, newVal) {
      var oldVal = item._fhirVariables[varName];
      item._fhirVariables[varName] = newVal;
      if (!deepEqual(oldVal, newVal)) {
        item._varChanged = true; // flag for re-running expressions.
      }
    },


    /**
     *  Evaluates variables on the given item.
     * @param item an LFormsData or item from LFormsData.
     */
    _evaluateVariables: function(item) {
      var rtn = false;
      var sdc = this._fhir.SDC;
      var variableExts = item._fhirExt && item._fhirExt[sdc.fhirExtVariable];
      if (variableExts) {
        for (let i=0, len=variableExts.length; i<len; ++i) {
          var ext = variableExts[i];
          var oldVal, newVal;
          var varName = ext.valueExpression.name;
          if (item._fhirVariables)
            oldVal = item._fhirVariables[varName];
          else {
            // Create a hash for variables that will have access to
            // variables defined higher up in the tree.
            item._fhirVariables = Object.create(
              this._itemWithVars(item)._fhirVariables);
          }
          // Delete the old value, so we don't have circular references.
          delete item._fhirVariables[varName];
          if (ext.valueExpression.language=="text/fhirpath") {
            newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);
            this.updateItemVariable(item, varName, newVal);
          }
          else if (ext.valueExpression.language=="application/x-fhir-query") {
            var queryURI = ext.valueExpression.expression;
            // The expression might have embedded FHIRPath in the URI, inside {{...}}
            queryURI = queryURI.replace(/\{\{([^}]+)\}\}/g, function(match, fpExp) {
              // Replace the FHIRPath with the evaluated expressions
              var result = this._evaluateFHIRPath(item, fpExp)[0];
              return (result === null || result === undefined) ? '' : '' + result;
            });
            var hasCachedResult = this.queryCache_.hasOwnProperty(queryURI);
            if (hasCachedResult) {
              newVal = this.queryCache_[queryURI];
              this.updateItemVariable(item, varName, newVal);
            }
            else { // query not cached
              this.pendingQueries_.push(fetch(expURL).then(function(response) {
                return response.json();
              }).then(function(parsedJSON) {
                newVal = (this.queryCache_[queryURI] = parsedJSON);
                this.updateItemVariable(item, varName, newVal);
                return item._varChanged;
              }, function fail() {
                this.updateItemVariable(item, varName, undefined);
                console.error("Unable to load FHIR data from "+expURL);
                return item._varChanged;
              }));
            }
          }
          // else CQL (TBD)
        }
      }
      if (item.items) {
        for (let i=0, len=item.items.length; i<len; ++i) {
          var changed = this._evaluateVariables(item.items[i]);
          if (!rtn)
            rtn = changed;
        }
      }
      return rtn;
    },

    /**
     *  Evaluates the expressions that set field values for the given item.
     * @param item an LFormsData or item from LFormsData.
     * @param includeInitialExpr whether or not to run expressions from
     *  initialExpression extensions (which should only be run when the form is
     *  loaded).
     * @param changesOnly whether to run all field expressions, or just the ones
     *  that are likely to have been affected by changes from variable expressions.
     */
    _evaluateFieldExpressions: function(item, includeInitialExpr, changesOnly) {
      var rtn = false;
      // If changesOnly, for any item that has _varChanged set, we run any field
      // expressions that are within that group (or item).
      if (changesOnly) {
        if (item.items && item._varChanged) {
          item._varChanged = false; // clear flag
          changesOnly = false; // process all child items
        }
      }
      else { // if (!changesOnly) process this and all child items
        item._varChanged = false; // clear flag in case it was set
        const fhirExt = item._fhirExt;
        if (fhirExt) {
          const sdc = this._fhir.SDC;
          var exts = includeInitialExpr ? item._initialFieldExpExts :
            item._responsiveFieldExpExts;
          if (exts === undefined) {  // undefined means we haven't computed them yet
            // compute the list of extensions to process and cache it
            exts = [];
            var uris = includeInitialExpr ? this._initialFieldExpURIs :
              this._responsiveFieldExpURIs;
            for (let uri of uris) {
              const extsForURI = fhirExt[uri];
              if (extsForURI)
                exts.push.apply(exts, extsForURI);
            }
            if (exts.length === 0)
              exts = null; // a signal that we have looked and found nothing
            includeInitialExpr ? item._initialFieldExpExts = exts :
              item._responsiveFieldExpExts = exts;
          }
          if (exts) {
            let changed = false;
            for (let i=0, len=exts.length; i<len; ++i) {
              var ext = exts[i];
              if (ext && ext.valueExpression.language=="text/fhirpath") {
                var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);
                var fieldChanged = (ext.url == sdc.fhirExtAnswerExp) ?
                  this._setItemListFromFHIRPath(item, newVal) :
                  this._setItemValueFromFHIRPath(item, newVal);
                if (!changed)
                  changed = fieldChanged;
              }
            }
            rtn = changed;
          }
        }
      }

      // Process child items
      if (item.items) {
        for (let i=0, len=item.items.length; i<len; ++i) {
          const changed = this._evaluateFieldExpressions(item.items[i], includeInitialExpr, changesOnly);
          if (!rtn)
            rtn = changed;
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
     *  Evaluates the given FHIRPath expression defined in an extension on the
     *  given item.
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
        const fhirContext = item._elementId ? this._elemIDToQRItem[item._elementId] :
          this._lfData._fhirVariables.resource;
        var compiledExpr = this._compiledExpressions[expression];
        if (!compiledExpr) {
          compiledExpr = this._compiledExpressions[expression] =
            this._fhir.fhirpath.compile(expression, this._fhir.fhirpathModel);
        }
        fhirPathVal = compiledExpr(fhirContext, fVars);
      }
      catch (e) {
        // Sometimes an expression will rely on data that hasn't been filled in
        // yet.
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
          // each.
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
                for (var a=0; a<numAnswers; ++a, ++i) {
                  if (i >= numLFItems)
                    throw new Error('Logic error in _addToIDtoQRITemMap; ran out of lfItems');
                  let newlyAdded = this._addToIDtoQRItemMap(lfItems[i], qrIthItem, map);
                  if (newlyAdded === 0) { // lfItems[i] was blank; try next lfItem
                    --a;
                  }
                  else {
                    added += newlyAdded;
                  }
                }
              }
            }
          }
        }

        // this item has _elementId and has a value
        if (lfItem._elementId && (added || lfItem.value !== undefined && lfItem.value !== null && lfItem.value !== "")) {
          if (!qrItem) { // if there is data in lfItem, there should be a qrItem
            throw new Error('Logic error in _addToIDtoQRItemMap');
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
     */
    _setItemListFromFHIRPath: function(item, list) {
      let currentList = item.answers;
      let hasCurrentList = !!currentList;
      let changed = false;
      let newList = [];
      const scoreURI = this._fhir.SDC.fhirExtUrlOptionScore;
      if (list && Array.isArray(list)) {
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
            newEntry = {'text': '' + entry};
          if (!changed) {
            changed = (!hasCurrentList ||
              !this._lfData._objectEqual(newEntry, currentList[i]));
          }
        }
      }
      else
        changed = !!currentList;

      if (changed) {
        item.answers = newList;
        this._lfData._updateAutocompOptions(item, true);
        // The SDC specification says that implementations "SHOULD" preserve the
        // field value (marking it invalid if that is the case in the new list).
        // That is inconsistent with the behavior of LForms in other situations,
        // e.g. data control, where we wipe the field value when the list is
        // set.  So, we need to decide whether to switch to that behavior.
        // For now, just wipe the field.
        item.value = null;
      }
    },


    /**
     *  Assigns the given FHIRPath result to the given item.
     * @param item the item from the LFormsData object that is receiving the new
     *  value.
     * @param fhirPathRes the result of a FHIRPath evaluation.
     * @return true if the value changed
     */
    _setItemValueFromFHIRPath: function(item, fhirPathRes) {
      var oldVal = item.value;
      var fhirPathVal;
      if (fhirPathRes !== undefined)
        fhirPathVal = fhirPathRes[0];
      if (fhirPathVal === null || fhirPathVal === undefined)
        item.value = undefined;
      else
        this._fhir.SDC._processFHIRValues(item, fhirPathRes);
      return oldVal != item.value;
    }
  };
})();
