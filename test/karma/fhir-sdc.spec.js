/**
 * Create link id using other than _codePath.
 *
 * @param lfItems
 * @param codeList
 */
function createLinkId(lfItems, codeList) {
  if(!lfItems || !lfItems.length > 0) {
    return;
  }

  if(!codeList) {
    codeList = [];
  }

  lfItems.forEach(function(item){
    codeList.push(item.questionCode);
    item.linkId = codeList.join('_');
    createLinkId(item.items, codeList);
    codeList.pop();
  });
}


// Tests for FHIR SDC library
var fhirVersions = Object.keys(LForms.Util.FHIRSupport);
for (var i=0, len=fhirVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    var fhir = LForms.FHIR[fhirVersion];
    describe(fhirVersion, function() {
      describe('FHIR SDC library', function() {
        describe('_processFHIRValues', function() {
        let i=0;
          describe('list fields with coding values', function () {
            let answerValCases = [{
              answers: [{system: 'cs1', code: '1', text: 'one'},
                {system: 'cs1', code: '2', text: 'two'},
                {system: 'cs1', code: '3', text: 'three'}],
              fhirVal: {display: 'two', code: '2', system: 'cs1'},
              fhirVal2: {display: 'three', code: '3', system: 'cs1'}
            }, {
              answers: [{code: '1', text: 'one'},
                {code: '2', text: 'two'},
                {code: '3', text: 'three'}],
              fhirVal: {display: 'two', code: '2'}, fhirVal2: {display: 'three', code: '3'}
            }, {
              answers: [{text: 'one'}, {text: 'two'}, {text: 'three'}],
              fhirVal: {display: 'two'}, fhirVal2: {display: 'three'}
            }, {
              answers: [{system: 'cs1', code: '1'},
                {system: 'cs1', code: '2'},
                {system: 'cs1', code: '3'}],
              fhirVal: {code: '2', system: 'cs1'}, fhirVal2: {code: '3', system: 'cs1'}
            }, {
              answers: [{code: '1'}, {code: '2'}, {code: '3'}],
              fhirVal: {code: '2'}, fhirVal2: {code: '3'}
            }];
            for (let multiselect of [false, true]) {
              for (let {answers, fhirVal, fhirVal2} of answerValCases) {
                for (let dataType of ['CNE', 'CWE']) {
                  for (let type of [undefined, 'Coding', 'CodeableConcept']) {
                    it('should set a '+(multiselect ? 'multiselect ' : 'single-select ')+
                       dataType+' value with '+Object.keys(fhirVal)+', and _type='+type, function() {
                      let lfItem = {dataType, answers};
                      let fhirVals = [JSON.parse(JSON.stringify(fhirVal))];
                      if (multiselect) {
                        fhirVals.push(JSON.parse(JSON.stringify(fhirVal2)));
                        lfItem.answerCardinality = {max: '*'};
                        lfItem._multipleAnswers = true;
                      }
                      if (type === 'CodeableConcept') {
                        // Make each value a CodeableConcept (containing the
                        // coding), and add an extra off-list coding (which
                        // should not show up in the processed answers).
                        fhirVals = fhirVals.map((c)=>{return {coding: [c]}});
                        fhirVals[0].coding.push({display: 'four', code: '4', system: 'cs1'});
                      }
                      if (type != undefined)
                        fhirVals.forEach((v)=>v._type=type);
                      fhir.SDC._processFHIRValues(lfItem, fhirVals);
                      let expected = multiselect ? [lfItem.answers[1], lfItem.answers[2]] : lfItem.answers[1];
                      assert.deepEqual(lfItem.value, expected);
                    });
                  }
                }
              }
            }
          });

          describe('list fields and off-list coding values', function() {
            let answers = [{system: 'cs1', code: '1', text: 'one'},
                {system: 'cs1', code: '2', text: 'two'},
                {system: 'cs1', code: '3', text: 'three'}];
            let cases = [
              [{display: 'four'}, {display: 'five'}],
              [{display: 'four', code: '1'}, {display: 'five', code: '2'}]];
            let expectedOutput = [
                [{text: 'four', _notOnList: true}, {text: 'five', _notOnList: true}],
                // The next one is because the code systems did not match
                [{text: 'four', code: '1', _notOnList: true}, {text: 'five', code: '2', _notOnList: true}]];
            cases.forEach((caseN, n)=>{
              for (let multiselect of [false, true]) {
                it('should handle off-list answers for '+
                   (multiselect ? 'multiselect' : 'single-select')+' lists', function() {
                  let lfItem = {dataType: 'CWE', answers};
                  let fhirVals = [caseN[0]];
                  if (multiselect) {
                    fhirVals.push(caseN[1]);
                    lfItem.answerCardinality = {max: '*'};
                    lfItem._multipleAnswers = true;
                  }
                  fhir.SDC._processFHIRValues(lfItem, fhirVals);
                  let expected = expectedOutput[n];
                  // The processing code sets _displayText because these are
                  // not on the list.
                  expected.forEach((v)=>v._displayText = v.text);
                  if (!multiselect)
                    expected = expected[0];

                  assert.deepEqual(lfItem.value, expected);
                });
              }
            });
          });

          describe('list fields and off-list string values', function() {
            let answers = [{system: 'cs1', code: '1', text: 'one'},
                {system: 'cs1', code: '2', text: 'two'},
                {system: 'cs1', code: '3', text: 'three'}];
            for (let multiselect of [false, true]) {
              it('should handle off-list answers for '+
                 (multiselect ? 'multiselect' : 'single-select')+' lists', function() {
                let lfItem = {dataType: 'CWE', answers};
                let fhirVals = ['four'];
                if (multiselect) {
                  fhirVals.push('five');
                  lfItem.answerCardinality = {max: '*'};
                  lfItem._multipleAnswers = true;
                }
                fhir.SDC._processFHIRValues(lfItem, fhirVals);
                let expected = multiselect ? fhirVals : fhirVals[0];
                assert.deepEqual(lfItem.value, expected);
              });
            }
          });

          describe('date/time fields', function() {
            let dateStr = '2020-02-12';
            let dateTimeStr = '2020-02-12T18:45-05:00'
            for (let dataType of ['DT', 'DTM']) {
              it ('should set the string value on defaultAnswer for data type '+dataType, function() {
                let lfItem = {dataType};
                let fhirVal = dataType==='DT' ? dateStr : dateTimeStr;
                fhir.SDC._processFHIRValues(lfItem, [fhirVal], true);
                assert.equal(lfItem.defaultAnswer, fhirVal);
              });

              it ('should set a Date value on .value for data type '+dataType, function() {
                let lfItem = {dataType};
                let fhirVal, expected;
                if (dataType==='DT') {
                  fhirVal = dateStr;
                  expected = LForms.Util.stringToDTDateISO(fhirVal);
                }
                else {
                  fhirVal = dateTimeStr;
                  expected = new Date(fhirVal);
                }
                fhir.SDC._processFHIRValues(lfItem, [fhirVal]);
                assert.equal(lfItem.value.getTime(), expected.getTime());
              });
            }
          });
        }); // _processFHIRValues

        describe('_significantDigits', function() {
          it('should count zeros left of the decimal', function() {
            // This is because users are not likely to enter number in
            // scientific notation.
            assert.equal(fhir.SDC._significantDigits(12300), 5);
          });
          it('should count digits right of the decimal', function() {
            assert.equal(fhir.SDC._significantDigits(12.01), 4);
          });
        });

        describe('Round trip conversion', function() {
          it('should preserve extensions on _title', function (){
            var questionnaire = {
              _title: {
                extension: [{
                  "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                  "valueString": "color: green"
                }]
              }
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            assert.ok(qData._title);
            assert.deepEqual(qData._title, questionnaire._title);
          });

          it('should correctly translate between questionCardinality/answerCardinality and item.repeats, maxOccurs', function (){
            var questionnaire = {
              "code": [
                  {
                      "code": "cardinality-testing",
                      "display": "cardinality testing"
                  }
              ],
              "title": "cardinality testing",
              "resourceType": "Questionnaire",
              "status": "draft",
              "meta": {
                  "profile": [
                      "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"
                  ]
              },
              "item": [
                {
                  "type": "string",
                  "code": [
                      {
                          "code": "q1",
                          "display": "A Repeating Item"
                      }
                  ],
                  "repeats": true,
                  "linkId": "/q1",
                  "text": "A Repeating Item"
                },
                {
                  "type": "choice",
                  "code": [
                      {
                          "code": "q2",
                          "display": "Multi Selection on CNE"
                      }
                  ],
                  "repeats": true,
                  "linkId": "/q2",
                  "text": "Multi Selection on CNE",
                  "answerOption": [
                      {
                          "valueCoding": {
                              "code": "c1",
                              "display": "Answer 1"
                          }
                      },
                      {
                          "valueCoding": {
                              "code": "c2",
                              "display": "Answer 2"
                          }
                      }
                  ]
                },
                {
                  "type": "string",
                  "code": [
                      {
                          "code": "q3",
                          "display": "Another Repeating Item"
                      }
                  ],
                  "repeats": true,
                  "linkId": "/q3",
                  "text": "Another Repeating Item",
                  "extension": [
                    { "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs",
                      "valueInteger": 5
                    }
                  ]
                },
              ]
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);

            assert.deepEqual(lfData.items[0].questionCardinality, {min: '1', max:"*"});
            assert.equal(lfData.items[0].answerCardinality, undefined);
            assert.equal(lfData.items[1].questionCardinality, undefined);
            assert.deepEqual(lfData.items[1].answerCardinality, {min: "0", max:"*"});
            assert.deepEqual(lfData.items[2].questionCardinality, {min: '1', max: '5'});
            assert.equal(lfData.items[2].answerCardinality, undefined);

            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            assert.equal(qData.item[0].repeats, true);
            assert.equal(qData.item[1].repeats, true);
            assert.equal(qData.item[2].repeats, true);
            assert.deepEqual(qData.item[2].extension[0],
              { "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs", "valueInteger": 5});


          });

          it('should correctly translate name & title fields', function (){
            var questionnaire = {
              name: 'FHP',
              title: 'Family Health Portrait'
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            assert.equal(lfData.name, questionnaire.title);
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            assert.equal(qData.title, questionnaire.title);
            assert.equal(qData.name, questionnaire.name);
          });

          it('should correctly translate minValue and maxValue fields', function (){
            var questionnaire = {
              "status": "draft",
              "resourceType": "Questionnaire",
              "meta": {
                "profile": ["http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|2.7"],
                "tag": [{ "code": "lformsVersion: 25.1.3" }]
              },
              "item": [
                {
                  "type": "integer",
                  "extension": [
                    { "url": "http://hl7.org/fhir/StructureDefinition/minValue", "valueInteger": 0 },
                    { "url": "http://hl7.org/fhir/StructureDefinition/maxValue", "valueInteger": 1 }
                  ],
                  "required": false,
                  "linkId": "q2",
                  "text": "q2"
                }
              ]
            }
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            console.log(lfData.items[0])
            assert.equal(lfData.items[0].restrictions['minInclusive'], 0);
            assert.equal(lfData.items[0].restrictions['maxInclusive'], 1);
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            assert.deepEqual(qData.item[0].extension, [
              { "url": "http://hl7.org/fhir/StructureDefinition/minValue", "valueInteger": 0 },
              { "url": "http://hl7.org/fhir/StructureDefinition/maxValue", "valueInteger": 1 }
            ]);

          });


          it('should add lformsVersion if not present', function (){
            var questionnaire = {
              name: 'FHP'
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            var lfDataVersion = lfData.lformsVersion;
            assert(typeof lfDataVersion === 'string');
            assert(lfDataVersion.length > 0);
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            var qDataVersion = qData.meta.tag[0].code;
            assert.equal(typeof qDataVersion, 'string');
            assert.match(qDataVersion, /^lformsVersion: /);
          });

          it('should update lformsVersion if present', function (){
            var oldVersionTag = 'lformsVersion: oldVersion';
            var questionnaire = {
              name: 'FHP',
              meta: {tag: [{code: oldVersionTag}]}
            };

            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            var lfDataVersion = lfData.lformsVersion;
            assert.equal(typeof lfDataVersion, 'string');
            assert(lfDataVersion.length > 0);
            assert.notEqual(lfDataVersion, 'oldVersion');
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            var qDataVersion = qData.meta.tag[0].code;
            var versionTagCount = 0;
            for (let tag of qData.meta.tag) {
              tag = tag.code;
              if (/^lformsVersion: /.test(tag)) {
                ++versionTagCount;
                assert.notEqual(tag, oldVersionTag);
              }
            }
            assert.equal(versionTagCount, 1);
          });

          it('should preserve extensions on item._prefix & _text', function (){
            var questionnaire = {
              item: [{
                _prefix: {
                  extension: [{
                    "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                    "valueString": "color: green"
                  }]
                },
                _text: {
                  extension: [{
                    "url": "http://hl7.org/fhir/StructureDefinition/rendering-style",
                    "valueString": "color: green"
                  }]
                }
              }]
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            assert.ok(qData.item[0]._prefix);
            assert.deepEqual(qData.item[0]._prefix, questionnaire.item[0]._prefix);
            assert.ok(qData.item[0]._text);
            assert.deepEqual(qData.item[0]._text, questionnaire.item[0]._text);
          });

          it('should correctly convert data control', function (){
            var questionnaire = {
              item: [ {
                "type": "choice",
                "code": [
                  {
                    "code": "itemWithExtraData",
                    "display": "Drug (with extra data of strengths and forms)"
                  }
                ],
                "linkId": "/dataControlExamples/itemWithExtraData",
                "text": "Drug (with extra data of strengths and forms)"
              },{
                "type": "string",
                "code": [
                  {
                    "code": "controlledItem_TEXT",
                    "display": "The First Strength (from 'Drugs')"
                  }
                ],
                "extension": [
                  {
                    "url": "http://lhcforms.nlm.nih.gov/fhirExt/dataControl",
                    "valueString": "[{\"source\":{\"sourceLinkId\":\"/dataControlExamples/itemWithExtraData\"},\"construction\":\"SIMPLE\",\"dataFormat\":\"value.data.STRENGTHS_AND_FORMS[0]\",\"onAttribute\":\"value\"}]"
                  }
                ],
                "required": false,
                "linkId": "/dataControlExamples/controlledItem_TEXT",
                "text": "The First Strength (from 'Drugs')"
              }]
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(questionnaire);
            assert.deepEqual(lfData.items[1].dataControl, [
              {
                "source": {
                  "sourceLinkId":"/dataControlExamples/itemWithExtraData"
                },
                "construction":"SIMPLE",
                "dataFormat": "value.data.STRENGTHS_AND_FORMS[0]",
                "onAttribute":"value"
              }
            ]);
            var qData = fhir.SDC.convertLFormsToQuestionnaire(lfData);
            assert.deepEqual(qData.item[1].extension, questionnaire.item[1].extension);
          });
        });

        describe('itemToQuestionnaireItem', function() {

          it('should convert code system', function() {
            var codeSystem = "LOINC";
            var fhirCodeSystem = LForms.Util.getCodeSystem(codeSystem);
            assert.equal(fhirCodeSystem, "http://loinc.org");
          });

          it('should convert an item with ST data type', function () {
            var item = {
              "questionCodeSystem":"LOINC",
              "questionCode": "54125-0",
              "questionCardinality": {"min": "1", "max": "*"},
              "question": "Name",
              "dataType": "ST",
              "linkId": "/54126-8/54125-0"
            };
            var item2 = Object.assign({_answerRequired: true}, item);
            var item3 = Object.assign({}, item2, {questionCardinality: {"min": "2", "max": "*"}});

            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(item), {});
            assert.equal(out.required, undefined);
            assert.equal(out.repeats, true);
            assert.equal(out.linkId, "/54126-8/54125-0");
            assert.equal(out.text, "Name");
            assert.equal(out.type, "string");
            assert.equal(out.code[0].system,"http://loinc.org");
            assert.equal(out.code[0].code,"54125-0");

            var out2 = fhir.SDC._processItem(LForms.Util.initializeCodes(item2), {});
            assert.equal(out2.required, true);
            assert.equal(out2.extension, undefined);

            var out3 = fhir.SDC._processItem(LForms.Util.initializeCodes(item3), {});
            assert.equal(out3.required, true);
            assert.equal(out3.extension[0].valueInteger, 2);
          });

          it('should convert an item with QTY data type to type quantity in FHIR Questionnaire', function () {
            var item = {
              "questionCodeSystem":"ad-hoc",
              "questionCode": "12345",
              "questionCardinality": {"min": "1", "max": "1"},
              "question": "fill in weight",
              "dataType": "QTY",
              "linkId": "/weight"
            };
            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(item), {});
            assert.equal(out.linkId, "/weight");
            assert.equal(out.type, "quantity");
            assert.equal(out.code[0].system, "ad-hoc");
            assert.equal(out.code[0].code,"12345");

          });

          it('should convert answer layout to choice orientation: columns="1" ==> "vertical"', function () {
            var item = {
              "questionCode": "q1c",
              "question": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 column",
              "dataType": "CNE",
              "answerCardinality": {
                "min": "0",
                "max": "*"
              },
              "displayControl": {
                "answerLayout": {
                  "type": "RADIO_CHECKBOX",
                  "columns": "1"
                }
              },
              "answers": [
                {
                  "code": "c1",
                  "text": "Answer X"
                },
                {
                  "code": "c2",
                  "text": "Answer Y"
                }]
              };
            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(item), {});
            assert.equal(out.type, "choice");
            assert.deepEqual(out.extension, [
              {
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                  "valueCodeableConcept": {
                      "coding": [
                          {
                              "system": "http://hl7.org/fhir/questionnaire-item-control",
                              "code": "check-box",
                              "display": "Check-box"
                          }
                      ],
                      "text": "Check-box"
                  }
              },
              {
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation",
                  "valueCode": "vertical"
              }
            ]);
          });

          it('should convert answer layout to choice orientation: columns="0" ==> "horizontal"', function () {
            var item = {
              "questionCode": "q1c",
              "question": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 row",
              "dataType": "CNE",
              "answerCardinality": {
                "min": "0",
                "max": "*"
              },
              "displayControl": {
                "answerLayout": {
                  "type": "RADIO_CHECKBOX",
                  "columns": "0"
                }
              },
              "answers": [
                {
                  "code": "c1",
                  "text": "Answer X"
                },
                {
                  "code": "c2",
                  "text": "Answer Y"
                }]
              };
            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(item), {});
            assert.equal(out.type, "choice");
            assert.deepEqual(out.extension, [
              {
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                  "valueCodeableConcept": {
                      "coding": [
                          {
                              "system": "http://hl7.org/fhir/questionnaire-item-control",
                              "code": "check-box",
                              "display": "Check-box"
                          }
                      ],
                      "text": "Check-box"
                  }
              },
              {
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation",
                  "valueCode": "horizontal"
              }
            ]);

          });

          it('should not convert answer layout to choice orientation, if columns is not "0" or "1"', function () {
            var item = {
              "questionCode": "q1c",
              "question": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --2 column",
              "dataType": "CNE",
              "answerCardinality": {
                "min": "0",
                "max": "*"
              },
              "displayControl": {
                "answerLayout": {
                  "type": "RADIO_CHECKBOX",
                  "columns": "2"
                }
              },
              "answers": [
                {
                  "code": "c1",
                  "text": "Answer X"
                },
                {
                  "code": "c2",
                  "text": "Answer Y"
                }]
              };
            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(item), {});
            assert.equal(out.type, "choice");
            assert.deepEqual(out.extension, [
              {
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                  "valueCodeableConcept": {
                      "coding": [
                          {
                              "system": "http://hl7.org/fhir/questionnaire-item-control",
                              "code": "check-box",
                              "display": "Check-box"
                          }
                      ],
                      "text": "Check-box"
                  }
              }
            ]);

          });

          it('should convert an item with CNE data type without answerCodeSystem', function () {
            var cneFixture = window[fhirVersion+'_'+'cneDataTypeFixture'];
            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(cneFixture.input), {});
            assert.deepEqual(out, cneFixture.output);
          });

          it('should convert an item with answerCodeSystem', function () {
            var alFixture = window[fhirVersion+'_'+'alWithCodeSystemFixture'];
            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(alFixture.input), {});
            assert.deepEqual(out, alFixture.output);
          });

          it('should convert an item with SECTION data type, with skip logic and sub items', function () {
            var item = {
              "questionCode": "54137-5X",
              "questionCardinality": {"min": "1", "max": "*"},
              "question": "Mock-up section: Shown when Height = 15",
              "dataType": "SECTION",
              // level 3
              "items": [
                { "questionCode": "54140-9X",
                  "questionCardinality": {"min": "1", "max": "1"},
                  "question": "Mock-up sub item #1",
                  "dataType": "INT",
                  "linkId": "/54126-8/54137-5X/54140-9X"
                },
                {
                  "questionCode": "54130-0X",
                  "questionCardinality": {"min": "1", "max": "1"},
                  "question": "Mock-up sub item #2",
                  "dataType": "REAL",
                  "linkId": "/54126-8/54137-5X/54130-0X"
                }
              ],
              "linkId": "/54126-8/54137-5X"
            };

            var out = fhir.SDC._processItem(LForms.Util.initializeCodes(item), {});
            assert.equal(out.required, undefined);
            assert.equal(out.repeats, true);
            assert.equal(out.linkId, "/54126-8/54137-5X");
            assert.equal(out.text, "Mock-up section: Shown when Height = 15");
            assert.equal(out.type, "group");

            assert.equal(out.item.length, 2);
            assert.equal(out.item[0].required, undefined);
            assert.equal(out.item[0].repeats, undefined);
            assert.equal(out.item[0].linkId, "/54126-8/54137-5X/54140-9X");
            assert.equal(out.item[0].text,"Mock-up sub item #1");
            assert.equal(out.item[0].type,"integer");
            assert.equal(out.item[1].required, undefined);
            assert.equal(out.item[1].repeats, undefined);
            assert.equal(out.item[1].linkId, "/54126-8/54137-5X/54130-0X");
            assert.equal(out.item[1].text,"Mock-up sub item #2");
            assert.equal(out.item[1].type,"decimal");

          });

          it('should convert FHTData to Questionnaire', function (done) {

            $.get('/base/app/data/FHTData.json', function(FHTData) {
              var fhirQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, LForms.Util.deepCopy(FHTData));
              assert.equal(fhirQ.item[0].item[2].item.length, 1);
              assert.equal(fhirQ.item[0].item[2].item[0].text,
                  "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo3.nlm.nih.gov'>coding instruction</a>");
              assert.equal(fhirQ.item[0].item[2].item[0].extension[0].url, "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl");
              assert.equal(fhirQ.item[0].item[2].item[0].extension[0].valueCodeableConcept.coding[0].code, "help");
              assert.equal(fhirQ.item[0].item[2].item[0].extension[0].valueCodeableConcept.coding[0].system, "http://hl7.org/fhir/questionnaire-item-control");
              if (fhirVersion === "R4") {
                assert.equal(fhirQ.item[0].item[2].item[0]._text.extension[0].url,
                    "http://hl7.org/fhir/StructureDefinition/rendering-xhtml")
                assert.equal(fhirQ.item[0].item[2].item[0]._text.extension[0].valueString,
                    "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo3.nlm.nih.gov'>coding instruction</a>")
              }
              done();
            });
          });
        });

        describe('Questionnaire to lforms item conversion', function () {
          it('should convert defaultAnswers',function () {
            var fixtures = window['defaultAnswers'];
            for (var i = 0; i < fixtures.length; i++) {
              var fixture = LForms.Util.deepCopy(fixtures[i]);
              // STU3 does not support multiple default answers.
              if (!Array.isArray(fixture.defaultAnswer) || fhirVersion === 'R4') {
                var qItem = {};

                qItem.type = LForms.FHIR[fhirVersion].SDC._getFhirDataType(fixture);
                // Default processing depends on the answer repeat.
                var lfItem = {};
                if (fixture.answerCardinality && fixture.answerCardinality.max === "*") {
                  fixture._multipleAnswers = lfItem._multipleAnswers = true;
                  qItem.extension = [];
                  qItem.extension.push({
                    "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-answerRepeats",
                    "valueBoolean": true
                  });
                }
                LForms.FHIR[fhirVersion].SDC._handleChoiceField(qItem,fixture);
                LForms.FHIR[fhirVersion].SDC._handleInitialValues(qItem,fixture);
                lfItem.answerCardinality = fixture.answerCardinality;
                LForms.FHIR[fhirVersion].SDC._processDataType(lfItem,qItem);
                lfItem.answers = fixture.answers;
                LForms.FHIR[fhirVersion].SDC._processDefaultAnswer(lfItem,qItem);
                assert.deepEqual(lfItem.defaultAnswer,fixture.defaultAnswer);

              }
            }
          });

          it('should convert questionnaire.code and item.code with code system',function () {


            var formCodes = [{
              system: 'http://form-example1.com',
              version: '1.0',
              code: 'formcode1',
              display: 'Form Code 1',
              userSelected: true
            }, {
              system: 'http://form-example2.com',
              version: '2.0',
              code: 'formcode2',
              display: 'Form Code 2',
              userSelected: false
            }, {
              system: 'http://form-example3.com',
              version: '3.0',
              code: 'formcode3',
              display: 'Form Code 3',
              userSelected: false
            }];

            var itemCodes = [{
              system: 'http://example1.com',
              version: '1.0',
              code: 'code1',
              display: 'Code 1',
              userSelected: true
            }, {
              system: 'http://example2.com',
              version: '2.0',
              code: 'code2',
              display: 'Code 2',
              userSelected: false
            }, {
              system: 'http://example3.com',
              version: '3.0',
              code: 'code3',
              display: 'Code 3',
              userSelected: false
            }];

            var fhirData = {
              title: 'test title',
              name: 'test name',
              version: '0.0.1',
              resourceType: 'Questionnaire',
              "meta": {
                "profile": [
                  "http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire"
                ]
              },
              status: 'draft',
              code: formCodes,
              item: [{
                required: true,
                repeats: false,
                extension: [{
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs",
                  "valueInteger": 2
                }],
                text: 'FHIR Item with multiple codes',
                linkId: '12345',
                type: 'string',
                code: itemCodes
              }]
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(fhirData);
            assert.equal(lfData.code, 'formcode1');
            assert.equal(lfData.codeSystem, 'http://form-example1.com');
            assert.equal(lfData.name, 'test title');
            assert.equal(lfData.version, '0.0.1');
            assert.equal(lfData.codeList, formCodes);

            assert.equal(lfData.items[0].questionCode, 'code1');
            assert.equal(lfData.items[0].questionCodeSystem, 'http://example1.com');
            assert.equal(lfData.items[0].codeList, itemCodes);

            var convertedFhirData = fhir.SDC.convertLFormsToQuestionnaire(lfData);

            assert.deepEqual(fhirData.code, convertedFhirData.code);
            assert.deepEqual(fhirData.item[0].extension, convertedFhirData.item[0].extension);
            //assert.deepEqual(fhirData, convertedFhirData);

          });
          it('should convert questionnaire.code and item.code, without code system',function () {


            var formCodes = [{
              version: '1.0',
              code: 'formcode1',
              display: 'Form Code 1',
              userSelected: true
            }, {
              version: '2.0',
              code: 'formcode2',
              display: 'Form Code 2',
              userSelected: false
            }, {
              system: 'http://form-example3.com',
              version: '3.0',
              code: 'formcode3',
              display: 'Form Code 3',
              userSelected: false
            }];

            var itemCodes = [{
              version: '1.0',
              code: 'code1',
              display: 'Code 1',
              userSelected: true
            }, {
              version: '2.0',
              code: 'code2',
              display: 'Code 2',
              userSelected: false
            }, {
              system: 'http://example3.com',
              version: '3.0',
              code: 'code3',
              display: 'Code 3',
              userSelected: false
            }];

            var fhirData = {
              title: 'test title',
              name: 'test name',
              version: '0.0.1',
              resourceType: 'Questionnaire',
              "meta": {
                "profile": [
                  "http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire"
                ]
              },
              status: 'draft',
              code: formCodes,
              item: [{
                required: true,
                extension: [{
                  "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs",
                  "valueInteger": 2
                }],
                text: 'FHIR Item with multiple codes',
                linkId: '12345',
                type: 'string',
                code: itemCodes
              }]
            };
            var lfData = fhir.SDC.convertQuestionnaireToLForms(fhirData);
            assert.equal(lfData.code, 'formcode1');
            assert.equal(lfData.codeSystem, undefined);
            assert.equal(lfData.name, 'test title');
            assert.equal(lfData.version, '0.0.1');
            assert.equal(lfData.codeList, formCodes);

            assert.equal(lfData.items[0].questionCode, 'code1');
            assert.equal(lfData.items[0].questionCodeSystem, undefined);
            assert.equal(lfData.items[0].codeList, itemCodes);

            var convertedFhirData = fhir.SDC.convertLFormsToQuestionnaire(lfData);

            // console.log( JSON.stringify(convertedFhirData))
            // console.log( JSON.stringify(fhirData))
            assert.deepEqual(fhirData, convertedFhirData);

          });

          it('should convert prefix of an item', function () {
            var fhirData = {
              title: 'test title',
              name: 'test name',
              version: '0.0.1',
              resourceType: 'Questionnaire',
              "meta": {
                "profile": [
                  "http://hl7.org/fhir/4.0/StructureDefinition/Questionnaire"
                ]
              },
              status: 'draft',
              item: [{
                text: 'item a',
                linkId: '1',
                type: 'string',
                prefix: "A:"
              },
                {
                  text: 'item b',
                  linkId: '2',
                  type: 'string'
                }]
            };
            var out = fhir.SDC.convertQuestionnaireToLForms(fhirData);
            assert.equal(out.items[0].prefix, "A:");
            assert.equal(out.items[1].prefix, undefined);
          });

          it('should convert choice orientation to answer layout:: "vertical" ==> columns="1"', function () {
            var qItem = {
              "type": "choice",
              "code": [
                  {
                      "code": "q1c",
                      "display": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 column"
                  }
              ],
              "extension": [
                  {
                      "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                      "valueCodeableConcept": {
                          "coding": [
                              {
                                  "system": "http://hl7.org/fhir/questionnaire-item-control",
                                  "code": "check-box",
                                  "display": "Check-box"
                              }
                          ],
                          "text": "Check-box"
                      }
                  },
                  {
                      "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation",
                      "valueCode": "vertical"
                  }
              ],
              "required": false,
              "linkId": "/q1c",
              "text": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 column",
              "answerOption": [
                {
                    "valueCoding": {
                        "code": "c1",
                        "display": "Answer X"
                    }
                },
                {
                    "valueCoding": {
                        "code": "c2",
                        "display": "Answer Y"
                    }
                }
              ]
            };
            var itemDisplayControl =  {
              "answerLayout": {
                "type": "RADIO_CHECKBOX",
                "columns": "1"
              }
            };
            var targetItem = {};
            fhir.SDC._processDisplayControl(targetItem, qItem);
            assert.deepEqual(targetItem.displayControl, itemDisplayControl);
          });

          it('should convert choice orientation to answer layout:: "horizontal" ==> columns="0"', function () {
            var qItem = {
              "type": "choice",
              "code": [
                  {
                      "code": "q1c",
                      "display": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 column"
                  }
              ],
              "extension": [
                  {
                      "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl",
                      "valueCodeableConcept": {
                          "coding": [
                              {
                                  "system": "http://hl7.org/fhir/questionnaire-item-control",
                                  "code": "check-box",
                                  "display": "Check-box"
                              }
                          ],
                          "text": "Check-box"
                      }
                  },
                  {
                      "url": "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation",
                      "valueCode": "horizontal"
                  }
              ],
              "required": false,
              "linkId": "/q1c",
              "text": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 column",
              "answerOption": [
                {
                    "valueCoding": {
                        "code": "c1",
                        "display": "Answer X"
                    }
                },
                {
                    "valueCoding": {
                        "code": "c2",
                        "display": "Answer Y"
                    }
                }
              ]
            };
            var itemDisplayControl =  {
              "answerLayout": {
                "type": "RADIO_CHECKBOX",
                "columns": "0"
              }
            };
            var targetItem = {};
            fhir.SDC._processDisplayControl(targetItem, qItem);
            assert.deepEqual(targetItem.displayControl, itemDisplayControl);
          });


          it('should convert FHTData to lforms', function (done) {
            $.get('/base/app/data/FHTData.json', function (FHTData) {
              var fhtClone = LForms.Util.deepCopy(FHTData);
              //createLinkId(fhtClone.items);
              var fhirQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, fhtClone);
              var convertedLfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);
              convertedLfData = new LForms.LFormsData(convertedLfData);
              var reConvertedFhirQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, convertedLfData);
              // reConvertedFhirQ has an "extension": [], when it is converted form a questionnaire.
              assert.equal(reConvertedFhirQ.extension.length, 0)
              delete reConvertedFhirQ.extension;
              assert.deepEqual(reConvertedFhirQ, fhirQ);
              assert.equal(convertedLfData.name, 'USSG-FHT, (with mock-up items for skip logic demo)');
              assert.equal(convertedLfData.code, '54127-6N');
              assert.equal(convertedLfData.codeSystem, 'LOINC');
              assert.equal(convertedLfData.codeList.length, 1);
              assert.equal(convertedLfData.codeList[0].code, '54127-6N');
              assert.equal(convertedLfData.codeList[0].system, 'http://loinc.org');
              assert.equal(convertedLfData.codeList[0].display, 'USSG-FHT, (with mock-up items for skip logic demo)');
              assert.equal(convertedLfData.items.length, 2);
              assert.equal(convertedLfData.items[0].question, "Your health information");
              assert.equal(convertedLfData.items[0].questionCode, "54126-8");
              assert.equal(convertedLfData.items[0].questionCodeSystem, undefined);
              assert.equal(convertedLfData.items[0].codeList.length, 1);
              assert.equal(convertedLfData.items[0].codeList[0].display, "Your health information");
              assert.equal(convertedLfData.items[0].codeList[0].code, "54126-8");
              assert.equal(convertedLfData.items[0].codeList[0].system, undefined);
              assert.equal(convertedLfData.items[0].dataType, 'SECTION');
              assert.equal(convertedLfData.items[0].header, true);
              assert.equal(convertedLfData.items[0].items.length, 13);

              assert.equal(convertedLfData.items[0].items[0].question, "Name");
              assert.equal(convertedLfData.items[0].items[0].questionCode, "54125-0");
              assert.equal(convertedLfData.items[0].items[0].questionCodeSystem, undefined);
              assert.equal(convertedLfData.items[0].items[0].questionCardinality.min, "1");
              assert.equal(convertedLfData.items[0].items[0].questionCardinality.max, "*");
              assert.equal(convertedLfData.items[0].items[0].questionCodeSystem, undefined);
              assert.equal(convertedLfData.items[0].items[0].dataType, 'TX');

              assert.equal(convertedLfData.items[0].items[1].answers.length, 3);
              assert.equal(convertedLfData.items[0].items[1].answers[0].text, "Male");
              assert.equal(convertedLfData.items[0].items[1].answers[0].code, "LA2-8");
              assert.equal(convertedLfData.items[0].items[1].answers[2].text, "Other");
              assert.equal(convertedLfData.items[0].items[1].answers[2].code, "LA46-8");
              // TODO - other not supported
              //assert.equal(convertedLfData.items[0].items[1].answers[2].other, "Please Specify");
              assert.equal(convertedLfData.items[0].items[1].dataType, "CNE");

              // TODO - skip logic triggers for min/max inclusive/exclusive are not supported.
              // Only skip logic 'value' works in STU3
              assert.deepEqual(convertedLfData.items[0].items[4].skipLogic, fhtClone.items[0].items[4].skipLogic);
              assert.deepEqual(convertedLfData.items[0].items[12].items[2].skipLogic, fhtClone.items[0].items[12].items[2].skipLogic);
              if(fhirVersion !== 'STU3') {
                assert.deepEqual(convertedLfData.items[0].items[6].items[1].skipLogic, fhtClone.items[0].items[6].items[1].skipLogic);
                assert.deepEqual(convertedLfData.items[0].items[6].items[2].skipLogic.conditions[0].trigger.minExclusive,
                    fhtClone.items[0].items[6].items[2].skipLogic.conditions[0].trigger.minExclusive);
                assert.deepEqual(convertedLfData.items[0].items[6].items[2].skipLogic.conditions[1].trigger.maxInclusive,
                    fhtClone.items[0].items[6].items[2].skipLogic.conditions[0].trigger.maxInclusive);

                assert.deepEqual(convertedLfData.items[0].items[5].items[0].skipLogic, fhtClone.items[0].items[5].items[0].skipLogic);
                assert.deepEqual(convertedLfData.items[0].items[5].items[1].skipLogic, fhtClone.items[0].items[5].items[1].skipLogic);
              }

              assert.equal(convertedLfData.items[0].items[2].codingInstructions,
                  "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo3.nlm.nih.gov'>coding instruction</a>");
              assert.equal(convertedLfData.items[0].items[2].codingInstructionsFormat, "html");
              assert.equal(convertedLfData.items[0].items[2].codingInstructionsPlain,
                  "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo3.nlm.nih.gov'>coding instruction</a>");

              assert.equal(convertedLfData.items[0].items[6].answerCardinality.min, "1");
              assert.equal(convertedLfData.items[0].items[6].codingInstructions, "Try to type 10, 12, 15, 16, 25");
              assert.equal(convertedLfData.items[0].items[6].codingInstructionsFormat, "text");
              assert.equal(convertedLfData.items[0].items[6].codingInstructionsPlain, "Try to type 10, 12, 15, 16, 25");

              // TODO units[x].code is not supported.
              assert.equal(convertedLfData.items[0].items[6].units.length, fhtClone.items[0].items[6].units.length);
              assert.equal(convertedLfData.items[0].items[6].units[0].default, fhtClone.items[0].items[6].units[0].default);
              assert.equal(convertedLfData.items[0].items[6].units[0].name, fhtClone.items[0].items[6].units[0].name);
              assert.equal(convertedLfData.items[0].items[6].units[1].name, fhtClone.items[0].items[6].units[1].name);

              $.get('/base/app/data/displayControlsDemo.json', function(displayControlsDemo) {
                // Display control
                fhirQ = fhir.SDC.convertLFormsToQuestionnaire(new LForms.LFormsData(LForms.Util.deepCopy(displayControlsDemo)));
                convertedLfData = fhir.SDC.convertQuestionnaireToLForms(fhirQ);
                // TODO -
                // unsupported fields: viewMode, css, colCSS, listColHeaders, answerLayout.columns
                // supported fields: questionLayout, answerLayout.type
                assert.equal(convertedLfData.items[1].displayControl.answerLayout.type, "RADIO_CHECKBOX");
                // Vertical layout is not converted as it is default.
                assert.equal(convertedLfData.items[5].displayControl, undefined);
                assert.equal(convertedLfData.items[6].displayControl.questionLayout, "horizontal");
                done();
              });
            });
          });

          describe('Units', function () {
            var lforms = null;
            beforeEach(function(){
              lforms = LForms.Util.deepCopy(window['units_example']);
            });

            it('should convert units to unitOption extension', function () {
              // Export
              var fhirQ = LForms.FHIR[fhirVersion].SDC.convertLFormsToQuestionnaire(lforms);
              // There is no default answer and default unit.
              if(fhirVersion === 'STU3') {
                assert.equal(fhirQ.item[0].initialQuantity, undefined);
              }
              else {
                assert.equal(fhirQ.item[0].initial, undefined);
              }
              //assert.equal(fhirQ.item[0].type, 'decimal');
              // Add default answer to convert to quantity type - no default unit set.
              lforms.items[0].defaultAnswer = 1.0;
              fhirQ = LForms.FHIR[fhirVersion].SDC.convertLFormsToQuestionnaire(lforms);
              var qty = null;
              if(fhirVersion === 'STU3') {
                qty = fhirQ.item[0].initialQuantity;
              }
              else {
                qty = fhirQ.item[0].initial[0].valueQuantity;
              }
              assert.equal(qty.value, 1.0);
              assert.equal(qty.unit, lforms.items[0].units[0].name);
              assert.equal(qty.code, lforms.items[0].units[0].code);
              assert.equal(qty.system, lforms.items[0].units[0].system);
              assert.equal(fhirQ.item[0].type, 'quantity');

              // With default unit and default answer.
              lforms.items[0].units[0].default = true;
              fhirQ = LForms.FHIR[fhirVersion].SDC.convertLFormsToQuestionnaire(lforms);
              var qty = null;
              if(fhirVersion === 'STU3') {
                qty = fhirQ.item[0].initialQuantity;
              }
              else {
                qty = fhirQ.item[0].initial[0].valueQuantity;
              }
              assert.equal(qty.value, 1.0);
              assert.equal(qty.unit, lforms.items[0].units[0].name);
              assert.equal(qty.code, lforms.items[0].units[0].code);
              assert.equal(qty.system, lforms.items[0].units[0].system);
              assert.equal(fhirQ.item[0].type, 'quantity');

              // Default unit set without default answer.
              delete lforms.items[0].defaultAnswer;
              lforms.items[0].units[0].default = true;
              fhirQ = LForms.FHIR[fhirVersion].SDC.convertLFormsToQuestionnaire(lforms);
              var qty = null;
              if(fhirVersion === 'STU3') {
                qty = fhirQ.item[0].initialQuantity;
              }
              else {
                qty = fhirQ.item[0].initial[0].valueQuantity;
              }
              assert.equal(qty.value, undefined);
              assert.equal(qty.unit, lforms.items[0].units[0].name);
              assert.equal(qty.code, lforms.items[0].units[0].code);
              assert.equal(qty.system, lforms.items[0].units[0].system);
              assert.equal(fhirQ.item[0].type, 'quantity');

              var unitOptions = LForms.Util.findObjectInArray(fhirQ.item[0].extension, 'url', 'http://hl7.org/fhir/StructureDefinition/questionnaire-unitOption', 0, true);
              assert.equal(unitOptions.length, lforms.items[0].units.length);
              var i = 0;
              for(i = 0; i < unitOptions.length; i++) {
                assert.equal(unitOptions[i].valueCoding.code, lforms.items[0].units[i].code);
                assert.equal(unitOptions[i].valueCoding.display, lforms.items[0].units[i].name);
                assert.equal(unitOptions[i].valueCoding.system, lforms.items[0].units[i].system);
              }

              // Import
              var convertedLfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);

              assert.equal(convertedLfData.items[0].dataType, 'QTY');
              assert.equal(convertedLfData.items[0].units.length, lforms.items[0].units.length);
              for(i = 0; i < convertedLfData.items[0].units.length; i++) {
                assert.equal(convertedLfData.items[0].units[i].name, lforms.items[0].units[i].name);
                assert.equal(convertedLfData.items[0].units[i].code, lforms.items[0].units[i].code);
                assert.equal(convertedLfData.items[0].units[i].system, lforms.items[0].units[i].system);
              }
              assert.isOk(convertedLfData.items[0].units[0].default);
            });

            it('should convert default unit to initial quantity unit', function () {
              lforms.items[0].units[2].default = true;
              // Export
              var fhirQ = LForms.FHIR[fhirVersion].SDC.convertLFormsToQuestionnaire(lforms);
              var qty = null;
              if(fhirVersion === 'STU3') {
                qty = fhirQ.item[0].initialQuantity;
              }
              else {
                qty = fhirQ.item[0].initial[0].valueQuantity;
              }

              assert.equal(qty.unit, lforms.items[0].units[2].name);
              assert.equal(qty.code, lforms.items[0].units[2].code);
              assert.equal(qty.system, lforms.items[0].units[2].system);

              // Import
              var convertedLfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);

              assert.equal(convertedLfData.items[0].units.length, lforms.items[0].units.length);
              assert.isOk(convertedLfData.items[0].units[2].default);
            });

            it('should convert a single unit for type REAL to questionnaire unit extention', function() {
              lforms.items[0].units.splice(1);
              lforms.items[0].dataType = 'REAL';
              // Export
              var fhirQ = LForms.FHIR[fhirVersion].SDC.convertLFormsToQuestionnaire(lforms);

              var unitOption = LForms.Util.findObjectInArray(fhirQ.item[0].extension, 'url', LForms.FHIR[fhirVersion].SDC.fhirExtUrlUnitOption);

              assert.isNotOk(unitOption);
              if(fhirVersion === 'STU3') assert.isUndefined(fhirQ.item[0].initialQuantity);
              if(fhirVersion === 'R4') assert.isUndefined(fhirQ.item[0].initial);

              var qUnit = LForms.Util.findObjectInArray(fhirQ.item[0].extension, 'url', LForms.FHIR[fhirVersion].SDC.fhirExtUrlUnit);

              assert.equal(qUnit.valueCoding.code, lforms.items[0].units[0].code);
              assert.equal(qUnit.valueCoding.display, lforms.items[0].units[0].name);
              assert.equal(qUnit.valueCoding.system, lforms.items[0].units[0].system);

              // Import
              var convertedLfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);

              assert.equal(convertedLfData.items[0].dataType, lforms.items[0].dataType);
              assert.equal(convertedLfData.items[0].units.length, 1);
              assert.equal(convertedLfData.items[0].units[0].name, lforms.items[0].units[0].name);
              assert.equal(convertedLfData.items[0].units[0].code, lforms.items[0].units[0].code);
              assert.equal(convertedLfData.items[0].units[0].system, lforms.items[0].units[0].system);
              assert.isOk(convertedLfData.items[0].units[0].default);
            });
          });

          it('should convert FHIR Questionnaire quantity item to LForms QTY item', function () {
            var fhirData = {
              item: [{
                text: 'fill in weight',
                linkId: '12345',
                type: 'quantity'
              }]
            };
            var lfItem = fhir.SDC._processQuestionnaireItem(fhirData.item[0], fhirData);
            assert.equal(lfItem.dataType, 'QTY');
          });

          it('should convert FHIR Questionnaire initial quantity value to LForms QTY item value', function () {
            var fhirData = {
              item: [{
                text: 'fill in weight',
                linkId: '12345',
                type: 'quantity'
              }]
            };
            if(fhirVersion === 'R4') {
              fhirData.item[0].initial = [{valueQuantity: {value: 222}}];
            }
            else { // STU3
              fhirData.item[0].initialQuantity = {value: 222};
            }

            var lfItem = fhir.SDC._processQuestionnaireItem(fhirData.item[0], fhirData);
            assert.equal(lfItem.dataType, 'QTY');
            assert.equal(lfItem.defaultAnswer, 222);
          });

          it('should convert/merge FHIR valueQuantity to LForms QTY item value', function () {
            var lfItem = {
              "questionCodeSystem":"ad-hoc",
              "questionCode": "12345",
              "linkId": "12345",
              "question": "fill in weight",
              "dataType": "QTY"
            };
            var fhirAnswer = [{
              valueQuantity: { value: 128, code: "kg"}
            }];
            fhir.SDC._mergeQR._setupItemValueAndUnit('12345', fhirAnswer, lfItem);
            assert.equal(lfItem.value, 128);
            assert.equal(lfItem.unit.name, "kg");
          });

          it('should convert restrictions', function (done) {
            $.get('/base/app/data/validationTestForm.json', function(validationTestForm) {
              var fhirQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, LForms.Util.deepCopy(validationTestForm));
              var convertedLfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);

              assert.equal(convertedLfData.items.length, 34);
              // TODO - min/max exclusive is not supported
              assert.equal(convertedLfData.items[12].restrictions.minInclusive, 5);
              assert.equal(convertedLfData.items[14].restrictions.maxInclusive, 10);
              assert.equal(convertedLfData.items[21].restrictions.minLength, 5);
              assert.equal(convertedLfData.items[22].restrictions.maxLength, 10);
              done();
            });

          });

          it('should convert only valid restrictions', function () {
            var lforms = LForms.Util.deepCopy(window['restrictions_lforms']);
            var expected_fhirQ = LForms.Util.deepCopy(window['restrictions_fhirQ'])
            var fhirQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, lforms);
            assert.deepEqual(fhirQ.item[0].extension, expected_fhirQ.item[0].extension);
            assert.deepEqual(fhirQ.item[1].extension, expected_fhirQ.item[1].extension);
            assert.equal(fhirQ.item[1].maxLength, expected_fhirQ.item[1].maxLength);
          });

          it('should convert externally defined', function (done) {
            $.get('/base/app/data/validationTestForm.json', function(validationTestForm) {
              var optionsRes = validationTestForm.items[23].externallyDefined;
              // Display control
              var fhirQ = fhir.SDC.convertLFormsToQuestionnaire(new LForms.LFormsData(LForms.Util.deepCopy(validationTestForm)));
              var convertedLfData = fhir.SDC.convertQuestionnaireToLForms(fhirQ);

              assert.equal(convertedLfData.items.length, 34);
              assert.equal(convertedLfData.items[23].externallyDefined, optionsRes);
              done();
            });
          });
        });



        // export
        describe('LForms data to Questionnaire conversion', function() {

          it('should convert to SDC Questionnaire with extensions', function(done) {
            $.get('/base/app/data/FHTData.json', function(FHTData) {
              var fhirQ = fhir.SDC.convertLFormsToQuestionnaire(new LForms.LFormsData(LForms.Util.deepCopy(FHTData)));

              assert.equal(fhirQ.meta.profile[0], fhir.SDC.QProfile);
              assert.equal(fhirQ.item[0].item[1].extension[0].url, "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl");
              done();
            });
          });

          it('should convert to standard Questionnaire without any extensions', function(done) {
            $.get('/base/app/data/FHTData.json', function(FHTData) {
              var fhirQ = fhir.SDC.convertLFormsToQuestionnaire(new LForms.LFormsData(LForms.Util.deepCopy(FHTData)), true);

              assert.equal(fhirQ.meta.profile[0], fhir.SDC.stdQProfile);
              assert.equal(fhirQ.item[0].item[1].extension, undefined);

              assert.equal(fhirQ.toString().match(/extension/), undefined);
              done();
            });
          });

          it('should convert a prefix of an item', function () {
            var item = {
              "questionCode": "12345",
              "prefix": "A:",
              "question": "fill in weight",
              "dataType": "ST"
            };
            var out = fhir.SDC._processItem(item, {});
            assert.equal(out.prefix, "A:");
            assert.equal(out.text, "fill in weight");
          });

          if(fhirVersion === 'STU3') {
            describe('argonaut samples', function () {
              it('should parse housing', function (done) {
                var file = 'test/data/STU3/argonaut-examples/housing.json';
                $.get(file, function(json) {
                  var lfData = LForms.Util.convertFHIRQuestionnaireToLForms(json, fhirVersion);
                  var convertedQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, lfData);
                  assert.equal(convertedQ.item[0].item[1].option.length, json.item[0].item[1].option.length);
                  assert.equal(convertedQ.item[0].item[2].option.length, json.item[0].item[2].option.length);

                  // valueString is changed to valueCoding.display
                  assert.equal(convertedQ.item[0].item[1].option[0].valueCoding.display, json.item[0].item[1].option[0].valueString);
                  done()
                }).fail(function (err) {
                  done(err);
                });
              });

              it('should parse sampler', function (done) {
                var file = 'test/data/STU3/argonaut-examples/sampler.json';
                $.get(file, function(json) {
                  var lfData = LForms.Util.convertFHIRQuestionnaireToLForms(json, fhirVersion);
                  var convertedQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, lfData);

                  assert.equal(convertedQ.item[11].item[0].option.length, json.item[11].item[0].option.length);
                  // The score is changed from argonaut extension to FHIR extension.
                  assert.equal(convertedQ.item[11].item[0].option[0].extension[0].url,
                      'http://hl7.org/fhir/StructureDefinition/questionnaire-ordinalValue');
                  assert.equal(convertedQ.item[11].item[0].option[0].extension[0].valueDecimal,
                      json.item[11].item[0].option[0].extension[0].valueDecimal);
                }).done(function () {
                  done();
                }).fail(function (err) {
                  done(err);
                });
              });
            });
          }
        });

        if (fhirVersion === 'R4') {
          describe('Conversion between R4 SDC Questionnaire and LForms', function () {
            it('should convert score value between R4 SDC Questionnaire and LForm format', function (done) {

              var file = 'test/data/R4/phq9.json';
              $.get(file, function (json) {
                try {
                  var lfData = LForms.Util.convertFHIRQuestionnaireToLForms(json, fhirVersion);
                  assert.equal(lfData.items[0].answers.length, json.item[0].answerOption.length);
                  assert.equal(lfData.items[0].answers[0].score, 0);
                  assert.equal(lfData.items[0].answers[0].text, "Not at all");
                  assert.equal(lfData.items[0].answers[0].system, "http://loinc.org");
                  assert.equal(lfData.items[0].answers[1].score, "1");
                  assert.equal(lfData.items[0].answers[1].text, "Several days");
                  assert.equal(lfData.items[0].answers[1].system, "http://loinc.org");

                  // convert it back to SDC Questionnaire
                  var newQ = LForms.Util.getFormFHIRData('Questionnaire', fhirVersion, lfData);

                  var answerOptionExt = LForms.Util.findObjectInArray(newQ.item[0].answerOption[0].extension, 'url', 'http://hl7.org/fhir/StructureDefinition/ordinalValue', 0, true);
                  assert.equal(answerOptionExt.length, 1)
                  answerOptionExt = LForms.Util.findObjectInArray(newQ.item[0].answerOption[1].extension, 'url', 'http://hl7.org/fhir/StructureDefinition/ordinalValue', 0, true);
                  assert.equal(answerOptionExt[0].valueDecimal, 1)
                  assert.equal(answerOptionExt[0].url, 'http://hl7.org/fhir/StructureDefinition/ordinalValue')
                  assert.equal(newQ.item[0].answerOption[1].valueCoding.system, "http://loinc.org")
                  assert.equal(newQ.item[0].answerOption[1].valueCoding.code, "LA6569-3")
                  assert.equal(newQ.item[0].answerOption[1].valueCoding.display, "Several days")
                }
                catch(err) {
                  done(err)
                }
              }).done(function () {
                done();
              }).fail(function (err) {
                console.log(': Unable to load ' + file);
                done(err);
              });
            });

            it('should convert coding instructions between R4 SDC Questionnaire and LForm format', function (done) {

              var file = 'test/data/R4/ussg-fhp.json';
              $.get(file, function (json) {
                try {
                  var lfData = LForms.Util.convertFHIRQuestionnaireToLForms(json, fhirVersion);

                  // name
                  assert.equal(lfData.items[0].items[0].codingInstructions, "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>An html instruction on Name</a>");
                  assert.equal(lfData.items[0].items[0].codingInstructionsFormat, "html");
                  assert.equal(lfData.items[0].items[0].codingInstructionsPlain, "A plain text instruction on Name");
                  // gender
                  assert.equal(lfData.items[0].items[1].codingInstructions, "<code>Text</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>An plain text instruction on Gender. HTML should be escaped.</a>");
                  assert.equal(lfData.items[0].items[1].codingInstructionsFormat, "text");
                  assert.equal(lfData.items[0].items[1].codingInstructionsPlain, "<code>Text</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>An plain text instruction on Gender. HTML should be escaped.</a>");

                  var qData = LForms.Util.getFormFHIRData("Questionnaire", "R4", lfData);
                  // name
                  assert.equal(qData.item[0].item[0].item[0].text, "A plain text instruction on Name");
                  assert.equal(qData.item[0].item[0].item[0].type, "display");
                  assert.equal(qData.item[0].item[0].item[0].extension[0].url, "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl");
                  assert.equal(qData.item[0].item[0].item[0]._text.extension[0].url, "http://hl7.org/fhir/StructureDefinition/rendering-xhtml");
                  assert.equal(qData.item[0].item[0].item[0]._text.extension[0].valueString, "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>An html instruction on Name</a>");
                  // gender
                  assert.equal(qData.item[0].item[1].item[0].text, "<code>Text</code> instructions, with a <button>button</button> and a link <a href='http://google.com'>An plain text instruction on Gender. HTML should be escaped.</a>");
                  assert.equal(qData.item[0].item[1].item[0].type, "display");
                  assert.equal(qData.item[0].item[1].item[0].extension[0].url, "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl");
                  assert.equal(qData.item[0].item[1].item[0]._text, undefined);
                }
                catch(err) {
                  done(err)
                }
              }).done(function () {
                done();
              }).fail(function (err) {
                console.log(': Unable to load ' + file);
                done(err);
              });
            });

          });
        }

        describe('LForms data to QuestionnaireResponse conversion', function() {
          describe('with extensions', function() {
            it('should convert to SDC Questionnaire with extensions', function(done) {
              $.get('/base/app/data/FHTData.json', function(FHTData) {
                var fhirQR = LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion, LForms.Util.deepCopy(FHTData));
                assert.equal(fhirQR.meta.profile[0], fhir.SDC.QRProfile);
                done();
              });
            });

            it('should set the lformsVersion tag', function (done){
              $.get('/base/app/data/FHTData.json', function(FHTData) {
                var fhirQR = LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion, LForms.Util.deepCopy(FHTData));
                var version = fhirQR.meta.tag[0].code;
                assert.equal(typeof version, 'string');
                assert.match(version, /^lformsVersion: /);
                done();
              });
            });
          });

          it('should convert to standard QuestionnaireResponse without any extensions', function(done) {

            $.get('/base/app/data/FHTData.json', function(FHTData) {
              var fhirQR = LForms.Util.getFormFHIRData(
                  'QuestionnaireResponse', fhirVersion, LForms.Util.deepCopy(FHTData),
                  {noExtensions: true});
              assert.equal(fhirQR.meta.profile[0], fhir.SDC.stdQRProfile);
              assert.equal(fhirQR.toString().match(/extension/), undefined);
              done();
            });
          });

          it('should convert an item of QTY to valueQuantity in FHIR QuestionnaireResponse', function () {
            var item = {
              "questionCodeSystem":"ad-hoc",
              "questionCode": "12345",
              "questionCardinality": {"min": "1", "max": "1"},
              "question": "fill in weight",
              "dataType": "QTY",
              "linkId": "/weight",
              "value": 128
            };
            var out = fhir.SDC._processResponseItem(item);
            assert.equal(out.linkId, "/weight");
            assert.equal(out.answer[0].valueQuantity.value, 128);
          });

          it('should convert an item of QTY with 0 in the value to valueQuantity in FHIR QuestionnaireResponse', function () {
            var item = {
              "questionCodeSystem":"ad-hoc",
              "questionCode": "12345",
              "questionCardinality": {"min": "1", "max": "1"},
              "question": "fill in weight",
              "dataType": "QTY",
              "linkId": "/weight",
              "value": 0
            };
            var out = fhir.SDC._processResponseItem(item);
            assert.equal(out.linkId, "/weight");
            assert.equal(out.answer[0].valueQuantity.value, 0);
          });

          it('should convert an item of INT with 0 in the value to valueInteger in FHIR QuestionnaireResponse', function () {
            var item = {
              "questionCodeSystem":"ad-hoc",
              "questionCode": "12345",
              "questionCardinality": {"min": "1", "max": "1"},
              "question": "an integer",
              "dataType": "INT",
              "linkId": "/int",
              "value": 0
            };
            var out = fhir.SDC._processResponseItem(item);
            assert.equal(out.answer[0].valueInteger, 0);
          });

          it('should convert an item of REAL with 0 in the value to valueDecimal in FHIR QuestionnaireResponse', function () {
            var item = {
              "questionCodeSystem":"ad-hoc",
              "questionCode": "12345",
              "questionCardinality": {"min": "1", "max": "1"},
              "question": "a decimal",
              "dataType": "REAL",
              "linkId": "/real",
              "value": 0
            };
            var out = fhir.SDC._processResponseItem(item);
            assert.equal(out.answer[0].valueDecimal, 0);
          });
        });

        // import - xl
        describe('Load/convert/merge FHIR questionnaire/response into LForms data', function() {
          it('FHIR quantity should become LForms QTY with correct value from QuestionnaireResponse', function (itDone) {
            var lfDefFile = 'test/data/lforms-def-for-fhir-import-qn-response.json';
            var qrFile = 'test/data/fhir-import-qn-response.json';

            // Test loading FHIR Questionnaire QuestionnaireResponse for it, then merge into an lforms.
            $.get(lfDefFile, function(lfFormDef) { // load the questionnaire json
              $.get(qrFile, function(fhirQnRespData) { // load the questionnaire response json
                var mergedFormData = LForms.Util.mergeFHIRDataIntoLForms(
                  'QuestionnaireResponse', fhirQnRespData, lfFormDef, fhirVersion);
                assert.equal(mergedFormData.items[0].value, 333.0);
                assert.equal(mergedFormData.items[0].dataType, 'QTY');
                itDone();
              }).done().fail(function(err){console.log('Unable to load ' + qrFile);});
            }).done().fail(function(err){console.log('Unable to load ' + lfDefFile);});
          });
        });

        describe('import/merge FHIR QuestionnaireResponse into LForms data', function() {
          it('should properly process item.answer.item', function (itDone) {
            var lfDefFile = 'test/data/lforms-def-for-fhir-import-qn-response.json';
            var qrFile = 'test/data/fhir-import-qn-response.json';
            $.get(lfDefFile, function(lfFormDef) { // load the questionnaire json
              $.get(qrFile, function(fhirQnRespData) { // load the questionnaire response json
                var mergedFormData = LForms.Util.mergeFHIRDataIntoLForms(
                  fhirQnRespData, lfFormDef, fhirVersion);
                assert.equal(mergedFormData.items[3].value, "item.answer.item main item value");
                assert.equal(mergedFormData.items[3].items[1].value, 20);
                assert.equal(mergedFormData.items[4].value, "item.answer.item main item value2");
                assert.equal(mergedFormData.items[4].items[1].value, 30);
                itDone();
              }).done().fail(function(err){console.log('answer.item.answer - unable to load ' + qrFile);});
            }).done().fail(function(err){console.log('answer.item.answer - unable to load ' + lfDefFile);});
          });
        });

        describe('Questionnaire contained ValueSet', function() {
          var qnForm;
          before(function(done) {
            var qFile = 'test/data/' + fhirVersion + '/argonaut-phq9-ish.json';
            $.get(qFile, function(fhirQnData) { // load the questionnaire json
              qnForm = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQnData, fhirVersion);
              qnForm = new LForms.LFormsData(qnForm);
              done();
            }).fail(function(err){
              done(new Error('Unable to load ' + qFile + ': ' + err.statusText + ' (' + err.status + ')'));
            });
          });

          it('should properly convert to LForms answers', function () {
            var item = LForms.Util.findItem(qnForm.items, 'linkId', 'g1.q2');
            assert.equal(item.questionCode, '44255-8');
            assert.equal(item.dataType, 'CNE');
            assert.equal(item.answers[1].code, 'LA6569-3');
            assert.equal(item.answers[1].text, 'Several days');
            assert.equal(item.answers[1].score, 1);
          });

          it('should work when using url reference for contained ValueSet', function () {
            var item = LForms.Util.findItem(qnForm.items, 'linkId', 'g1.q9');
            assert.equal(item.questionCode, '44260-8');
            assert.equal(item.dataType, 'CNE');
            assert.equal(item.answers[1].code, 'LA6569-3');
            assert.equal(item.answers[1].text, 'Several days');
            assert.equal(item.answers[1].score, 1);
          });
        });

        describe('Export to QuestionnaireResponse', function() {
          var lfFile = 'test/data/item-answer-item.json';
          it('should convert to item.answer.item as appropriate', function (itDone) {
            $.get(lfFile, function(lfData) { // load the lforms json
              lfData = new LForms.LFormsData(lfData);
              var fhirQr = LForms.Util.getFormFHIRData('QuestionnaireResponse', fhirVersion, lfData);
              var answer = fhirQr.item[0].item[0].answer;
              assert.equal(answer[0].valueCoding.code, 'LA33-6');
              assert.equal(answer[0].item[0].answer[0].valueDate, '2019-09-09');
              assert.equal(answer[0].item[0].answer[1].valueDate, '2019-09-10');
              assert.equal(answer[0].item[1].answer[0].valueDecimal, 99);
              assert.equal(fhirQr.item[0].item[0].answer[1].item[0].answer[0].valueDate, '2019-09-11');
              itDone();
            }).done(function () { itDone(); })
              .fail(function(err){console.log(': Unable to load ' + lfFile);});
          });
        });
      });
    });
  })(fhirVersions[i]);
}

var nonSTU3FHIRVersions = fhirVersions.slice();
nonSTU3FHIRVersions.splice(nonSTU3FHIRVersions.indexOf('STU3'), 1);
for (var i=0, len=nonSTU3FHIRVersions.length; i<len; ++i) {
  (function (fhirVersion) {
    var fhir = LForms.FHIR[fhirVersion];
    describe(fhirVersion, function() {
      describe('FHIR SDC library', function() {
        describe('LForms data to Questionnaire conversion', function() {
          it('should handle FHIRPath extensions', function() {
            // Try converting a questionnaire to LForms and then convert it
            // back.
            var fhirQ = {
              "resourceType": "Questionnaire",
              "extension": [
                {
                  "url": "http://hl7.org/fhir/StructureDefinition/variable",
                  "valueExpression": {
                    "name": "flVar1",
                    "language" : "text/fhirpath",
                    "expression": "1"
                  }
                },
                {
                  "url": "http://hl7.org/fhir/StructureDefinition/variable",
                  "valueExpression": {
                    "name": "flVar2",
                    "language" : "text/fhirpath",
                    "expression": "2"
                  }
                },
                {
                  "url": "http://hl7.org/fhir/StructureDefinition/variable",
                  "valueExpression": {
                    "name": "flVar3",
                    "language" : "text/fhirpath",
                    "expression": "3"
                  }
                }
              ],
              "item": [
                {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression",
                      "valueExpression": {
                        "description": "initial BMI",
                        "language" : "text/fhirpath",
                        "expression": "1"
                      }
                    },
                    {
                      "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
                      "valueExpression": {
                        "description": "BMI calculation",
                        "language" : "text/fhirpath",
                        "expression": "item.where(linkId='/29463-7').answer.valueQuantity.value/item.where(linkId='/8302-2').answer.valueQuantity.value/item.where(linkId='/8302-2').answer.valueQuantity.value/0.0254/0.0254"
                      }
                    },
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/variable",
                      "valueExpression": {
                        "name": "var1",
                        "language" : "text/fhirpath",
                        "expression": "-5"
                      }
                    },
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/variable",
                      "valueExpression": {
                        "name": "var2",
                        "language" : "text/fhirpath",
                        "expression": "-4"
                      }
                    }
                  ],
                  "linkId": "/39156-5",
                  "code": [
                    {
                      "system": "http://loinc.org",
                      "code": "39156-5",
                      "display": "BMI"
                    }
                  ],
                  "text": "BMI",
                  "type": "decimal"
                }
              ]
            };
            var lformsQ = new LForms.LFormsData(fhir.SDC.convertQuestionnaireToLForms(fhirQ));
            var itemVariables = lformsQ.items[0]._fhirExt[fhir.SDC.fhirExtVariable];
            assert.isOk(itemVariables);
            assert.equal(itemVariables.length, 2);
            var formVariables = lformsQ._fhirExt[fhir.SDC.fhirExtVariable];
            assert.isOk(formVariables);
            assert.equal(formVariables.length, 3);
            var convertedFHIRQ = fhir.SDC.convertLFormsToQuestionnaire(lformsQ);
            // Confirm that we got the exension back.
            var fhirQExts = fhirQ.extension;
            var convertedExts = convertedFHIRQ.extension;
            // After the conversion, the order of extension array might change,
            // but at least make sure the content of each element is the same.
            assert.equal(convertedExts.length, fhirQExts.length);
            for (var i=0, len=convertedExts.length; i<len; ++i) {
              assert.isOk(fhirQExts.some(function(qExt) {
                return JSON.stringify(convertedExts[i]) === JSON.stringify(qExt);
              }));
            }

            fhirQExts = fhirQ.item[0].extension;
            convertedExts = convertedFHIRQ.item[0].extension;
            assert.equal(convertedExts.length, fhirQExts.length);
            for (i=0, len=convertedExts.length; i<len; ++i) {
              assert.isOk(fhirQExts.some(function(qExt) {
                return JSON.stringify(convertedExts[i]) === JSON.stringify(qExt);
              }));
            }
          });
        });
      });
    });
  })(nonSTU3FHIRVersions[i]);
}


