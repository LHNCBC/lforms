// Tests for FHIR SDC library
describe('FHIR SDC library', function() {
  describe('itemToQuestionnaireItem', function() {

    it('should convert code system', function() {

      var codeSystem = "LOINC";
      var fhirCodeSystem = LForms.FHIR_SDC._getCodeSystem(codeSystem);
      assert.equal(fhirCodeSystem, "http://loinc.org");
    });

    it('should covert an item with ST data type', function () {
      var item = {
        "questionCodeSystem":"LOINC",
        "questionCode": "54125-0",
        "questionCardinality": {"min": "1", "max": "*"},
        "question": "Name",
        "dataType": "ST",
        "_codePath": "/54126-8/54125-0",
        "_idPath": "/1/1"
      };
      var out = LForms.FHIR_SDC._processItem(item, {});
      assert.equal(out.required, undefined);
      assert.equal(out.repeats, true);
      assert.equal(out.linkId, "/54126-8/54125-0/1/1");
      assert.equal(out.text, "Name");
      assert.equal(out.type, "string");
      assert.equal(out.code[0].system,"http://loinc.org");
      assert.equal(out.code[0].code,"54125-0");

    });

    it('should covert an item with CNE data type', function () {
      var item = {
        "questionCode": "54131-8",
        "questionCardinality": {"min": "1", "max": "1"},
        "question": "Gender",
        "answers": [
          {"text": "Male", "code": "LA2-8"},
          {"text": "Female", "code": "LA3-6"},
          {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
        ],
        "answerCardinality": {"min": "1", "max": "1"},
        "dataType": "CNE",
        "questionCodeSystem":"LOINC",
        "_codePath": "/54126-8/54131-8",
        "_idPath": "/1/1"
      };
      var out = LForms.FHIR_SDC._processItem(item, {});
      assert.equal(out.required, undefined);
      assert.equal(out.repeats, undefined);
      assert.equal(out.linkId, "/54126-8/54131-8/1/1");
      assert.equal(out.text, "Gender");
      assert.equal(out.type, "choice");
      assert.equal(out.code[0].system,"http://loinc.org");
      assert.equal(out.code[0].code,"54131-8");
      assert.equal(out.option.length, 3);
      assert.equal(out.option[0].valueCoding.system,"http://loinc.org");
      assert.equal(out.option[0].valueCoding.code,"LA2-8");
      assert.equal(out.option[0].valueCoding.display,"Male");
      assert.equal(out.option[1].valueCoding.system,"http://loinc.org");
      assert.equal(out.option[1].valueCoding.code,"LA3-6");
      assert.equal(out.option[1].valueCoding.display,"Female");
      assert.equal(out.option[2].valueCoding.system,"http://loinc.org");
      assert.equal(out.option[2].valueCoding.code,"LA46-8");
      assert.equal(out.option[2].valueCoding.display,"Other");
    });

    it('should covert an item with SECTION data type, with skip logic and sub items', function () {
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
            "_codePath": "/54126-8/54137-5X/54140-9X",
            "_idPath": "/1/1/1"
          },
          {
            "questionCode": "54130-0X",
            "questionCardinality": {"min": "1", "max": "1"},
            "question": "Mock-up sub item #2",
            "dataType": "REAL",
            "_codePath": "/54126-8/54137-5X/54130-0X",
            "_idPath": "/1/1/1"
          }
        ],
        "_codePath": "/54126-8/54137-5X",
        "_idPath": "/1/1"
      };

      var out = LForms.FHIR_SDC._processItem(item, {});
      assert.equal(out.required, undefined);
      assert.equal(out.repeats, true);
      assert.equal(out.linkId, "/54126-8/54137-5X/1/1");
      assert.equal(out.text, "Mock-up section: Shown when Height = 15");
      assert.equal(out.type, "group");

      assert.equal(out.item.length, 2);
      assert.equal(out.item[0].required, undefined);
      assert.equal(out.item[0].repeats, undefined);
      assert.equal(out.item[0].linkId, "/54126-8/54137-5X/54140-9X/1/1/1");
      assert.equal(out.item[0].text,"Mock-up sub item #1");
      assert.equal(out.item[0].type,"integer");
      assert.equal(out.item[1].required, undefined);
      assert.equal(out.item[1].repeats, undefined);
      assert.equal(out.item[1].linkId, "/54126-8/54137-5X/54130-0X/1/1/1");
      assert.equal(out.item[1].text,"Mock-up sub item #2");
      assert.equal(out.item[1].type,"decimal");

    });

  });

  describe.only('Questionnaire to lforms item conversion', function () {
    it('should convert FHTData to lforms', function () {
      var fhirQ = LForms.FHIR_SDC.convert2Questionnaire(new LForms.LFormsData(FHTData));
      var convertedLfData = LForms.FHIR_SDC.convertQuestionnaire2Lforms(fhirQ);

      assert.equal(convertedLfData.name, 'USSG-FHT, (with mock-up items for skip logic demo)');
      assert.equal(convertedLfData.code, '54127-6N');
      assert.equal(convertedLfData.codeSystem, 'LOINC');
      assert.equal(convertedLfData.items.length, 2);
      assert.equal(convertedLfData.items[0].question, "Your health information");
      assert.equal(convertedLfData.items[0].questionCode, "54126-8");
      assert.equal(convertedLfData.items[0].questionCodeSystem, "LOINC");
      assert.equal(convertedLfData.items[0].questionCodeSystem, "LOINC");
      assert.equal(convertedLfData.items[0].dataType, 'SECTION');
      assert.equal(convertedLfData.items[0].header, true);
      assert.equal(convertedLfData.items[0].items.length, 13);

      assert.equal(convertedLfData.items[0].items[0].question, "Name");
      assert.equal(convertedLfData.items[0].items[0].questionCode, "54125-0");
      assert.equal(convertedLfData.items[0].items[0].questionCodeSystem, "LOINC");
      assert.equal(convertedLfData.items[0].items[0].questionCardinality.min, "1");
      assert.equal(convertedLfData.items[0].items[0].questionCardinality.max, "*");
      assert.equal(convertedLfData.items[0].items[0].questionCodeSystem, "LOINC");
      assert.equal(convertedLfData.items[0].items[0].dataType, 'ST');

      assert.equal(convertedLfData.items[0].items[1].answers.length, 3);
      assert.equal(convertedLfData.items[0].items[1].answers[0].text, "Male");
      assert.equal(convertedLfData.items[0].items[1].answers[0].code, "LA2-8");
      assert.equal(convertedLfData.items[0].items[1].answers[2].text, "Other");
      assert.equal(convertedLfData.items[0].items[1].answers[2].code, "LA46-8");
      // TODO - other not supported
      //assert.equal(convertedLfData.items[0].items[1].answers[2].other, "Please Specify");
      assert.equal(convertedLfData.items[0].items[1].dataType, "CNE");

      // TODO - skip logic triggers for min/max inclsuive/exclusive are not supported.
      // Skip logic action and logic is not supported.
      // Only code/value triggers are supported.
      assert.equal(convertedLfData.items[0].items[4].skipLogic.conditions[0].source, "54125-0");
      assert.equal(convertedLfData.items[0].items[4].skipLogic.conditions[0].trigger.value, "Alex");
      assert.equal(convertedLfData.items[0].items[12].items[2].skipLogic.conditions[0].source, "54130-0");
      assert.equal(convertedLfData.items[0].items[12].items[2].skipLogic.conditions[0].trigger.code, "LA10402-8");

      assert.equal(convertedLfData.items[0].items[6].answerCardinality.min, "1");
      assert.equal(convertedLfData.items[0].items[6].codingInstructions, "Try to type 10, 12, 15, 16, 25");
      // TODO units[x].default is not supported. units[x].code is not supported.
      assert.equal(convertedLfData.items[0].items[6].units.length, 2);
      assert.equal(convertedLfData.items[0].items[6].units[0].name, "inches");
      assert.equal(convertedLfData.items[0].items[6].units[1].name, "centimeters");

      // Display control
      fhirQ = LForms.FHIR_SDC.convert2Questionnaire(new LForms.LFormsData(displayControlsDemo));
      convertedLfData = LForms.FHIR_SDC.convertQuestionnaire2Lforms(fhirQ);

      // TODO -
      // unsupported fields: viewMode, css, colCSS, listColHeaders, answerLayout.columns
      // supported fields: questionLayout, answerLayout.type
      assert.equal(convertedLfData.items[1].displayControl.answerLayout.type, "RADIO_CHECKBOX");
      // Vertical layout is not converted as it is default.
      assert.equal(convertedLfData.items[5].displayControl, undefined);
      assert.equal(convertedLfData.items[6].displayControl.questionLayout, "horizontal");
    });

    it('should convert restrictions', function () {
      var fhirQ = LForms.FHIR_SDC.convert2Questionnaire(new LForms.LFormsData(validationTestForm));
      var convertedLfData = LForms.FHIR_SDC.convertQuestionnaire2Lforms(fhirQ);

      assert.equal(convertedLfData.items.length, 32);
      // TODO - min/max exclusive is not supported
      assert.equal(convertedLfData.items[12].restrictions.minInclusive, 5);
      assert.equal(convertedLfData.items[14].restrictions.maxInclusive, 10);
      assert.equal(convertedLfData.items[21].restrictions.minLength, 5);
      assert.equal(convertedLfData.items[22].restrictions.maxLength, 10);
    });

  });
});


