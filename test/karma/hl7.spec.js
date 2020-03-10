// Tests for the HL7 generation library
describe('HL7 library', function() {
  "use strict";
  describe('_itemToHL7v2', function() {
    it('should use LOINC as the default code system', function() {
      var formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'value': {'text': 'United States', 'code': 'USA'}, 'dataType': 'CWE',
        '_obx4': ''};
      var out = LForms.HL7._itemToHL7v2(itemData, formInfo);
      assert.equal(out.trim(),
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          '^LN||'+itemData.value.code+'^'+itemData.value.text+'^|');
    });


    it('should use answer.system when provided', function() {
      var formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'BB',
        'value': {'text': 'United States', 'code': 'USA', 'system': 'AA'}, 'dataType': 'CWE',
        '_obx4': ''};
      var out = LForms.HL7._itemToHL7v2(itemData, formInfo);
      assert.equal(out.trim(),
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          '^LN||'+itemData.value.code+'^'+itemData.value.text+'^AA|');
    });


    it('should put uncoded CWE answers into OBX5.9', function() {
      var formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'BB',
        'value': {'text': 'United States', "system": "AA"}, 'dataType': 'CWE',
        '_obx4': ''};
      var out = LForms.HL7._itemToHL7v2(itemData, formInfo);
      assert.equal(out.trim(),
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          '^LN||^^^^^^^^'+itemData.value.text+'|');
      // Try a multi-answer field
      var formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'BB',
        'value': [{'text': 'Canada'}, {'text': 'United States', 'code': 'USA', 'system': 'AA'}],
        'dataType': 'CWE', '_obx4': ''};
      var out = LForms.HL7._itemToHL7v2(itemData, formInfo);
      assert.equal(out.trim(),
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          "^LN|a|^^^^^^^^Canada|\r"+
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          '^LN|b|USA^United States^AA|');
    });


    it('should put multiple answers into separate OBX records', function() {
      // This is nearly the same test as above, but conceptually the tests
      // should be distinct.
      var formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'BB',
        'value': [{'text': 'Canada', 'code': 'CA', 'system': 'AA'}, {'text': 'United States', 'code': 'USA', 'system': 'AA'}],
        'dataType': 'CWE', '_obx4': '2'};
      var out = LForms.HL7._itemToHL7v2(itemData, formInfo);
      assert.equal(out.trim(),
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          "^LN|2.a|CA^Canada^AA|\r"+
          'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
          "^LN|2.b|USA^United States^AA|");

    });
  });

});
