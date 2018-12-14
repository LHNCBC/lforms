// Processes FHIR Expression Extensions
(function() {
  "use strict";
// TBD - this should be a property of an LFormsData instance
  LForms.LFormsData._ExpressionProcessor = {

    /**
     *  Runs any calculated expressions, and also the variable expressions,
     *  since those can be referenced by the calculated expressions.
     */
    /*
    runCalculatedExpressions: function() {
      this.runValueExpressions(['_variableExt', '_calculatedExprExt']);
    },
    */

    runCalculations(lfData, includeInitialExpr) {
// TBD - don't take inclueInitialExpr; store whether or not the initalExpr have
// completed running at least once.
      this.lfData = lfData;
      var firstRun = true;
      var changed = true;
      while (changed) {
        if (changed || firstRun) {
          this.regenerateQuestionnaireResp();
          changed = this._evaluateVariables(lfData, !firstRun);
        }
        if (changed || firstRun)
          changed = this._evalulateFieldExpressions(lfData, includeInitialExpr, !firstRun);
        firstRun = false;
      }
    }

    _evaluateVariables: function(item, changesOnly) {
      var rtn = false;
      var changed;
      // if changesOnly, then we only evaluate variables for which a contained
      // expression has changed.  Also, if this item does not contain a changed
      // expression, then neither do its children.
      if (!changesOnly || item._exprChanged) {
        item._exprChanged = false; // clear flag for possible next run
        var variablesExts = item._variableExt;
        if (variablesExts) {
          for (var i=0, len=variableExts.length; i<len; ++i) {
            var ext = variableExts[i];
            if (ext && ext.valueExpression.language=="text/fhirpath") {
              var varName = ext.name;
              var oldVal;
              if (item._fhirVariables)
                oldVal = item._fhirVariables[varName];
              var newVal = evaluateFHIRPath(item, ext.valueExpression.expression);
              if (newVal !== undefined)
                item._fhirPathVariables[varName] = newVal;
              var varChanged = JSON.stringify(oldVal) != JSON.stringify(newVal);
              if (varChanged) {
                changed = true;
                if (changesOnly)
                  item._varChanged = true; // flag for re-running expressions.
              }
            }
          }
        }
        if (item.items) {
          for (var i=0, len=item.items.length; i<len; ++i) {
            var changed = evaluateVariables(item.items[i], changesOnly);
            if (!rtn)
              rtn = changed;
          }
        }
      }
      return rtn;
    },

    _evalulateFieldExpressions: function(item, includeInitialExpr, changesOnly) {
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
            var newVal = evaluateFHIRPath(item, ext.valueExpression.expression);
            var exprChanged = this._setItemValueFromFHIRPath(newVal);
            if (!changed)
              changed = exprChanged;
          }
        }
        if (changed) {
          // Set flags on this and all acestors
          var next = item;
          while (next && !next._exprChanged) {
            next._exprChanged = true;
            next = next._parentItem;
          }
          rtn = true;
        }
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


    regenerateQuestionnaireResp: function() {
      questResp = fhir.SDC.convertLFormsToQuestionnaireResponse(lfData);
      lfData._fhirVariables.resource = questResp;
      this._linkIDToQRItem = this._getIDtoQRItemMap(questResp);
    }


    evaluateFHIRPath(item, expression) {
      var fhirPathVal;
      // Find the item-level fhirpathVars
      var itemWithVars = item;
      while (!itemWithVars._fhirVariables)
        itemWithVars = itemWithVars._parentItem; // should terminate at lfData
      var fhir = LForms.FHIR[lfData.fhirVersion];
      try {
        fhirPathVal = fhir.fhirpath.evaluate(this._linkIDToQRItem[item.linkId],
          exprExt.valueExpression.expression, itemWithVars._fhirVariables);
      }
      catch (e) {
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
    _getIDtoQRItemMap: function(qr, map) {
      if (!map)
        map = {};
      if (qr.linkId)
        map[linkId] = qr;
      if (qr.items) {
        for (var i=0, len=qr.items.length; i<len; ++i)
          this._getIDtoQRItemMap(qr.items[i], map);
      }
      return map;
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
        if (item.dataType === this._CONSTANTS.DATA_TYPE.DT) {
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
          var rerunNeeded = false; // we hope
          for (var i=0, len=itemList.length; i<len; ++i) {
            var item = itemList[i];
            if (
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



  };
})();
