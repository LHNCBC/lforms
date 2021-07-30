import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';



describe('formdata: ', function() {

  let tp: TestPage; 
  let ff: any;
  let LForms: any = (global as any).LForms;

  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
    tp = new TestPage();
    ff = tp.USSGFHTVertical;
    //await tp.navigateTo();
  });

  describe('get form data', function() {

    it('should get a form data with 3 optional parameters.', function() {
      

      tp.LoadForm.openUSSGFHTVertical();

      // #1 all fields are empty
      browser.driver.executeAsyncScript(function() {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getUserData();
        callback(fData);
      }).then(function(formData:any) {
        // console.log(JSON.stringify(formData, null, 2));
        expect(formData.itemsData.length).toBe(2);
        expect(formData.itemsData[0].items.length).toBe(13);
        expect(formData.itemsData[0].items[0].value).toBe(undefined); // name
        expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(10); // name
        // NEXT: comments, whereDone, whenDone are removed.
        // // #2 above fields have values, except dob is still empty
        // TestUtil.sendKeys(ff.comment, "Some comments");
        // ff.whereDone.click()
        // // pick the 2nd item, Hospital
        // ff.whereDone.sendKeys(protractor.Key.ARROW_DOWN);
        // ff.whereDone.sendKeys(protractor.Key.ARROW_DOWN);
        // ff.whereDone.sendKeys(protractor.Key.TAB);

        TestUtil.sendKeys(ff.name, "Not Empty");

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

        // NEXT:TODO: formula not working
        TestUtil.sendKeys(ff.height, "70");
        // expect(ff.bmi.getAttribute('value')).toBe("");
        TestUtil.sendKeys(ff.weight, "170");
        // expect(ff.bmi.getAttribute('value')).toBe("24.39");

        browser.driver.executeAsyncScript(function () {
          var callback = arguments[arguments.length - 1];
          var fData = LForms.Util.getUserData();
          callback(fData);
        }).then(function (formData:any) {
          // NEXT: comments, whereDone, whenDone are removed.
          // expect(formData.templateData.length).toBe(4);
          // expect(formData.templateData[2].value).toEqual({ code: '2', text: 'Hospital' })
          // expect(formData.templateData[3].value).toBe("Some comments");

          expect(formData.itemsData.length).toBe(2);
          expect(formData.itemsData[0].items.length).toBe(13);
          expect(formData.itemsData[0].items[0].value).toBe("Not Empty"); // name
          expect(Object.keys(formData.itemsData[0].items[0]).length).toBe(11); // name
          expect(formData.itemsData[0].items[1].value.text).toBe("Male"); // gender
          expect(formData.itemsData[0].items[2].value).toBe(undefined); // dob
          expect(formData.itemsData[0].items[6].value).toBe(70); // height
          expect(formData.itemsData[0].items[8].value).toBe(170); // weight
          // NEXT:TODO: formula not working
          //expect(formData.itemsData[0].items[9].value).toBe("24.39"); // bmi
          expect(formData.itemsData[0].items[10].value.length).toBe(2); // race
          expect(formData.itemsData[0].items[10].value[0].text).toBe("American Indian or Alaska Native");
          expect(formData.itemsData[0].items[10].value[1].text).toBe("Asian");

          //#3 test parameters noFormDefData
          browser.driver.executeAsyncScript(function () {
            var callback = arguments[arguments.length - 1];
            var fData = LForms.Util.getUserData(null, true);
            callback(fData);
          }).then(function (formData:any) {
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
            }).then(function (formData:any) {
              expect(formData.itemsData.length).toBe(1);
              expect(formData.itemsData[0].items.length).toBe(6);

              //#5 test parameters noHiddenItem
              browser.driver.executeAsyncScript(function () {
                var callback = arguments[arguments.length - 1];
                var fData = LForms.Util.getUserData(null, false, false, true);
                callback(fData);
              }).then(function (formData:any) {
                expect(formData.itemsData.length).toBe(2);
                expect(formData.itemsData[0].items.length).toBe(11);
              });
            });
          });
        });
      });
    });

    // NEXT: no more directives
    // it('should be able to get data when LForms directive is used', function() {
    //   tp.openDirectiveTest();

    //   browser.waitForAngular();
    //   browser.driver.executeAsyncScript(function() {
    //     var callback = arguments[arguments.length - 1];
    //     var fData = LForms.Util.getUserData();
    //     callback(fData);
    //   }).then(function(formData:any) {
    //     // console.log(formData);
    //     expect(formData.itemsData.length).toBe(2);
    //     expect(formData.itemsData[0].items.length).toBe(13);
    //   });
    // });

    it('should assign a boolean value for type BL fields', function (done) {
      tp.LoadForm.openFullFeaturedForm();
      function checkBoolFieldVal(val, done=null) {
        browser.driver.executeScript(function() {
           return LForms.Util.getUserData();
        }).then(function(lfData:any) {
          let boolQuestion = lfData.itemsData[5];
          expect(boolQuestion.dataType).toBe('BL');
          expect(boolQuestion.value).toBe(val);
          if (done)
            done();
        });
      }
      checkBoolFieldVal(undefined);
      tp.FullFeaturedForm.booleanField.click();
      checkBoolFieldVal(true);
      tp.FullFeaturedForm.booleanField.click();
      checkBoolFieldVal(false, done);
    });


    it('should be able to get the complete form definition data and reset the form with the retrieved data', function() {
      tp.LoadForm.openUSSGFHTVertical();

      var resetButton = element(by.id('reset-form-with-same-data'));
      //TestUtil.sendKeys(ff.comment, "Some comments");
      TestUtil.sendKeys(ff.name, "Not Empty");

      // pick the 1st item, centimeters
      ff.gender.sendKeys(protractor.Key.ARROW_DOWN);
      ff.gender.sendKeys(protractor.Key.TAB);
      TestUtil.waitForElementDisplayed(ff.name)
      expect(TestUtil.getFieldValue(ff.gender)).toBe("Male")
      // NEXT:TODO: formula not working
      TestUtil.sendKeys(ff.height, "70");
      expect(TestUtil.getFieldValue(ff.height)).toBe("70");      
      TestUtil.sendKeys(ff.weight, "170");
      //expect(ff.bmi.getAttribute('value')).toBe("24.39");

      // check the data directly
      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getFormData();
        callback(fData);
      }).then(function (formData:any) {
        expect(formData.code).toBe("54127-6N");
        expect(formData.name).toBe("USSG-FHT, (with mock-up items for skip logic demo)");
        expect(formData.template).toBe("table");
        expect(formData.templateOptions.showFormHeader).toBe(true);
        expect(formData.templateOptions.showQuestionCode).toBe(false);
        expect(formData.items[0].question).toBe("Your health information");
        expect(formData.items[0].questionCode).toBe("54126-8");
        expect(formData.items[0].header).toBe(true);
        expect(formData.items[0].items.length).toBe(13);
        expect(formData.items[0].items[0].dataType).toBe("TX");
        expect(formData.items[0].items[0].question).toBe("Name");
        expect(formData.items[0].items[0].questionCode).toBe("54125-0");
        expect(formData.items[0].items[0].value).toBe("Not Empty");
        expect(formData.items[0].items[1].value.code).toBe("LA2-8");
        expect(formData.items[0].items[1].value.text).toBe("Male");
        expect(formData.items[0].items[6].value).toBe(70);
        expect(formData.items[0].items[6].unit.name).toBe("inches");
        expect(formData.items[0].items[8].value).toBe(170);
        expect(formData.items[0].items[8].unit.name).toBe("lbs");
        // NEXT:TODO: formula not working
        expect(formData.items[0].items[9].value).toBe("24.39");
        expect(formData.items[1].items.length).toBe(9);
      });

      // reset the form
      resetButton.click();

      //expect(ff.comment.getAttribute('value')).toBe("Some comments");
      // changed in reset function to be 'after reset', was 'Not Empty'
      expect(TestUtil.getFieldValue(ff.name)).toBe("after reset");
      expect(TestUtil.getFieldValue(ff.gender)).toBe("Male");
      expect(TestUtil.getFieldValue(ff.height)).toBe("70");
      expect(TestUtil.getFieldValue(ff.weight)).toBe("170");
      // NEXT:TODO: formula not working
      //expect(ff.bmi.getAttribute('value')).toBe("24.39");

      // check the data again, directly
      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getFormData();
        callback(fData);
      }).then(function (formData:any) {
        expect(formData.code).toBe("54127-6N");
        expect(formData.name).toBe("USSG-FHT, (with mock-up items for skip logic demo)");
        expect(formData.template).toBe("table");
        expect(formData.templateOptions.showFormHeader).toBe(true);
        expect(formData.templateOptions.showQuestionCode).toBe(false);
        expect(formData.items[0].question).toBe("Your health information");
        expect(formData.items[0].questionCode).toBe("54126-8");
        expect(formData.items[0].header).toBe(true);
        expect(formData.items[0].items.length).toBe(13);
        expect(formData.items[0].items[0].dataType).toBe("TX");
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
      tp.LoadForm.openFullFeaturedForm();

      // only three fields have data
      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        var fData = LForms.Util.getFormData(null, true, true);
        callback(fData);
      }).then(function (formData:any) {
        expect(formData.items.length).toBe(5);
        expect(formData.items[2].question).toBe("With data type CNE");
        expect(formData.items[2].value).toEqual({code:"c2",other:null,text:"Answer 2"});
      });
    });
    
  });

  describe('defaultAnswer', function() {
    it('should work for various data types', function() {
      tp.LoadForm.openDefaultAnswerForm();
      var blField = element(by.id('/blField/1'));
      browser.wait(ExpectedConditions.presenceOf(blField), 5000);
      //NEXT: ng-switch not a checkbox
      //expect(blField.isSelected()).toBe(true);
      //NEXT: no longer an angular app
      // blField.evaluate('item.value').then(function(val) {
      //   expect(val).toEqual(true);
      // });

      var intField = element(by.id('/intField/1'));
      expect(TestUtil.getFieldValue(intField)).toBe("24");      
      expect(TestUtil.getFieldValue(element(by.id('/decField/1')))).toBe("3.14159");
      expect(TestUtil.getFieldValue(element(by.id('/strField/1')))).toBe("Green");

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
      //expect(TestUtil.getFieldValue(element(by.css('#/dateField/1 input')))).toEqual(today);

      expect(TestUtil.getFieldValue(element(by.id('/ansLabelDefault/1')))).toEqual('ii. Blue');
      expect(TestUtil.getFieldValue(element(by.id('/ansCodeDefault/1')))).toEqual('ii. Blue');
      expect(TestUtil.getFieldValue(element(by.id('/ansCodeDefaultNoLabel/1')))).toEqual('Blue');

      // Check a radio button question
      var radioQCode = '#\\/radioAnsCodeDefault\\/1';
      var rr = element(by.css(radioQCode + "R input"));
      var rb = element(by.css(radioQCode + "B input"));
      var rg = element(by.css(radioQCode + "G input"));
      expect(TestUtil.getAttribute(rr, 'checked')).toBe(false);
      expect(TestUtil.getAttribute(rb, 'checked')).toBe(true);
      expect(TestUtil.getAttribute(rg, 'checked')).toBe(false);
      //NEXT: not an angular app
      // element(by.id(radioQCode+'R')).evaluate('item.value').then(function(val) {
      //   expect(val.code).toEqual('B');
      //   expect(val.text).toEqual('Blue');
      //   expect(val._displayText).toEqual('ii. Blue');
      // });

      // Check a radio button question whose answers do not have labels
      var radioQCodeNL = '#\\/radioAnsCodeDefaultNoLabel\\/1';
      var rr = element(by.css(radioQCodeNL + "R input"));
      var rb = element(by.css(radioQCodeNL + "B input"));
      var rg = element(by.css(radioQCodeNL + "G input"));
      expect(TestUtil.getAttribute(rr, 'checked')).toBe(false);
      expect(TestUtil.getAttribute(rb, 'checked')).toBe(true);
      expect(TestUtil.getAttribute(rg, 'checked')).toBe(false);

      //NEXT: not an angular app
      // element(by.id(radioQCodeNL+'R')).evaluate('item.value').then(function(val) {
      //   expect(val.code).toEqual('B');
      //   expect(val.text).toEqual('Blue');
      //   expect(val._displayText).toEqual('Blue');
      // });

      // Test a check box question
      var cbQCode = '#\\/checkBoxAnsCodeDefault\\/1';
      var cr = element(by.css(cbQCode + "R input"));
      var cb = element(by.css(cbQCode + "B input"));
      var cg = element(by.css(cbQCode + "G input"));
      expect(TestUtil.getAttribute(cr, 'checked')).toBe(false);
      expect(TestUtil.getAttribute(cb, 'checked')).toBe(true);
      expect(TestUtil.getAttribute(cg, 'checked')).toBe(false);
      //NEXT: not an angular app
      // element(by.id(cbQCode+'R')).evaluate('item.value').then(function(val) {
      //   expect(val[0].code).toEqual('B');
      //   expect(val[0].text).toEqual('Blue');
      //   expect(val[0]._displayText).toEqual('ii. Blue');
      // });

      // Check a multi-select list
      var multiSelID = '/multiSelAnsCodeDefault/1';
      var multiSel = element(by.id(multiSelID));
      //NEXT: not an angular app
      // multiSel.evaluate('item.value').then(function(value) {
      //   expect(value.length).toBe(1);
      //   expect(value[0].text).toEqual('Blue');
      //   expect(value[0].code).toEqual('B');
      //   expect(value[0]._displayText).toEqual('ii. Blue');
      // });
      expect(TestUtil.getFieldValue(multiSel)).toEqual('');
      var escapedID = multiSelID.replace( /\//g, "\\\\/" );
      browser.executeScript('return $("#'+escapedID+'")[0].autocomp.getSelectedCodes()'
       ).then(function(codes:any) {
        expect(codes.length).toBe(1);
        expect(codes[0]).toEqual('B');
      });
      browser.executeScript('return $("#'+escapedID+'")[0].autocomp.getSelectedItems()'
       ).then(function(items:any) {
        expect(items.length).toBe(1);
        expect(items[0]).toEqual('ii. Blue');
      });

      // Also test specifying by answer text, to preserve the current behavior,
      // even though that is not in the LHC-Forms form specification.
      expect(TestUtil.getFieldValue(element(by.id('/ansTextDefault/1')))).toEqual('Blue');

      // Also test the date field default in the templateOptions, to make sure
      // those are getting processed.
      //NEXT: on templateOption fields
      //expect(element(by.id('date_done')).getAttribute('value')).toEqual(today);
    });


    it('should not be reset after they are cleared', function() {
      tp.LoadForm.openDefaultAnswerForm();
      var intField = element(by.id('/intField/1')),
          //whenDone = element(by.id('date_done')),
          decField = element(by.id('/decField/1')),
          strField = element(by.id('/strField/1')),
          listField = element(by.id('/ansCodeDefault/1')),
          btnAddStringField = element(by.id('add-/strField/1'));

      //whenDone.clear();
      intField.clear();
      decField.clear();
      strField.clear();
      listField.clear();

      btnAddStringField.click();

      //expect(whenDone.getAttribute('value')).toBe("");
      expect(TestUtil.getFieldValue(intField)).toBe("");
      expect(TestUtil.getFieldValue(decField)).toBe("");
      expect(TestUtil.getFieldValue(strField)).toBe("");
      expect(TestUtil.getFieldValue(listField)).toBe("");
    });

  });

  describe('lists with headings', function() {
    it('should style the heading items', function() {
      tp.LoadForm.openFullFeaturedForm();
      var listField = element(by.id('/listWHeaders/1'));
      listField.click();
      expect(tp.Autocomp.searchResult(1).getAttribute('class')).toEqual('heading');
    });
  });

  describe('item.prefix', function() {

    it('should be displayed', function () {
      tp.LoadForm.openFullFeaturedForm();
      browser.wait(function () {
        return element(by.id('/type0/1')).isPresent();
      }, tp.WAIT_TIMEOUT_1);

      expect(element(by.id("label-/with_prefix/1")).getText()).toBe("Prefix A:Question display text");
      expect(element(by.id("col/horizontalTable/colA/1/1")).getText()).toBe("Pre. A:A ST");
    });
  });

  
});
