// Testing data changes that are affected by templateOptions in LhcFormData.
//
// Note: When the 'options' property is supplied with the 'questionnaire' property at the same time
// on the wc-lhc-form web component, or the 'options' property is changed alone after the web component
// is initialized, "setTemplateOptions" is always called separately on the initialized LhcFormData instance.
//
describe('test displayScoreWithAnswerText in template options', function() {
  it('should display a score with answer text when displayScoreWithAnswerText is not set', function(done) {
    $.get('test/data/lforms/glasgow.json', function(glasgow) {
      var lfData = new LForms.LFormsData(glasgow);
      assert.equal(lfData.name, "Glasgow coma scale (with score rules)");
      assert.equal(lfData.items[0]._autocompOptions.listItems[0]._displayText, "1. No eye opening - 1");
      assert.equal(lfData.items[0]._autocompOptions.listItems[1]._displayText, "2. Eye opening to pain - 2");
      assert.equal(lfData.items[0]._autocompOptions.listItems[2]._displayText, "3. Eye opening to verbal command - 3");
      assert.equal(lfData.items[0]._autocompOptions.listItems[3]._displayText, "4. Eyes open spontaneously - 4");
      done();
    });
  });

  it('should not display a score with answer text when displayScoreWithAnswerText is set to false', function(done) {
    $.get('test/data/lforms/glasgow.json', function(glasgow) {
      var lfData = new LForms.LFormsData(glasgow);
      lfData.setTemplateOptions({displayScoreWithAnswerText: false}) 
      setTimeout(()=>{ // without setTimeout, _displayText is still having the exitsting values
        assert.equal(lfData.name, "Glasgow coma scale (with score rules)");
        assert.equal(lfData.items[0]._autocompOptions.listItems[0]._displayText, "1. No eye opening");
        assert.equal(lfData.items[0]._autocompOptions.listItems[1]._displayText, "2. Eye opening to pain");
        assert.equal(lfData.items[0]._autocompOptions.listItems[2]._displayText, "3. Eye opening to verbal command");
        assert.equal(lfData.items[0]._autocompOptions.listItems[3]._displayText, "4. Eyes open spontaneously");
      }, 10)
      done();
    });
  });


  it('should display a score with answer text when displayScoreWithAnswerText is set to true', function(done) {
    $.get('test/data/lforms/glasgow.json', function(glasgow) {
      var lfData = new LForms.LFormsData(glasgow);
      lfData.setTemplateOptions({'displayScoreWithAnswerText': true})
      setTimeout(()=>{ // without setTimeout, _displayText is still having the exitsting values
        assert.equal(lfData.name, "Glasgow coma scale (with score rules)");
        assert.equal(lfData.items[0]._autocompOptions.listItems[0]._displayText, "1. No eye opening - 1");
        assert.equal(lfData.items[0]._autocompOptions.listItems[1]._displayText, "2. Eye opening to pain - 2");
        assert.equal(lfData.items[0]._autocompOptions.listItems[2]._displayText, "3. Eye opening to verbal command - 3");
        assert.equal(lfData.items[0]._autocompOptions.listItems[3]._displayText, "4. Eyes open spontaneously - 4");
      }, 10)
      done();
    });
  });


  it('should NOT display a score with answer text when displayScoreWithAnswerText is set to true then is set to false', function(done) {
    $.get('test/data/lforms/glasgow.json', function(glasgow) {
      var lfData = new LForms.LFormsData(glasgow);
      lfData.setTemplateOptions({'displayScoreWithAnswerText': true})
      setTimeout(()=>{ // without setTimeout, _displayText is still having the exitsting values
        assert.equal(lfData.name, "Glasgow coma scale (with score rules)");
        assert.equal(lfData.items[0]._autocompOptions.listItems[0]._displayText, "1. No eye opening - 1");
        assert.equal(lfData.items[0]._autocompOptions.listItems[1]._displayText, "2. Eye opening to pain - 2");
        assert.equal(lfData.items[0]._autocompOptions.listItems[2]._displayText, "3. Eye opening to verbal command - 3");
        assert.equal(lfData.items[0]._autocompOptions.listItems[3]._displayText, "4. Eyes open spontaneously - 4");
      }, 10)

      lfData.setTemplateOptions({displayScoreWithAnswerText: false})
      setTimeout(()=>{ // without setTimeout, _displayText is still having the exitsting values
        assert.equal(lfData.name, "Glasgow coma scale (with score rules)");
        assert.equal(lfData.items[0]._autocompOptions.listItems[0]._displayText, "1. No eye opening");
        assert.equal(lfData.items[0]._autocompOptions.listItems[1]._displayText, "2. Eye opening to pain");
        assert.equal(lfData.items[0]._autocompOptions.listItems[2]._displayText, "3. Eye opening to verbal command");
        assert.equal(lfData.items[0]._autocompOptions.listItems[3]._displayText, "4. Eyes open spontaneously");
      }, 10)
      done();
    });
  });
});

