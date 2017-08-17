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

  describe.skip('Questionnaire to lforms item conversion', function () {
    var item = {
      "questionCode": "54137-5X",
      "questionCardinality": {"min": "1", "max": "*"},
      "question": "Mock-up section: Shown when Height = 15",
      "dataType": "SECTION",
      // level 3
      "items": [
        { "questionCode": "54140-9X",
          "question": "Mock-up sub item #1",
          "dataType": "INT",
          "_codePath": "/54126-8/54137-5X/54140-9X",
          "_idPath": "/1/1/1"
        },
        {
          "questionCode": "54130-0X",
          "question": "Mock-up sub item #2",
          "dataType": "REAL",
          "_codePath": "/54126-8/54137-5X/54130-0X",
          "_idPath": "/1/1/1"
        }
      ],
      "_codePath": "/54126-8/54137-5X",
      "_idPath": "/1/1"
    };

    it('should convert fhir questionnaire to lforms', function () {
      var fhirQ = LForms.FHIR_SDC._processItem(item, {});
      var convertedLfData = LForms.FHIR_SDC._processQuestionnaireItem(fhirQ);
      var lfData = $.extend({}, item);
      delete lfData._codePath;
      delete lfData._idPath;
      delete lfData.items[0]._codePath;
      delete lfData.items[0]._idPath;
      delete lfData.items[1]._codePath;
      delete lfData.items[1]._idPath;

      assert.deepEqual(lfData, convertedLfData);
    });
  });
});


