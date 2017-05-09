var tp = require('./lforms_testpage.po.js');
var ff = tp.USSGFHTVertical;
describe('get form data', function() {

  it('should get a form data with 3 optional parameters.', function() {

    tp.openUSSGFHTVertical();

    // #1 all fields are empty
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData) {
      // console.log(formData);
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(13);
      expect(formData.itemsData[0].items[0].value).toBe(undefined); // name
      expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(9); // name
      // #2 above fields have values, except dob is still empty
      ff.comment.sendKeys("Some comments");
      ff.name.sendKeys("Not Empty");

      ff.gender.click();
      // pick the 1st item, centimeters
      ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
      ff.gender.sendKeys(protractor.Key.TAB);

      ff.race.click();
      // pick the first 2 items, centimeters
      ff.race.sendKeys(protractor.Key.ARROW_DOWN);
      ff.race.sendKeys(protractor.Key.TAB);
      ff.race.click();
      ff.race.sendKeys(protractor.Key.ARROW_DOWN);
      ff.race.sendKeys(protractor.Key.TAB);

      ff.height.sendKeys("70");
      expect(ff.bmi.getAttribute('value')).toBe("");
      ff.weight.sendKeys("170");
      expect(ff.bmi.getAttribute('value')).toBe("24.39");

      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getUserData();
        callback(fData);
      }).then(function (formData) {
        expect(formData.templateData.length).toBe(4);
        expect(formData.templateData[3].value).toBe("Some comments");

        expect(formData.itemsData.length).toBe(2);
        expect(formData.itemsData[0].items.length).toBe(13);
        expect(formData.itemsData[0].items[0].value).toBe("Not Empty"); // name
        expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(10); // name
        expect(formData.itemsData[0].items[1].value.text).toBe("Male"); // gender
        expect(formData.itemsData[0].items[2].value).toBe(undefined); // dob
        expect(formData.itemsData[0].items[6].value).toBe(70); // height
        expect(formData.itemsData[0].items[8].value).toBe(170); // weight
        expect(formData.itemsData[0].items[9].value).toBe("24.39"); // bmi
        expect(formData.itemsData[0].items[10].value.length).toBe(2); // race
        expect(formData.itemsData[0].items[10].value[0].text).toBe("American Indian or Alaska Native");
        expect(formData.itemsData[0].items[10].value[1].text).toBe("Asian");

        //#3 test parameters noFormDefData
        browser.driver.executeAsyncScript(function () {
          var callback = arguments[arguments.length - 1];
          var fData = LForms.Util.getUserData(null, true);
          callback(fData);
        }).then(function (formData) {
          expect(formData.itemsData.length).toBe(2);
          expect(formData.itemsData[0].items.length).toBe(13);
          expect(formData.itemsData[0].items[0].question).toBeUndefined();
          expect(formData.itemsData[0].items[0].dataType).toBeUndefined();
          expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(2); // name
          //#4 test parameters noEmptyValue
          browser.driver.executeAsyncScript(function () {
            var callback = arguments[arguments.length - 1];
            var fData = LForms.Util.getUserData(null, false, true);
            callback(fData);
          }).then(function (formData) {
            expect(formData.itemsData.length).toBe(1);
            expect(formData.itemsData[0].items.length).toBe(6);

            //#5 test parameters noHiddenItem
            browser.driver.executeAsyncScript(function () {
              var callback = arguments[arguments.length - 1];
              var fData = LForms.Util.getUserData(null, false, false, true);
              callback(fData);
            }).then(function (formData) {
              expect(formData.itemsData.length).toBe(2);
              expect(formData.itemsData[0].items.length).toBe(11);
            });
          });
        });
      });
    });
  });

  it('should be able to get data when LForms directive is used', function() {
    tp.openDirectiveTest();

    browser.waitForAngular();
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getUserData();
      callback(fData);
    }).then(function(formData) {
      // console.log(formData);
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(13);
    });
  });


  it('should be able to get the complete form definition data and reset the form with the retrieved data', function() {
    tp.openUSSGFHTVertical();

    var resetButton = element(by.id('reset-form-with-same-data'));
    ff.comment.sendKeys("Some comments");
    ff.name.sendKeys("Not Empty");

    // pick the 1st item, centimeters
    ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
    ff.gender.sendKeys(protractor.Key.TAB);
    expect(ff.gender.getAttribute('value')).toBe("Male");

    ff.height.sendKeys("70");
    expect(ff.bmi.getAttribute('value')).toBe("");
    ff.weight.sendKeys("170");
    expect(ff.bmi.getAttribute('value')).toBe("24.39");

    // check the data directly
    browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getFormData();
      callback(fData);
    }).then(function (formData) {
      expect(formData.code).toBe("54127-6N");
      expect(formData.name).toBe("USSG-FHT, (with mock-up items for skip logic demo)");
      expect(formData.template).toBe("table");
      expect(formData.type).toBe("LOINC");
      expect(formData.templateOptions.showFormHeader).toBe(true);
      expect(formData.templateOptions.showQuestionCode).toBe(false);
      expect(formData.items[0].question).toBe("Your health information");
      expect(formData.items[0].questionCode).toBe("54126-8");
      expect(formData.items[0].header).toBe(true);
      expect(formData.items[0].items.length).toBe(13);
      expect(formData.items[0].items[0].dataType).toBe("ST");
      expect(formData.items[0].items[0].question).toBe("Name");
      expect(formData.items[0].items[0].questionCode).toBe("54125-0");
      expect(formData.items[0].items[0].value).toBe("Not Empty");
      expect(formData.items[0].items[1].value.code).toBe("LA2-8");
      expect(formData.items[0].items[1].value.text).toBe("Male");
      expect(formData.items[0].items[6].value).toBe(70);
      expect(formData.items[0].items[6].unit.name).toBe("inches");
      expect(formData.items[0].items[8].value).toBe(170);
      expect(formData.items[0].items[8].unit.name).toBe("lbs");
      expect(formData.items[0].items[9].value).toBe("24.39");
      expect(formData.items[1].items.length).toBe(9);
    });

    // reset the form
    resetButton.click();

    expect(ff.comment.getAttribute('value')).toBe("Some comments");
    // changed in reset function to be 'after reset', was 'Not Empty'
    expect(ff.name.getAttribute('value')).toBe("after reset");
    expect(ff.gender.getAttribute('value')).toBe("Male");
    expect(ff.height.getAttribute('value')).toBe("70");
    expect(ff.weight.getAttribute('value')).toBe("170");
    expect(ff.bmi.getAttribute('value')).toBe("24.39");

    // check the data again, directly
    browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getFormData();
      callback(fData);
    }).then(function (formData) {
      expect(formData.code).toBe("54127-6N");
      expect(formData.name).toBe("USSG-FHT, (with mock-up items for skip logic demo)");
      expect(formData.template).toBe("table");
      expect(formData.type).toBe("LOINC");
      expect(formData.templateOptions.showFormHeader).toBe(true);
      expect(formData.templateOptions.showQuestionCode).toBe(false);
      expect(formData.items[0].question).toBe("Your health information");
      expect(formData.items[0].questionCode).toBe("54126-8");
      expect(formData.items[0].header).toBe(true);
      expect(formData.items[0].items.length).toBe(13);
      expect(formData.items[0].items[0].dataType).toBe("ST");
      expect(formData.items[0].items[0].question).toBe("Name");
      expect(formData.items[0].items[0].questionCode).toBe("54125-0");
      expect(formData.items[0].items[0].value).toBe("after reset");
      expect(formData.items[0].items[1].value.code).toBe("LA2-8");
      expect(formData.items[0].items[1].value.text).toBe("Male");
      expect(formData.items[0].items[6].value).toBe(70);
      expect(formData.items[0].items[6].unit.name).toBe("inches");
      expect(formData.items[0].items[8].value).toBe(170);
      expect(formData.items[0].items[8].unit.name).toBe("lbs");
      expect(formData.items[0].items[9].value).toBe("24.39");
      expect(formData.items[1].items.length).toBe(9);
    });

  });

  it('should not get any data with empty values when the noEmptyValue parameter is used', function() {
    tp.openFullFeaturedForm();

    // only one field has data
    browser.driver.executeAsyncScript(function () {
      var callback = arguments[arguments.length - 1];
      var fData = LForms.Util.getFormData(null, true, true);
      callback(fData);
    }).then(function (formData) {
      // console.log(formData);
      expect(formData.items.length).toBe(1);
      expect(formData.items[0].question).toBe("With data type CNE");
      expect(formData.items[0].value).toEqual({code:"c2",other:null,text:"Answer 2"});
    });
  });
});


describe('defaultAnswer', function() {
  it('should work for various data types', function() {
    tp.openDefaultAnswerForm();
    var intField = element(by.id('/intField/1'));
    expect(intField.getAttribute('value')).toBe("24");
    expect(element(by.id('/decField/1')).getAttribute('value')).toBe("3.14159");
    expect(element(by.id('/strField/1')).getAttribute('value')).toBe("Green");

    // Test date field default (with value of "t" -- today)
    var now = new Date();
    /**
     *  Returns a string version of the given number, zero padded on the left to
     *  be at least two characters.
     */
    function zeroPad(num) {
      var rtn = "" + num;
      if (rtn.length === 1)
        rtn = "0" + rtn;
      return rtn;
    }
    var today = zeroPad(now.getMonth()+1) + "/" + zeroPad(now.getDate()) +
      "/" + now.getFullYear();
    expect(element(by.id('/dateField/1')).getAttribute('value')).toEqual(today);

    expect(element(by.id('/ansLabelDefault/1')).getAttribute('value')).toEqual('ii. Blue');
    expect(element(by.id('/ansCodeDefault/1')).getAttribute('value')).toEqual('ii. Blue');
    expect(element(by.id('/ansCodeDefaultNoLabel/1')).getAttribute('value')).toEqual('Blue');

    // Check a radio button question
    var radioQCode = '/radioAnsCodeDefault/1';
    expect(element(by.id(radioQCode+'R')).isSelected()).toBe(false);
    expect(element(by.id(radioQCode+'B')).isSelected()).toBe(true);
    expect(element(by.id(radioQCode+'G')).isSelected()).toBe(false);
    element(by.id(radioQCode+'R')).evaluate('item.value').then(function(val) {
      expect(val.code).toEqual('B');
      expect(val.text).toEqual('ii. Blue');
    });

    // Check a radio button question whose answers do not have labels
    var radioQCodeNL = '/radioAnsCodeDefaultNoLabel/1';
    expect(element(by.id(radioQCodeNL+'R')).isSelected()).toBe(false);
    expect(element(by.id(radioQCodeNL+'B')).isSelected()).toBe(true);
    expect(element(by.id(radioQCodeNL+'G')).isSelected()).toBe(false);
    element(by.id(radioQCodeNL+'R')).evaluate('item.value').then(function(val) {
      expect(val.code).toEqual('B');
      expect(val.text).toEqual('Blue');
    });

    // Test a check box question
    var cbQCode = '/checkBoxAnsCodeDefault/1';
    expect(element(by.id(cbQCode+'R')).isSelected()).toBe(false);
    expect(element(by.id(cbQCode+'B')).isSelected()).toBe(true);
    expect(element(by.id(cbQCode+'G')).isSelected()).toBe(false);
    element(by.id(cbQCode+'R')).evaluate('item.value').then(function(val) {
      expect(val[0].code).toEqual('B');
      expect(val[0].text).toEqual('ii. Blue');
    });

    // Check a multi-select list
    var multiSelID = '/multiSelAnsCodeDefault/1';
    var multiSel = element(by.id(multiSelID));
    multiSel.evaluate('item.value').then(function(value) {
      expect(value.length).toBe(1);
      expect(value[0].text).toEqual('ii. Blue');
      expect(value[0].code).toEqual('B');
    });
    expect(multiSel.getAttribute('value')).toEqual('');
    var escapedID = multiSelID.replace( /\//g, "\\\\/" );
    browser.executeScript('return $("#'+escapedID+'")[0].autocomp.getSelectedCodes()'
     ).then(function(codes) {
      expect(codes.length).toBe(1);
      expect(codes[0]).toEqual('B');
    });
    browser.executeScript('return $("#'+escapedID+'")[0].autocomp.getSelectedItems()'
     ).then(function(items) {
      expect(items.length).toBe(1);
      expect(items[0]).toEqual('ii. Blue');
    });

    // Also test specifying by answer text, to preserve the current behavior,
    // even though that is not in the LHC-Forms form specification.
    expect(element(by.id('/ansTextDefault/1')).getAttribute('value')).toEqual('Blue');

    // Also test the date field default in the templateOptions, to make sure
    // those are getting processed.
    expect(element(by.id('date_done')).getAttribute('value')).toEqual(today);
  });
});

describe('lists with headings', function() {
  it('should style the heading items', function() {
    tp.openFullFeaturedForm();
    var listField = element(by.id('/listWHeaders/1'));
    listField.click();
    expect(tp.Autocomp.searchResult(1).getAttribute('class')).toEqual('heading');
  });
});
