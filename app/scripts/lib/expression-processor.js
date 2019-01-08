// Processes FHIR Expression Extensions
if (typeof LForms === 'undefined')
  LForms = {};

(function() {
  "use strict";
  // A class whose instances handle the running of FHIR expressions.

  LForms.ExpressionProcessor = function(lfData) {
    this._lfData = lfData;
    this._fhir = LForms.FHIR[lfData.fhirVersion];
    console.log("%%% fhirVersion="+lfData.fhirVersion);
console.trace();
  }

  LForms.ExpressionProcessor.prototype = {

    /**
     *  Runs any calculated expressions, and also the variable expressions,
     *  since those can be referenced by the calculated expressions.
     */
    /*
    runCalculatedExpressions: function() {
      this.runValueExpressions(['_variableExt', '_calculatedExprExt']);
    },
    */

    runCalculations: function(includeInitialExpr) {
// TBD - don't take inclueInitialExpr; store whether or not the initalExpr have
// completed running at least once.
      console.log("%%% in runCalculations");
      console.trace();
      var firstRun = true;
      var changed = true;
      while (changed) {
        if (changed || firstRun) {
          this._regenerateQuestionnaireResp();
          changed = this._evaluateVariables(this._lfData, !firstRun);
        }
        if (changed || firstRun)
          changed = this._evaluateFieldExpressions(this._lfData, includeInitialExpr, !firstRun);
        firstRun = false;
      }
      console.log("%%% end of runCalculations");
    },

    /**
     *  Evaluates variables on the given item.
     */
    _evaluateVariables: function(item) {
console.log("%%% in variables");
console.log(item);
      var rtn = false;
      var variableExts = item._variableExt;
      if (variableExts) {
console.log("%%% found variableExts");
        for (var i=0, len=variableExts.length; i<len; ++i) {
          var ext = variableExts[i];
          if (ext && ext.valueExpression.language=="text/fhirpath") {
            var varName = ext.valueExpression.name;
            var oldVal;
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
console.log("%%% evaluating variable "+varName+" = "+ext.valueExpression.expression);
            var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);
console.log(newVal);
            if (newVal !== undefined)
              item._fhirVariables[varName] = newVal;
            var varChanged = JSON.stringify(oldVal) != JSON.stringify(newVal);
            if (varChanged) {
              item._varChanged = true; // flag for re-running expressions.
            }
          }
          // else maybe x-fhir-query, asynchronous (TBD)
        }
      }
      if (item.items) {
        for (var i=0, len=item.items.length; i<len; ++i) {
          var changed = this._evaluateVariables(item.items[i]);
          if (!rtn)
            rtn = changed;
        }
      }
      return rtn;
    },

    _evaluateFieldExpressions: function(item, includeInitialExpr, changesOnly) {
      var rtn = false;
      // If changesOnly, for any item that has _varChanged set, we run any field
      // expressions that are within that group.  (If it is not a group, there
      // is no point to the variable.)
      if (changesOnly) {
        if (item.items && item._varChanged) {
          item._varChanged = false; // clear flag
          changeOnly = false; // process all child items
        }
      }
      else if (!changesOnly) {  // process this and all child items
        item._varChanged = false; // clear flag in case it was set
        var exts = [];
        if (includeInitialExpr && item._initialExprExt)
          exts.push(item._initialExprExt);
        if (item._calculatedExprExt)
          exts.push(item._calculatedExprExt);
        var changed = false;
        for (var i=0, len=exts.length; i<len; ++i) {
          var ext = exts[i];
          if (ext && ext.valueExpression.language=="text/fhirpath") {
            var varName = ext.name;
            var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);
            var exprChanged = this._setItemValueFromFHIRPath(item, newVal);
            if (!changed)
              changed = exprChanged;
          }
        }
        rtn = changed;
      }

      // Process child items
      if (item.items) {
        for (var i=0, len=item.items.length; i<len; ++i) {
          var changed = this._evaluateFieldExpressions(item.items[i], includeInitialExpr, changesOnly);
          if (!rtn)
            rtn = changed;
        }
      }
      return rtn;
    },


    _regenerateQuestionnaireResp: function() {
      var questResp = this._fhir.SDC.convertLFormsToQuestionnaireResponse(this._lfData);
      this._lfData._fhirVariables.resource = questResp;
      this._elemIDToQRItem = this._createIDtoQRItemMap(questResp);
    },

   /**
    *  Returns the nearest ancestor of item (or item itelf) that has
    *  _fhirVariables defined.
    */
   _itemWithVars: function(item) {
      var itemWithVars = item;
      while (!itemWithVars._fhirVariables)
        itemWithVars = itemWithVars._parentItem; // should terminate at lfData
      return itemWithVars;
   },

// TBD -- add tests with a repeating element
    _evaluateFHIRPath: function(item, expression) {
      var fhirPathVal;
      // Find the item-level fhirpathVars
      var itemVars = this._itemWithVars(item)._fhirVariables;
      try {
console.log("%%% evaluating " +expression);
console.log(this._elemIDToQRItem);
console.log(item._elementId);
        // We need to flatten the fhirVariables chain into a simple hash of key/
        // value pairs.
        var fVars = {};
        for (var k in itemVars)
          fVars[k] = itemVars[k];
        fhirPathVal = this._fhir.fhirpath.evaluate(this._elemIDToQRItem[item._elementId],
          expression, fVars);
console.log(fVars);
console.log(fhirPathVal);
      }
      catch (e) {
        // Sometimes an expression will rely on data that hasn't been filled in
        // yet.
        console.log(e);
      }
      return fhirPathVal
    },


    /**
     *  Returns a hash from the linkIds in a QuestionnaireReponse to the items
     *  in the QuestionnaireResponse with those linkIDs.
     * @param qr the QuestionnaireResponse
     * @param map (optional) the map to which entries will be added.  If
     *  provided, this will also be the return value.
     */
    /*
    _getIDtoQRItemMap: function(qr, map) {
    // TBD -- This is wrong.  linkIds are not unique across repeats.
      if (!map)
        map = {};
      if (qr.linkId)
        map[qr.linkId] = qr;
      if (qr.item) {
        for (var i=0, len=qr.item.length; i<len; ++i)
          this._getIDtoQRItemMap(qr.item[i], map);
      }
      return map;
    },
*/

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
      if (lfItem.items) {
        if (qrItem && qrItem.item && qrItem.item.length > 0) {
          var lfItems = lfItem.items, qrItems = qrItem.item;
          var numLFItems = lfItems.length;
          for (var i=0, qrI=0, len=qrItems.length; qrI<len; ++qrI) {
            // Answers are repeated in QR, but items are repeated in LForms
            var numAnswers = qrItems[qrI].answer ? qrItems[qrI].answer.length : 1;
            for (var a=0; a<numAnswers; ++a, ++i) {
              if (i > numLFItems)
                throw new Error('Logic error in _addToIDtoQRITemMap; ran out of lfItems');
              var newlyAdded = this._addToIDtoQRItemMap(lfItems[i], qrItems[qrI], map);
              if (newlyAdded === 0) { // blank; try next lfItem
                --a;
              }
              else {
                added += newlyAdded;
              }
            }
          }
          if (added && lfItem._elementId) {
            // Since the children were not empty, also add the entry for the
            // parent node.
            map[lfItem._elementId] = qrItem;
            added += 1;
          }
        }
      }
      else if (!this._lfData.isEmpty(lfItem)) {
        if (!qrItem) { // if there is data in lfItem, there should be a qrItem
          throw new Error('Logic error in _addToIDtoQRItemMap');
        }
        else {
          map[lfItem._elementId] = qrItem;
          added += 1;
        }
      }
      return added;
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
      if (fhirPathRes !== undefined)
        var fhirPathVal = fhirPathRes[0];
      if (!fhirPathVal)
        item.value = undefined;
      else {
        if (item.dataType === this._lfData._CONSTANTS.DATA_TYPE.DT) {
          var d = new Date(fhirPathVal);
          // Convert to local time, so the date does not get shifted for negative
          // local timezones.
          item.value = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        }
        else
          item.value = fhirPathVal; // TBD: handle other types - Coding, etc.
      }
      return oldVal != item.value;
    },



    /**
     *  Runs any expressions stored in an item under the given property
     *  names, and assigns the result to item's value.
     * @param expressionProperties the properties for which an expression should
     *  be run.
     */
    /*
    runValueExpressions: function(expressionProperties) {
      var lfData = this;
      if (LForms.FHIR) {
        var fhir = LForms.FHIR[lfData.fhirVersion];
        var itemList = lfData.itemList;
        var questResp;
        // Handle form-level expressions -- variables
        if (expressionProperties.indexOf('_variableExt')) {
          // TBD - potential problem - calculatedExpressions can affect
          // variables, which can affect other calculatedExpressions
        }
        // Now process item-level expressions
        var linkIDToQRItem;
        var rerunNeeded = true;
        // On the first run, run the expressions on all items.  On subsequent
        // runs only run the expressions on marked items.
        var firstRun = true;
        while (rerunNeeded) {
          var rerunNeeded = false; // will be reset if needed
          for (var i=0, len=itemList.length; i<len; ++i) {
            var item = itemList[i];
            for (var j=0, jLen=expressionProperties.length; j<jLen; ++j) {
              var prop = expressionProperties[j];
              var isVariable = prop === '_variableExt';
              if (isVariable || item !== this._activeItem) {
                var exprExt = item[prop];
                if (exprExt && exprExt.valueExpression.language=="text/fhirpath") {
                  // If there are many FHIRPath expressions, regenerating the
                  // complete QuestionnaireReponse each time would be slower than
                  // updating it.  But, generating a structure to that update fast
                  // would not be trivial either. (Now that we have _getIDtoQRItemMap,
                  // we are closer to being able to do that.)
                  // We do not need to regenerate questResp between "variable"
                  // expressions.
                  if (!questResp)
                    questResp = fhir.SDC.convertLFormsToQuestionnaireResponse(lfData);
                  if (!linkIDToQRItem)
                    linkIDToQRItem = this._getIDtoQRItemMap(questResp);
                  lfData._fhirVariables.resource = questResp;
                  // Find the item-level fhirpathVars
                  var itemWithVars = item;
                  while (!itemWithVars._fhirVariables)
                    itemWithVars = itemWithVars._parentItem; // should terminate at lfData
                  try {
                    var fhirPathVal = fhir.fhirpath.evaluate(linkIDToQRItem[item.linkId],
                      exprExt.valueExpression.expression, itemWithVars._fhirVariables);
                  }
                  catch (e) {
                    console.log(e);
                  }
                  var valChanged;
                  if (isVariable) {
                    var varName = exprExt.name;
                    if (name) {
                      var itemVars = item._fhirVariables ||
                        (item._fhirVariables = Object.create(itemWithVars._fhirVariables));
                      varChanged = JSON.stringify(itemVars[name]) != JSON.stringify(fhirPathVal);
                      itemVars[name] = fhirPathVal;
                    }
                    if (valChanged) {
                      :w
                    }
                  }
                  else {
                    valChanged = this._setItemValueFromFHIRPath(item, fhirPathVal);
                    if (valChanged) {
                      questResp = null; // force a regeneration because the value changed
                    }
                  }
                }
                if (valChanged)
                  rerunNeeded = true;
              }
            }
          }
          firstRun = false;
        }
      }
    },
*/


  };
})();
