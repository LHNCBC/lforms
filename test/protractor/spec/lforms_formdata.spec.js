describe('get form data', function() {
  var comment = element(by.id('obr_Comment')), // comment, template data
    name= element(by.id('/54126-8/54125-0/1/1')), // string
    gender= element(by.id('/54126-8/54131-8/1/1')), // answer
    race =  element(by.id('/54126-8/54134-2/1/1')), // multiple answers
    dob= element(by.id('/54126-8/21112-8/1/1')), // for empty value comparison
    height= element(by.id('/54126-8/8302-2/1/1')), // number
    weight = element(by.id('/54126-8/29463-7/1/1')), // number
    bmi = element(by.id('/54126-8/39156-5/1/1')); // formula


  it('should get a form data with 3 optional parameters.', function() {
    browser.get('http://0.0.0.0:9001/');
    var formSearch = element(by.css('#s2id_loinc_num1 a'));

    browser.wait(function() {
      return formSearch.isDisplayed();
    }, 10000);
    formSearch.click();
    element(by.css('.select2-result:nth-of-type(1)')).click();
    element(by.css('.btn')).click();

    browser.waitForAngular();

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
      comment.sendKeys("Some comments");
      browser.waitForAngular();
      name.sendKeys("Not Empty");
      browser.waitForAngular();

      gender.click();
      browser.waitForAngular();
      // pick the 1st item, centimeters
      gender.sendKeys(protractor.Key.ARROW_DOWN);
      gender.sendKeys(protractor.Key.TAB);
      browser.waitForAngular();

      race.click();
      browser.waitForAngular();
      // pick the first 2 items, centimeters
      race.sendKeys(protractor.Key.ARROW_DOWN);
      race.sendKeys(protractor.Key.TAB);
      race.click();
      browser.waitForAngular();
      race.sendKeys(protractor.Key.ARROW_DOWN);
      race.sendKeys(protractor.Key.TAB);
      browser.waitForAngular();

      height.sendKeys("70");
      browser.waitForAngular();
      expect(bmi.getAttribute('value')).toBe("");
      weight.sendKeys("170");
      browser.waitForAngular();
      expect(bmi.getAttribute('value')).toBe("24.39");

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
