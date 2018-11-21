/**
 * Created by akanduru on 3/20/17.
 */
// Tests for the app/scripts/lib/lforms-validate.js
describe('lforms-validate library', function() {
  describe('dataType', function() {
    it('should validate URL', function() {
      // Positive assertions
      assert.equal(LForms.Validations.checkDataType('URL',
        'https://lforms-service.nlm.nih.gov'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'http://lforms-service.nlm.nih.gov'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'ftp://lforms-service.nlm.nih.gov'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'https://lforms-service.nlm.nih.gov:9001'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'http://lforms-service.nlm.nih.gov/'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'http://lforms-service.nlm.nih.gov:9001/'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'https://lforms-service.nlm.nih.gov/loinc_form_definitions?loinc_num=34566-0'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'https://lforms-service.nlm.nih.gov:9001/loinc_form_definitions?loinc_num=34566-0'),
        true);
      assert.equal(LForms.Validations.checkDataType('URL',
        'https://www.ncbi.nlm.nih.gov/CBBresearch/Lu/Demo/PubTator/index.cgi?searchtype=PubMed_Search&query=ESR1+breast+cancer&submit=Search&user=User199424024'),
        true);

      assert.equal(LForms.Validations.checkDataType('URL',
        'https://www.ncbi.nlm.nih.gov/CBBresearch/Lu/Demo/PubTator/index.cgi?searchtype=PubMed_Search&query=ESR1+breast+cancer&submit=Search&user=User199424024'),
        true);

      // Negative assertions - Just account for some common typos
      assert.equal(LForms.Validations.checkDataType('URL',
        'jfasfakj'),
        false);
      assert.equal(LForms.Validations.checkDataType('URL',
        'lforms-service.nlm.nih.gov'),
        false);
      assert.equal(LForms.Validations.checkDataType('URL',
        'http:/lforms-service.nlm.nih.gov'),
        false);
      assert.equal(LForms.Validations.checkDataType('URL',
        '/lforms-service.nlm.nih.gov'),
        false);
      assert.equal(LForms.Validations.checkDataType('URL',
        'somecompany.com'),
        false);
    });
  });

});
