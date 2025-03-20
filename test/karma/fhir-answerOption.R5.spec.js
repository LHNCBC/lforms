// Tests for FHIR SDC library

function testImportAnswerOption(params, answerConstraint) {
  let fhirVersion = "R5";
  let fhir = LForms.FHIR[fhirVersion];

  describe(fhirVersion, function() {

    it('should import ' + params.valueType + ' as answerOption, with answerConstraint=' + answerConstraint, function (done) {

      let displayControlRadioCheckboxVertical = {"answerLayout": { "type": "RADIO_CHECKBOX", "columns": "1" }},
          displayControlRadioCheckboxHorizontal = {"answerLayout": { "type": "RADIO_CHECKBOX", "columns": "0" }},
          displayControlCombo = {"answerLayout": { "type": "COMBO_BOX" } },
          answerCardinalityRepeats = { "max": "*", "min": "0" },
          answerCardinalityNonRepeats = { "max": "1", "min": "0" };

      let file = `test/data/${fhirVersion}/answerOption/answerOption-${params.valueType}.${answerConstraint}.${fhirVersion}.json`;
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
          assert.deepEqual(lfData.items[4].items[0].defaultAnswer, params[answerConstraint].defaultSingle)
          assert.deepEqual(lfData.items[4].items[1].defaultAnswer, params[answerConstraint].defaultRepeats)
          //answerOption - radiocheckbox - initial
          assert.deepEqual(lfData.items[5].items[0].defaultAnswer, params[answerConstraint].defaultSingle)
          assert.deepEqual(lfData.items[5].items[1].defaultAnswer, params[answerConstraint].defaultRepeats)
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

    it('should export ' + params.valueType + ' as answerOption, with answerConstraint=' + answerConstraint, function (done) {

      let file = `test/data/${fhirVersion}/answerOption/answerOption-${params.valueType}.${answerConstraint}.${fhirVersion}.json`;
      $.get(file, function (fhirQ) {
        try {
          let lfData = LForms.Util.convertFHIRQuestionnaireToLForms(fhirQ, fhirVersion);
          //answerOption - autocomplete
          let q = LForms.Util._convertLFormsToFHIRData("Questionnaire", fhirVersion, lfData);

          assert.deepEqual(q.item[0], fhirQ.item[0])
          assert.deepEqual(q.item[1], fhirQ.item[1])
          assert.deepEqual(q.item[2], fhirQ.item[2])
          assert.deepEqual(q.item[3], fhirQ.item[3])
          assert.deepEqual(q.item[4], fhirQ.item[4])
          assert.deepEqual(q.item[5], fhirQ.item[5])

          // assert.deepEqual(q, fhirQ) // meta is different
          assert.equal(q.status, fhirQ.status);
          assert.equal(q.title, fhirQ.title);
          assert.deepEqual(q.code, fhirQ.code);
          assert.deepEqual(q.item, fhirQ.item);
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



describe('FHIR SDC functions on answerOption', function() {
  // 1) answerOption is valueString
  let params = {
    valueType: "valueString",
    answers : [{ "text": "a" }, { "text": "b" }, { "text": "c" }],
    answersWithPrefixScore : [
      { "text": "a", "label": "A", "score": 1 },
      { "text": "b", "label": "B", "score": 2 },
      { "text": "c", "label": "C", "score": 3 }
    ],
    optionsOnly: {
      defaultSingle : {"text": 'b'},
      defaultRepeats : [{"text": 'b'}, {"text": 'c'}]
    },
    optionsOrString: {
      defaultSingle : "user typed value",
      defaultRepeats : [{"text": 'b'}, "user typed value"]
    }
  }
  testImportAnswerOption(params, "optionsOnly");
  testImportAnswerOption(params, "optionsOrString");

  // 2) answerOption is valueInteger
  params = {
    valueType: "valueInteger",
    answers : [{ "text": 12 }, { "text": 34 }, { "text": 56 }],
    answersWithPrefixScore : [
      { "text": 12, "label": "A", "score": 1 },
      { "text": 34, "label": "B", "score": 2 },
      { "text": 56, "label": "C", "score": 3 }
    ],
    optionsOnly: {
      defaultSingle : {"text": 34},
      defaultRepeats : [{"text": 34}, {"text": 56}]
    },
    optionsOrString: {
      defaultSingle : "user typed value",
      defaultRepeats : [{"text": 34}, "user typed value"]
    }
  }
  testImportAnswerOption(params, "optionsOnly");
  testImportAnswerOption(params, "optionsOrString");

  // 3) answerOption is valueDate
  params = {
    valueType: "valueDate",
    answers : [{ "text": "2022" }, { "text": "2022-09" }, { "text": "2022-09-20" }],
    answersWithPrefixScore : [
      { "text": "2022", "label": "A", "score": 1 },
      { "text": "2022-09", "label": "B", "score": 2 },
      { "text": "2022-09-20", "label": "C", "score": 3 }
    ],
    optionsOnly: {
      defaultSingle : {"text": '2022-09'},
      defaultRepeats : [{"text": '2022-09'}, {"text": '2022-09-20'}]
    },
    optionsOrString: {
      defaultSingle : "user typed value",
      defaultRepeats : [{"text": '2022-09'}, "user typed value"]
    }
  }
  testImportAnswerOption(params, "optionsOnly");
  testImportAnswerOption(params, "optionsOrString");

  // 4) answerOption is valueTime
  params = {
    valueType: "valueTime",
    answers : [{ "text": "10:30:00" }, { "text": "13:30:00" }, { "text": "23:59:59" }],
    answersWithPrefixScore : [
      { "text": "10:30:00", "label": "A", "score": 1 },
      { "text": "13:30:00", "label": "B", "score": 2 },
      { "text": "23:59:59", "label": "C", "score": 3 }
    ],
    optionsOnly: {
      defaultSingle : {"text": '13:30:00'},
      defaultRepeats : [{"text": '13:30:00'}, {"text": '23:59:59'}]
    },
    optionsOrString: {
      defaultSingle : "user typed value",
      defaultRepeats : [{"text": '13:30:00'}, "user typed value"]
    }
  }
  testImportAnswerOption(params, "optionsOnly");
  testImportAnswerOption(params, "optionsOrString");

  // 5) answerOption is valueCoding, choice
  params = {
    valueType: "valueCoding",
    answers : [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}
    ],
    answersWithPrefixScore : [
      {"code": "c1", "text": "Answer 1", "label": "A", "score": 1},
      {"code": "c2", "text": "Answer 2", "label": "B", "score": 2},
      {"code": "c3", "text": "Answer 3", "label": "C", "score": 3}
    ],
    optionsOnly: {
      defaultSingle : {"code": "c2", "text": "Answer 2"},
      defaultRepeats : [{"code": "c2", "text": "Answer 2"}, {"code": "c3", "text": "Answer 3"}]
    },
    optionsOrString: {
      defaultSingle : "user typed value",
      defaultRepeats : [{"code": "c2", "text": "Answer 2"}, "user typed value"]
    }
  }
  testImportAnswerOption(params, "optionsOnly");
  testImportAnswerOption(params, "optionsOrString");
});

describe('coding in R5 with answerConstraint to choice/open-choice in R4', function() {
  let qR5a = {
    "id": "r5",
    "status": "draft",
    "name": "r5-coding-answerConstraint",
    "title": "R5 Coding answerConstraint",
    "resourceType": "Questionnaire",
    "item": [
      {
        "type": "coding",
        "answerConstraint": "optionsOnly",
        "linkId": "1",
        "text": "coding-optionsOnly",
      },
      {
        "type": "coding",
        "answerConstraint": "optionsOrString",
        "linkId": "2",
        "text": "coding-optionsOrString",
      },
      {
        "type": "coding",
        "linkId": "4",
        "text": "coding",
      }
    ]
  }
  let qR5b = {
    "id": "r5",
    "status": "draft",
    "name": "r5-coding-answerConstraint",
    "title": "R5 Coding answerConstraint",
    "resourceType": "Questionnaire",
    "item": [
      {
        "type": "coding",
        "answerConstraint": "optionsOnly",
        "linkId": "1",
        "text": "coding-optionsOnly",
      },
      {
        "type": "coding",
        "answerConstraint": "optionsOrString",
        "linkId": "2",
        "text": "coding-optionsOrString",
      },
      {
        "type": "coding",
        "answerConstraint": "optionsOrType",
        "linkId": "3",
        "text": "coding-optionsOrType",
      },
      {
        "type": "coding",
        "linkId": "4",
        "text": "coding",
      }
    ]
  }
  it('should convert coding in R5 with answerConstraint to choice/open-choice in R4', function () {
    let lfData = LForms.Util.convertFHIRQuestionnaireToLForms(qR5a, 'R5');
    let qR4 = LForms.Util._convertLFormsToFHIRData("Questionnaire", "R4", lfData);
    
    assert.equal(qR4.item[0].type, "choice")
    assert.equal(qR4.item[0].answerConstraint, null)
    assert.equal(qR4.item[1].type, "open-choice")
    assert.equal(qR4.item[1].answerConstraint, null)
    assert.equal(qR4.item[2].type, "choice")
    assert.equal(qR4.item[2].answerConstraint, null)
     
  });

  it('should not convert type "coding" with answerConstraint "optionsOrType" in R5 Questionnaire to R4', function () {
    try {
      let lfData = LForms.Util.convertFHIRQuestionnaireToLForms(qR5b, 'R5');
      let qR4 = LForms.Util._convertLFormsToFHIRData("Questionnaire", "R4", lfData);
    }
    catch (e) {
      let errMessage = "The type 'coding' with answerConstraint 'optionsOrType' in R5 cannot be converted to a valid type in R4 or STU3."
      assert.equal(e.message, errMessage);
    }
     
  });
});
