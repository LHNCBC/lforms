// Tests for ExpressionProcessor
describe('ExpressionProcessor', function () {
  describe('%qitem', function() {
    it('should be supported', function(done) {
      // Test by checking that QR.item.answer.value works to return a value (as
      // opposed to "valueString", which is what it would be without model information).
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{
        linkId: '/q1', dataType: 'ST', value: "green",  items: [{
          linkId: '/q2', dataType: 'ST',
          extension: [{
            "url": LForms.FHIR.R4.SDC.fhirExtCalculatedExp,
            "valueExpression": {
              "language": "text/fhirpath",
              "expression": "%qitem.type"
            }
          }]
        }]
      }]});
      lfData._expressionProcessor.runCalculations().then(() => {
        assert.equal(lfData.items[0].items[0].linkId, '/q2');
        assert.equal(lfData.items[0].items[0].value, 'string');
        done();
      });
    });
  });

  describe('_evaluateFHIRPath', function() {
    it('should use the FHIR model', function(done) {
      // Test by checking that QR.item.answer.value works to return a value (as
      // opposed to "valueString", which is what it would be without model information).
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{
        linkId: '/q1', dataType: 'ST', value: "green"
      }, {
        linkId: '/q2', dataType: 'ST',
        extension: [{
          "url": LForms.FHIR.R4.SDC.fhirExtCalculatedExp,
          "valueExpression": {
            "language": "text/fhirpath",
            "expression": "%resource.item.where(linkId='/q1').answer.value"
          }
        }]
      }]});
      var exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData)
      exp.runCalculations().then(() => {
        assert.equal(lfData.items[1].value, lfData.items[0].value);
        done();
      });
    });
  });

  describe('_addToIDtoQRItemMap', function() {
    it('should handle repeating items with missing data', function() {
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{linkId: '/g1', items:  [{
        linkId: '/g1/q1',
        questionCardinality: {"min": "1", "max": "*"},
        value: 1
      },
      {
        linkId: '/g1/q1',
        questionCardinality: {"min": "1", "max": "*"},
        // blank
      },
      {
        linkId: '/g1/q1',
        questionCardinality: {"min": "1", "max": "*"},
        value: 2
      }]}]});
      var qrItem = {linkId: '/g1', item: [{
        linkId: '/g1/q1',
        answer: [1, 2]
      }]}
      var lfItem = lfData.items[0];
      var exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData)
      var map = {};
      exp._addToIDtoQRItemMap(lfItem, qrItem, map);
      assert.deepEqual(map, {'/g1/1': qrItem, '/g1/q1/1/1': qrItem.item[0], '/g1/q1/1/3': qrItem.item[0]});
    });

    it('should handle items with data that are two levels down', function() {
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{linkId: '/g1', items:  [{
        linkId: '/g1/g1A', items: [{
          linkId: '/g1/g1A/q1',
          questionCardinality: {"min": "1", "max": "*"},
          value: 1
        },
        {
          linkId: '/g1/g1A/q1',
          questionCardinality: {"min": "1", "max": "*"},
          // blank
        },
        {
          linkId: '/g1/g1A/q1',
          questionCardinality: {"min": "1", "max": "*"},
          value: 2
        }
      ]}]}]});
      var qrItem = {linkId: '/g1', item: [{
        linkId: '/g1/g1A', item: [{
          linkId: '/g1/g1A/q1',
          answer: [1, 2]
        }]
      }]};
      var lfItem = lfData.items[0];
      var exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData)
      var map = {};
      exp._addToIDtoQRItemMap(lfItem, qrItem, map);
      //console.log(Object.keys(map))
      assert.deepEqual(map, {'/g1/1': qrItem, '/g1/g1A/1/1': qrItem.item[0],
        '/g1/g1A/q1/1/1/1': qrItem.item[0].item[0], '/g1/g1A/q1/1/1/3': qrItem.item[0].item[0]});
    });

    it('should skip over blank LForms questions', function() {
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{
        linkId: '/g1A', items: [{
          linkId: '/g1A/q1',
          questionCardinality: {"min": "1", "max": "1"},
        },
        {
          linkId: '/g1A/q2',
          questionCardinality: {"min": "1", "max": "1"},
          value: 2
        }
      ]}]});
      var qrItem = {
        linkId: '/g1A', item: [{
          linkId: '/g1A/q2',
          answer: [2]
        }]
      };
      var lfItem = lfData.items[0];
      var exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData)
      var map = {};
      exp._addToIDtoQRItemMap(lfItem, qrItem, map);
      assert.deepEqual(map, {'/g1A/1': qrItem, '/g1A/q2/1/1': qrItem.item[0]});
    });

    it('should handle two sibling sub-sections', function() {
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{
        linkId: '/g1A', items: [{
          linkId: '/g1A/q1',
          questionCardinality: {"min": "1", "max": "1"}
        }]}, {
        linkId: '/g2A', items: [{  linkId: '/g2A/q2',
          questionCardinality: {"min": "1", "max": "1"},
          value: 2
        }]}
      ]});
      var qr = {item:[{
        linkId: '/g2A', item: [{
          linkId: '/g2A/q2',
          answer: [2]
        }]
      }]};
      var exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData);
      var map = {};
      exp._addToIDtoQRItemMap(lfData, qr, map);
      assert.deepEqual(map, {'/g2A/1': qr.item[0], '/g2A/q2/1/1': qr.item[0].item[0]});
    });


    it('should handle repeated answers from a list', function() {
      // Repeats on a list question are handled with just one item in LForms.
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: [{
        linkId: '/g1A', items: [{
          linkId: '/g1A/q1',
          questionCardinality: {"min": "1", "max": "1"},
          answerCardinality: {"min": "0", "max": "*"},
          value: ['a', 'b']
        }]}
      ]});
      var qr = {item:[{
        linkId: '/g1A', item: [{
          linkId: '/g1A/q1',
          answer: ['a', 'b']
        }]
      }]};
      var exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData);
      var map = {};
      exp._addToIDtoQRItemMap(lfData, qr, map);
      assert.deepEqual(map, {'/g1A/1': qr.item[0], '/g1A/q1/1/1': qr.item[0].item[0]});
    });
  });

  describe('for editable calculated fields', function() {
    let testQ, testLFData, bmiItem, weightItem, heightItem;
    before(function(done) {
      var file = 'test/data/R4/weightHeightQuestionnaire.json';
      LForms.jQuery.get(file, function (parsedJson) {
        testQ = parsedJson;
        done();
      });
    });

    beforeEach(function() {
      let lformsDef = LForms.Util.convertFHIRQuestionnaireToLForms(
        testQ, 'R4');
      testLFData = new LForms.LFormsData(lformsDef);
      weightItem = testLFData.itemList[0];
      heightItem = testLFData.itemList[2];
      bmiItem = testLFData.itemList[3];
      bmiItem._readOnly = false; // make it editable
    });

    describe('when there is no saved data', function() {
      it('should update values if user has not edited the field', function() {
        return testLFData._expressionProcessor.runCalculations(true).then(()=>{
          assert.equal(bmiItem.value, undefined);
          weightItem.value = 70;
          heightItem.value = 80;
          return testLFData._expressionProcessor.runCalculations(false).then(()=>{
            assert.equal(bmiItem.value, 17.0);
          });
        });
      });

      it('should not update values if user has edited the field', function() {
        return testLFData._expressionProcessor.runCalculations(true).then(()=>{
          assert.equal(bmiItem.value, undefined);
          weightItem.value = 70;
          heightItem.value = 80;
          return testLFData._expressionProcessor.runCalculations(false);
        }).then(()=>{
          bmiItem.value = 20; // edited
          return testLFData._expressionProcessor.runCalculations(false);
        }).then(()=>{
          assert.equal(bmiItem.value, 20);
        });
      });
    });

    describe('when there is saved data', function() {
      beforeEach(function () {
        testLFData.hasSavedData = true;
        weightItem.value = 55;
        heightItem.value = 75;
      });

      it('should update values if the initial value matched the calculated value', ()=>{
        bmiItem.value = 15.2; // same as calculated value
        return testLFData._expressionProcessor.runCalculations(true).then(()=>{
          assert.equal(bmiItem.value, 15.2);
          weightItem.value = 65;
          return testLFData._expressionProcessor.runCalculations(false).then(()=>{
            assert.equal(bmiItem.value, '17.9');
          });
        });
      });

      it('should not update values if the initial value did not match the calculated', ()=>{
        bmiItem.value = 15.3; // edited
        return testLFData._expressionProcessor.runCalculations(true).then(()=>{
          assert.equal(bmiItem.value, 15.3);
          weightItem.value = 65;
          return testLFData._expressionProcessor.runCalculations(false).then(()=>{
            assert.equal(bmiItem.value, '15.3');
          });
        });
      });
    });
  });

  describe('_queryCache', function() {
    it('should be unique for each ExpressionProcessor', function() {
      var lfData = new LForms.LFormsData({fhirVersion: 'R4', items: []});
      var exp1 = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData);
      exp1._queryCache[1] = 2;
      var exp2 = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData);
      assert.equal(Object.keys(exp2._queryCache).length, 0);
      assert.equal(Object.keys(exp1._queryCache).length, 1);
    });
  });


  describe('Quantities from expressions', ()=>{
    // see https://jira.hl7.org/browse/FHIR-30581

    const questionnaire = {resourceType: 'Questionnaire',
      item: [{
        linkId: 'q1', type: 'quantity',
        extension: [{
          url: "data for expressions",
          valueQuantity: {
            value: 5, unit: "kg", code: "kg", system: "http://unitsofmeasure.org"
          }
        }, {
          url: "data for expressions",
          valueQuantity: {
            value: 5, unit: "mg", code: "mg", system: "http://unitsofmeasure.org"
          }
        }, {
          url: "data for expressions",
          valueQuantity: {
            value: 4, unit: "m", code: "m", system: "http://unitsofmeasure.org"
          }
        }, {
          "url": LForms.FHIR.R4.SDC.fhirExtCalculatedExp,
          "valueExpression": {
            "language": "text/fhirpath",
            "expression": "%questionnaire.item[0].extension[0].value"
          }
        }, {
          "url": LForms.FHIR.R4.SDC.fhirExtUrlUnitOption,
          "valueCoding": {
            display: "kilograms", code: "kg", system: "http://unitsofmeasure.org"
          }
        }, {
          "url": LForms.FHIR.R4.SDC.fhirExtUrlUnitOption,
          "valueCoding": {
            display: "g", code: "g", system: "http://unitsofmeasure.org"
          }
        }]
      }
    ]};


    it('should set the unit if a matching unit is found',  (done)=>{
      const form = LForms.Util.convertFHIRQuestionnaireToLForms(questionnaire, 'R4');
      const lfData = new LForms.LFormsData(form);
      const exp = lfData._expressionProcessor;
      exp.runCalculations().then(() => {
        try {
          const val = questionnaire.item[0].extension[0].valueQuantity;
          assert.equal(lfData.items[0].value, val.value);
          assert.equal(lfData.items[0].unit.code, val.code);
          assert.equal(lfData.items[0].unit.system, val.system);
          assert.equal(lfData.items[0].unit.name, val.unit);
          done();
        }
        catch(e) {done(e)}
      });
    });


    it('should set the unit if a commensurate unit is found',  (done)=>{
      // Change the expression to use the second valueQuantity
      const qCopy = JSON.parse(JSON.stringify(questionnaire));
      const valueExp = qCopy.item[0].extension[3].valueExpression;
      valueExp.expression = valueExp.expression.replace(/extension\[0\]/, 'extension[1]');

      const form = LForms.Util.convertFHIRQuestionnaireToLForms(qCopy, 'R4');
      const lfData = new LForms.LFormsData(form);
      const exp = lfData._expressionProcessor;
      exp.runCalculations().then(() => {
        try {
          const val = qCopy.item[0].extension[1].valueQuantity;
          const matchingUnit = qCopy.item[0].extension[4].valueCoding;
          assert.equal(lfData.items[0].value, val.value/1000000); // converted from mg to kg
          assert.equal(lfData.items[0].unit.code, matchingUnit.code);
          assert.equal(lfData.items[0].unit.system, matchingUnit.system);
          assert.equal(lfData.items[0].unit.name, matchingUnit.display);
          done();
        }
        catch(e) {done(e)}
      });
    });

    it('should report an error and not fill in the value if a commensurate unit is not found',  (done)=>{
      // This is probably an error, either in the coding of the data the
      // expression found, or in the design of the Questionnaire.  It should
      // probably not be allowed even if the unit-open extension is specified.
      // Change the expression to use the third valueQuantity
      const qCopy = JSON.parse(JSON.stringify(questionnaire));
      const valueExp = qCopy.item[0].extension[3].valueExpression;
      valueExp.expression = valueExp.expression.replace(/extension\[0\]/, 'extension[2]');

      const form = LForms.Util.convertFHIRQuestionnaireToLForms(qCopy, 'R4');
      const lfData = new LForms.LFormsData(form);
      const exp = lfData._expressionProcessor;
      const testItem = lfData.items[0];
      assert(!testItem.messages);
      exp.runCalculations().then(() => {
        try {
          assert.equal(testItem.value, undefined);
          assert.equal(testItem.unit, undefined);
          assert(testItem.messages);
          done();
        }
        catch(e) {done(e)}
      });
    });


    it('should not report an error for a non-matching unit if unitOpen is set', (done)=>{
      const qCopy = JSON.parse(JSON.stringify(questionnaire));
      const valueExp = qCopy.item[0].extension[3].valueExpression;
      valueExp.expression = valueExp.expression.replace(/extension\[0\]/, 'extension[2]');
      qCopy.item[0].extension.push({
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-unitOpen",
        "valueCode": "optionsOrType"
      });
      qCopy.item[0].extension.push({
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-unitSupplementalSystem",
        "valueCanonical": "http://unitsofmeasure.org"
      });

      const form = LForms.Util.convertFHIRQuestionnaireToLForms(qCopy, 'R4');
      const lfData = new LForms.LFormsData(form);
      const exp = lfData._expressionProcessor;
      const testItem = lfData.items[0];
      assert(!testItem.messages);
      exp.runCalculations().then(() => {
        try {
          const val = qCopy.item[0].extension[2].valueQuantity;
          assert.equal(lfData.items[0].value, val.value);
          assert.equal(lfData.items[0].unit.code, val.code);
          assert.equal(lfData.items[0].unit.system, val.system);
          assert.equal(lfData.items[0].unit.name, val.unit);
          assert(!testItem.messages);
          done();
        }
        catch(e) {done(e)}
      });
    });

    it('should report an error for a non-matching system if unitOpen=optionsOrType', (done)=>{
      const qCopy = JSON.parse(JSON.stringify(questionnaire));
      const valueExp = qCopy.item[0].extension[3].valueExpression;
      valueExp.expression = valueExp.expression.replace(/extension\[0\]/, 'extension[2]');
      qCopy.item[0].extension.push({
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-unitOpen",
        "valueCode": "optionsOrType"
      });
      qCopy.item[0].extension.push({
        "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-unitSupplementalSystem",
        "valueCanonical": "http://example.com"
      });

      const form = LForms.Util.convertFHIRQuestionnaireToLForms(qCopy, 'R4');
      const lfData = new LForms.LFormsData(form);
      const exp = lfData._expressionProcessor;
      const testItem = lfData.items[0];
      assert(!testItem.messages);
      exp.runCalculations().then(() => {
        try {
          assert.equal(testItem.value, undefined);
          assert.equal(testItem.unit, undefined);
          assert(testItem.messages);
          done();
        }
        catch(e) {done(e)}
      });
    });
  });

  describe('application/x-fhir-query', function() {
    afterEach(() => {
      restoreOriginalFetch();
    })
    it('should be supported', function(done) {
      mockFetchResults([[
        /https:\/\/clinicaltables\.nlm\.nih\.gov\/fhir\/R4\/CodeSystem\/\$lookup\?system=https:\/\/clinicaltables\.nlm\.nih\.gov\/fhir\/CodeSystem\/rxterms&code=AR&property=STRENGTHS_AND_FORMS&_format=json/,
        {
          "resourceType": "Parameters",
          "parameter": [
            {
              "name": "name",
              "valueString": "rxterms/ctss"
            },
            {
              "name": "display",
              "valueString": "AXID AR (Oral Pill)"
            },
            {
              "name": "property",
              "part": [
                {
                  "name": "code",
                  "valueCode": "STRENGTHS_AND_FORMS"
                },
                {
                  "name": "value",
                  "valueCoding": {
                    "code": "211821",
                    "display": "75 mg Tab"
                  }
                }
              ]
            }
          ]
        }
      ]]);

      const lfData = new LForms.LFormsData({
        fhirVersion: 'R4',
        extension: [{
          "url" : LForms.FHIR.R4.SDC.fhirExtVariable,
          "valueExpression" : {
            "name": "strengthFormLookup",
            "language": "application/x-fhir-query",
            "expression": "https://clinicaltables.nlm.nih.gov/fhir/R4/CodeSystem/$lookup?system=https://clinicaltables.nlm.nih.gov/fhir/CodeSystem/rxterms&code={{%resource.item.where(linkId='/q1').answer.value}}&property=STRENGTHS_AND_FORMS"
          }
        }],
        items: [{
          linkId: '/q1', dataType: 'ST', value: "AR"
        }, {
          linkId: '/q2', dataType: 'CODING',
          answers: [
            {
              "code": "211821",
              "display": "75 mg Tab"
            }
          ],
          extension: [{
            "url" : LForms.FHIR.R4.SDC.fhirExtCalculatedExp,
            "valueExpression" : {
              "language": "text/fhirpath",
              "expression": "%strengthFormLookup.parameter.where(name='property' and part.where(name='code' and value='STRENGTHS_AND_FORMS').exists()).part.where(name='value').value"
            }
          }]
        }]
      });

      const exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData);
      exp.runCalculations().then(() => {
        assert.deepStrictEqual(lfData.items[1].value, {
          "code": "211821",
          "display": "75 mg Tab"
        });
        done();
      });
    });
  });

  describe('asynchronous expression in text/fhirpath', function() {
    afterEach(() => {
      window.fetch = originalFetch;
    })
    it('should be supported', function(done) {
      mockFetchResults([
        [/ValueSet\?url=http%3A%2F%2Fhl7\.org%2Ffhir%2FValueSet%2Fobservation-vitalsignresult/, {
          "resourceType": "Bundle",
          "entry": [
            {
              "resource": {
                "resourceType": "ValueSet",
                "compose": {
                  "include": [
                    {
                      "system": "http://loinc.org",
                    }
                  ]
                }
              }
            }
          ]
        }],
        [/code=29463-7&system=http%3A%2F%2Floinc\.org/, {
          "resourceType": "Parameters",
          "parameter": [
            {
              "name": "result",
              "valueBoolean": true
            }
          ]
        }]
      ]);

      const lfData = new LForms.LFormsData({
        fhirVersion: 'R4',
        extension: [{
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-preferredTerminologyServer",
          "valueUrl": "https://clinicaltables.nlm.nih.gov/fhir/R4"
        }],
        items: [{
          linkId: '/q1', dataType: 'ST',
          // TODO: I don't know why the LForms.LFormsData constructor doesn't initialize terminologyServer from "extensions"
          terminologyServer: 'https://lforms-fhir.nlm.nih.gov/baseR4',
          extension: [
            // {
            //   "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-preferredTerminologyServer",
            //   "valueUrl": "'https://lforms-fhir.nlm.nih.gov/baseR4"
            // },
            {
              "url" : LForms.FHIR.R4.SDC.fhirExtVariable,
              "valueExpression" : {
                "name": "someBool",
                "language": "text/fhirpath",
                "expression": "'29463-7'.memberOf('http://hl7.org/fhir/ValueSet/observation-vitalsignresult')"
              }
            }, {
            "url" : LForms.FHIR.R4.SDC.fhirExtCalculatedExp,
            "valueExpression" : {
              "language": "text/fhirpath",
              "expression": "iif(%someBool, 'valTrue', 'valFalse')"
            }
          }]
        }]
      });

      const exp = new LForms.FHIR.R4.SDC.ExpressionProcessor(lfData);
      exp.runCalculations().then(() => {
        assert.equal(lfData.items[0].value, 'valTrue');
        done();
      });
    });
  });


  ['STU3', 'R4', 'R5'].forEach(modelName => {
    describe(`weight() for ${modelName} questionnaire`, function() {
      let testQ, testVS;

      describe('with contained ValueSet', function () {
        before(function(done) {
          const filename = `test/data/${modelName}/calc-weight/q-with-contained-valueset.json`;
          LForms.jQuery.get(filename, function (parsedJson) {
            testQ = parsedJson;
            done();
          }).fail(function(e) {
            console.error(e);
          });
        });

        it('should work correctly', function() {
          let lformsDef = LForms.Util.convertFHIRQuestionnaireToLForms(
            testQ, modelName);
          const testLFData = new LForms.LFormsData(lformsDef);
          testLFData.itemList[2].value = {
            "code": "some-code-1",
            "system": "some-system-1"
          };
          testLFData.itemList[3].value = {
            "code": "some-code-2",
            "system": "some-system-2"
          };
          assert.equal(testLFData.itemList[4].value, undefined);
          return testLFData._expressionProcessor.runCalculations(true).then(()=>{
            assert.equal(testLFData.itemList[4].value, 21);
          });
        });
      });

      describe('with a value set retrieved from the terminology server', function () {
        before(function (done) {
          const filenameQ = `test/data/${modelName}/calc-weight/q-with-a-value-set-from-the-terminology-server.json`;
          const filenameVS = `test/data/${modelName}/calc-weight/some-value-set-1.json`;
          LForms.jQuery.when(
            LForms.jQuery.get(filenameQ, function (parsedJson) {
              testQ = parsedJson;
            }),
            LForms.jQuery.get(filenameVS, function (parsedJson) {
              testVS = parsedJson;
            }))
            .fail(function (e) {
              console.error(e);
            })
            .done(function () {
              done();
            });
        });

        it('should work correctly', function () {
          mockFetchResults([
            ['ValueSet/$expand?url=some-value-set-1', testVS]
          ]);
          let lformsDef = LForms.Util.convertFHIRQuestionnaireToLForms(
            testQ, modelName);
          const testLFData = new LForms.LFormsData(lformsDef);
          testLFData.itemList[2].value = {
            "code": "some-code-1",
            "system": "some-system-1"
          };
          testLFData.itemList[3].value = {
            "code": "some-code-2",
            "system": "some-system-2"
          };
          assert.equal(testLFData.itemList[4].value, undefined);
          return testLFData._expressionProcessor.runCalculations(true).then(() => {
            assert.equal(testLFData.itemList[4].value, 21);
          });
        });
      });

      if (modelName === 'R4') {
        describe('phq-9 with weight function', function () {
          before(function(done) {
            const filename = `test/data/R4/calc-weight/phq9-with-the-weight-function.json`;
            LForms.jQuery.get(filename, function (parsedJson) {
              testQ = parsedJson;
              done();
            }).fail(function(e) {
              console.error(e);
            });
          });

          it('should work correctly', function() {
            let lformsDef = LForms.Util.convertFHIRQuestionnaireToLForms(
              testQ, modelName);
            const testLFData = new LForms.LFormsData(lformsDef);
            testLFData.itemList.forEach(item => {
              if ((item.answers || item.answerValueSet) && item.linkId !== '/69722-7') {
                item.value = {
                  code: 'LA6569-3',
                  system: 'http://loinc.org'
                };
              }
            });
            assert.equal(testLFData.itemList[9].value, undefined);
            return testLFData._expressionProcessor.runCalculations(true).then(()=>{
              assert.equal(testLFData.itemList[9].value, 9);
            });
          });
        });
      }

    });
  });

});
