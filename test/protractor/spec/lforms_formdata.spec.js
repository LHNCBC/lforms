dp = require('./demopage.po');
describe('get form data', function() {

  it('should get a form data with 3 optional parameters.', function() {

    dp.openUSSGFHTVertical();

    // #1 all fields are empty
    browser.driver.executeAsyncScript(function() {
      var callback = arguments[arguments.length - 1];
      var fData = WidgetUtil.getFormData();
      callback(fData);
    }).then(function(formData) {
      // console.log(formData);
      expect(formData.itemsData.length).toBe(2);
      expect(formData.itemsData[0].items.length).toBe(13);
      expect(formData.itemsData[0].items[0].value).toBe(undefined); // name
      expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(8); // name
      // #2 above fields have values, except dob is still empty
      dp.comment.sendKeys("Some comments");
      browser.waitForAngular();
      dp.name.sendKeys("Not Empty");
      browser.waitForAngular();

      dp.gender.click();
      browser.waitForAngular();
      // pick the 1st item, centimeters
      dp.gender.sendKeys(protractor.Key.ARROW_DOWN);
      dp.gender.sendKeys(protractor.Key.TAB);
      browser.waitForAngular();

      dp.race.click();
      browser.waitForAngular();
      // pick the first 2 items, centimeters
      dp.race.sendKeys(protractor.Key.ARROW_DOWN);
      dp.race.sendKeys(protractor.Key.TAB);
      dp.race.click();
      browser.waitForAngular();
      dp.race.sendKeys(protractor.Key.ARROW_DOWN);
      dp.race.sendKeys(protractor.Key.TAB);
      browser.waitForAngular();

      dp.height.sendKeys("70");
      browser.waitForAngular();
      expect(dp.bmi.getAttribute('value')).toBe("");
      dp.weight.sendKeys("170");
      browser.waitForAngular();
      expect(dp.bmi.getAttribute('value')).toBe("24.39");

      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var fData = WidgetUtil.getFormData();
        callback(fData);
      }).then(function (formData) {
        expect(formData.templateData.length).toBe(4);
        expect(formData.templateData[3].value).toBe("Some comments");

        expect(formData.itemsData.length).toBe(2);
        expect(formData.itemsData[0].items.length).toBe(13);
        expect(formData.itemsData[0].items[0].value).toBe("Not Empty"); // name
        expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(9); // name
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
          var fData = WidgetUtil.getFormData(null, true);
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
            var fData = WidgetUtil.getFormData(null, false, true);
            callback(fData);
          }).then(function (formData) {
            expect(formData.itemsData.length).toBe(2);
            expect(formData.itemsData[0].items.length).toBe(8);

            //#5 test parameters noHiddenItem
            browser.driver.executeAsyncScript(function () {
              var callback = arguments[arguments.length - 1];
              var fData = WidgetUtil.getFormData(null, false, false, true);
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

});
