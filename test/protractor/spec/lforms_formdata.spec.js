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
      expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(10); // name
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
        expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(11); // name
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
      expect(formData.templateOptions.obrHeader).toBe(true);
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
      expect(formData.templateOptions.obrHeader).toBe(true);
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


});
