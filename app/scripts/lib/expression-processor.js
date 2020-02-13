// Processes FHIR Expression Extensions

(function() {
  "use strict";
  // A class whose instances handle the running of FHIR expressions.

  var LForms = require('../../lforms');

  /**
   *   Constructor.
   *  @param lfData an instance of LForms.LFormsData
   */
  LForms.ExpressionProcessor = function(lfData) {
    this._lfData = lfData;
    this._fhir = LForms.FHIR[lfData.fhirVersion];
    this._compiledExpressions = {};
  };

  LForms.ExpressionProcessor.prototype = {



    /**
     *   Runs the FHIR expressions in the form.
     *  @param includeInitialExpr whether to include the "initialExpression"
     *   expressions (which should only be run once, after asynchronous loads
     *   from questionnaire-launchContext have been completed).
     */
    runCalculations: function(includeInitialExpr) {
      // Create an export of Questionnaire for the %questionnaire variable in
      // FHIRPath.  We only need to do this once per form.
      var lfData = this._lfData;
      if (!lfData._fhirVariables.questionnaire) {
        lfData._fhirVariables.questionnaire =
          LForms.Util.getFormFHIRData('Questionnaire', lfData.fhirVersion, lfData);
      }
      var firstRun = true;
      var changed = true;
      var start = new Date();
      while (changed) {
        if (changed || firstRun) {
          this._regenerateQuestionnaireResp();
          changed = this._evaluateVariables(lfData, !firstRun);
        }
        if (changed || firstRun)
          changed = this._evaluateFieldExpressions(lfData, includeInitialExpr, !firstRun);
        firstRun = false;
      }
      console.log("Ran FHIRPath expressions in "+(new Date()-start)+" ms");
    },


    /**
     *  Evaluates variables on the given item.
     * @param item an LFormsData or item from LFormsData.
     */
    _evaluateVariables: function(item) {
      var rtn = false;
      var variableExts = item._variableExt;
      if (variableExts) {
        for (let i=0, len=variableExts.length; i<len; ++i) {
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
            var newVal = this._evaluateFHIRPath(item, ext.valueExpression.expression);
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
     * @param invludeInitialExpr whether or not to run expressions from
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
      else if (!changesOnly) {  // process this and all child items
        item._varChanged = false; // clear flag in case it was set
        var exts = [];
        if (includeInitialExpr && item._initialExprExt)
          exts.push(item._initialExprExt);
        if (item._calculatedExprExt)
          exts.push(item._calculatedExprExt);
        let changed = false;
        for (let i=0, len=exts.length; i<len; ++i) {
          var ext = exts[i];
          if (ext && ext.valueExpression.language=="text/fhirpath") {
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
        for (let i=0, len=item.items.length; i<len; ++i) {
          let changed = this._evaluateFieldExpressions(item.items[i], includeInitialExpr, changesOnly);
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
        let fhirContext = item._elementId ? this._elemIDToQRItem[item._elementId] :
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

        if (lfItem._elementId && (added || !this._lfData.isEmpty(lfItem))) { // this item has a value
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
