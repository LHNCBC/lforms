// Tests for FHIR SDC library
let fhirVers = Object.keys(LForms.Util.FHIRSupport);

function testImportAnswerOption(params) {
  for (var i=0, len=fhirVers.length; i<len; ++i) {
    (function (fhirVersion) {
      let fhir = LForms.FHIR[fhirVersion];
      describe(fhirVersion, function() {
        
        it('should import ' + params.valueType + ' as answerOption, ' + fhirVersion, function (done) {

          let displayControlRadioCheckboxVertical = {"answerLayout": { "type": "RADIO_CHECKBOX", "columns": "1" }},
              displayControlRadioCheckboxHorizontal = {"answerLayout": { "type": "RADIO_CHECKBOX", "columns": "0" }},
              displayControlCombo = {"answerLayout": { "type": "COMBO_BOX" } },
              answerCardinalityRepeats = { "max": "*", "min": "0" },
              answerCardinalityNonRepeats = { "max": "1", "min": "0" };

          let file = 'test/data/lforms/answerOption/answerOption-' + params.valueType +'.' + fhirVersion + '.json';
          $.get(file, function (fhirQ) {
            try {
              let lfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);

              //answerOption - autocomplete
              assert.deepEqual(lfData.items[0].items[0].answers, params.answers)
              assert.deepEqual(lfData.items[0].items[0].displayControl, displayControlCombo)
              assert.deepEqual(lfData.items[0].items[0].answerCardinality, answerCardinalityNonRepeats)
              assert.deepEqual(lfData.items[0].items[1].answers, params.answers)
              assert.deepEqual(lfData.items[0].items[1].displayControl, displayControlCombo)
              assert.deepEqual(lfData.items[0].items[1].answerCardinality, answerCardinalityRepeats)
              //answerOption - radiocheckbox
              assert.deepEqual(lfData.items[1].items[0].answers, params.answers)
              assert.deepEqual(lfData.items[1].items[0].displayControl, displayControlRadioCheckboxVertical)
              assert.deepEqual(lfData.items[1].items[0].answerCardinality, answerCardinalityNonRepeats)
              assert.deepEqual(lfData.items[1].items[1].answers, params.answers)
              assert.deepEqual(lfData.items[1].items[1].displayControl, displayControlRadioCheckboxHorizontal)
              assert.deepEqual(lfData.items[1].items[1].answerCardinality, answerCardinalityRepeats)
              //answerOption - prefix- score
              assert.deepEqual(lfData.items[2].items[0].answers, params.answersWithPrefixScore)
              assert.deepEqual(lfData.items[2].items[0].displayControl, displayControlCombo)
              assert.deepEqual(lfData.items[2].items[0].answerCardinality, answerCardinalityNonRepeats)              
              assert.deepEqual(lfData.items[2].items[1].answers, params.answersWithPrefixScore)
              assert.deepEqual(lfData.items[2].items[1].displayControl, displayControlCombo)
              assert.deepEqual(lfData.items[2].items[1].answerCardinality, answerCardinalityRepeats)
              //answerOption - radiocheckbox - prefix - score
              assert.deepEqual(lfData.items[3].items[0].answers, params.answersWithPrefixScore)
              assert.deepEqual(lfData.items[3].items[0].displayControl, displayControlRadioCheckboxVertical)
              assert.deepEqual(lfData.items[3].items[0].answerCardinality, answerCardinalityNonRepeats)
              assert.deepEqual(lfData.items[3].items[1].answers, params.answersWithPrefixScore)
              assert.deepEqual(lfData.items[3].items[1].displayControl, displayControlRadioCheckboxHorizontal)
              assert.deepEqual(lfData.items[3].items[1].answerCardinality, answerCardinalityRepeats)
              //answerOption - autocomplete - initial
              assert.deepEqual(lfData.items[4].items[0].defaultAnswer, params.defaultSingle)
              if (fhirVersion === "R4")
                assert.deepEqual(lfData.items[4].items[1].defaultAnswer, params.defaultRepeatsR4)
              else
                assert.deepEqual(lfData.items[4].items[1].defaultAnswer, params.defaultRepeatsSTU3)
              //answerOption - radiocheckbox - initial
              assert.deepEqual(lfData.items[5].items[0].defaultAnswer, params.defaultSingle)
              if (fhirVersion === "R4")
                assert.deepEqual(lfData.items[5].items[1].defaultAnswer, params.defaultRepeatsR4)
              else
                assert.deepEqual(lfData.items[5].items[1].defaultAnswer, params.defaultRepeatsSTU3)
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
        
        it('should export ' + params.valueType + ' as answerOption, ' + fhirVersion, function (done) {

          let file = 'test/data/lforms/answerOption/answerOption-' + params.valueType + '.' + fhirVersion + '.json';
          $.get(file, function (fhirQ) {
            try {
              let lfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);
              //answerOption - autocomplete
              let q = LForms.Util._convertLFormsToFHIRData("Questionnaire", fhirVersion, lfData);

              assert.deepEqual(q.item[0].item, fhirQ.item[0].item)
              assert.deepEqual(q.item[1].item, fhirQ.item[1].item)
              assert.deepEqual(q.item[2].item, fhirQ.item[2].item)
              assert.deepEqual(q.item[3].item, fhirQ.item[3].item)
              assert.deepEqual(q.item[4].item, fhirQ.item[4].item)
              assert.deepEqual(q.item[5].item, fhirQ.item[5].item)
              assert.deepEqual(q, fhirQ)
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
    })(fhirVers[i]);
  
  }
}



describe('FHIR SDC functions on answerOption', function() {
  // 1) answerOption is valueString 
  let params = {
    valueType: "valueString",
    answers : [{ "text": "a" }, { "text": "b" }, { "text": "c" }],
    answersWithPrefixScore : [
      { "text": "a", "label": "A", "score": "1" },
      { "text": "b", "label": "B", "score": "2" },
      { "text": "c", "label": "C", "score": "3" }
    ],
    defaultSingle : {"text":'b'},
    defaultRepeatsSTU3 : [{"text":'b'}],
    defaultRepeatsR4 : [{"text":'b'}, {"text":'c'}]
  }
  testImportAnswerOption(params)

  // 2) answerOption is valueInteger 
  params = {
    valueType: "valueInteger",
    answers : [{ "text": 12 }, { "text": 34 }, { "text": 56 }],
    answersWithPrefixScore : [
      { "text": 12, "label": "A", "score": "1" },
      { "text": 34, "label": "B", "score": "2" },
      { "text": 56, "label": "C", "score": "3" }
    ],
    defaultSingle : {"text": 34},
    defaultRepeatsSTU3 : [{"text": 34}],
    defaultRepeatsR4 : [{"text":34}, {"text":56}]
  }
  testImportAnswerOption(params)

  // 3) answerOption is valueDate 
  params = {
    valueType: "valueDate",
    answers : [{ "text": "2022" }, { "text": "2022-09" }, { "text": "2022-09-20" }],
    answersWithPrefixScore : [
      { "text": "2022", "label": "A", "score": "1" },
      { "text": "2022-09", "label": "B", "score": "2" },
      { "text": "2022-09-20", "label": "C", "score": "3" }
    ],
    defaultSingle : {"text": "2022-09"},
    defaultRepeatsSTU3 : [{"text": "2022-09"}],
    defaultRepeatsR4 : [{"text":"2022-09"}, {"text":"2022-09-20"}]
  }
  testImportAnswerOption(params)

  // 4) answerOption is valueTime 
  params = {
    valueType: "valueTime",
    answers : [{ "text": "10:30:00" }, { "text": "13:30:00" }, { "text": "23:59:59" }],
    answersWithPrefixScore : [
      { "text": "10:30:00", "label": "A", "score": "1" },
      { "text": "13:30:00", "label": "B", "score": "2" },
      { "text": "23:59:59", "label": "C", "score": "3" }
    ],
    defaultSingle : {"text": "13:30:00"},
    defaultRepeatsSTU3 : [{"text": "13:30:00"}],
    defaultRepeatsR4 : [{"text":"13:30:00"}, {"text":"23:59:59"}]
  }
  testImportAnswerOption(params)

  // 5) answerOption is valueCoding, choice
  params = {
    valueType: "valueCoding.choice",
    answers : [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}
    ],
    answersWithPrefixScore : [
      {"code": "c1", "text": "Answer 1", "label": "A", "score": "1"},
      {"code": "c2", "text": "Answer 2", "label": "B", "score": "2"},
      {"code": "c3", "text": "Answer 3", "label": "C", "score": "3"}
    ],
    defaultSingle : {"code": "c2", "text": "Answer 2"},
    defaultRepeatsSTU3 : [{"code": "c2", "text": "Answer 2"}],
    defaultRepeatsR4 : [
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}
    ]
  }
  testImportAnswerOption(params)

  // 6) answerOption is valueCoding, open-choice
  params = {
    valueType: "valueCoding.open-choice",
    answers : [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}
    ],
    answersWithPrefixScore : [
      {"code": "c1", "text": "Answer 1", "label": "A", "score": "1"},
      {"code": "c2", "text": "Answer 2", "label": "B", "score": "2"},
      {"code": "c3", "text": "Answer 3", "label": "C", "score": "3"}
    ],
    defaultSingle : "user typed value",
    defaultRepeatsSTU3 : [{"code": "c2", "text": "Answer 2"}],
    defaultRepeatsR4 : [
      {"code": "c2", "text": "Answer 2"},
      "user typed value"
    ]
  }
  testImportAnswerOption(params)
});
