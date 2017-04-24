// Tests for FHIR SDC library
describe('FHIR SDC library', function() {
  describe('itemToQuestionnaireItem', function() {

    it('should use LOINC as the default code system', function () {
      var item = {
        "questionCode": "54125-0",
        "questionCardinality": {"min": "1", "max": "*"},
        "question": "Name",
        "dataType": "ST"
      };
      var out = LForms.FHIR_SDC._processItem(item);
      assert.equal(out.required, false);
      assert.equal(out.repeats, true);
      assert.equal(out.linkId, "/54126-8/54125-0/1/1");
      assert.equal(out.text, "Name");
      assert.equal(out.type, true);
      assert.equal(out.repeats, "string");
      assert.equal(out.code, [{"system": "http://loinc.org", "code": "54125-0"}]);


      // {
      //   "required": false,
      //     "repeats": true,
      //     "linkId": "/54126-8/54125-0/1/1",
      //     "code": [
      //   {
      //     "system": "http://loinc.org",
      //     "code": "54125-0"
      //   }
      // ],
      //     "text": "Name",
      //     "type": "string"
      // },


    });



    // describe('itemToQuestionnaireResponseItem', function() {
    // });
  });
});


