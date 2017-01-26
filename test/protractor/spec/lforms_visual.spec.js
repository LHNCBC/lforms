var tp = require('./lforms_testpage.po.js');

// Units columns
describe('Hiding and showing Units column ', function() {

  it('should be able to dynamically hide and show Units column in the table template', function () {

    var unitsCol = element(by.id("th_Units"));
    tp.openFullFeaturedForm();

    // units column is shown
    expect(unitsCol.isDisplayed()).toBe(true);
    // hide the units column
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isPresent()).toBe(false);
    // show it again
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isDisplayed()).toBe(true);

    // open another form
    tp.openFormWithUserData();
    // units column is shown
    expect(unitsCol.isDisplayed()).toBe(true);
    // hide the units column
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isPresent()).toBe(false);
    // show it again
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isDisplayed()).toBe(true);
 });
});


describe('Change Obr table columns ', function() {

  it('should be able to dynamically obr table columns', function () {

    tp.openFullFeaturedForm();
    var comment =element(by.id("comment"));
    var timeDone =element(by.id("time_done"));
    var dateDone =element(by.id("date_done"));
    var whereDone =element(by.id("where_done"));

    expect(comment.isDisplayed()).toBe(true);
    expect(timeDone.isDisplayed()).toBe(true);
    expect(dateDone.isDisplayed()).toBe(true);
    expect(whereDone.isDisplayed()).toBe(true);

    element(by.id("change-columns")).click();

    // obr has only two fields
    expect(comment.isPresent()).toBe(false);
    expect(timeDone.isPresent()).toBe(false);
    expect(dateDone.isDisplayed()).toBe(true);
    expect(whereDone.isDisplayed()).toBe(true);
  });

});

describe('Links on question codes', function() {

  it('should show a link on LOINC typed question code and no links for non-LOINC typed question codes.', function () {
    tp.openFullFeaturedForm();
    browser.wait(function() {
      return element(by.id('/type0/1')).isPresent();
    }, 5000);

    var codeCheckbox = tp.checkboxesFinder.get(0);
    codeCheckbox.click();

    var titleCode = element(by.css(".lf-form-title .lf-item-code span"));
    var titleCodeLink = element(by.css(".lf-form-title .lf-item-code a"));
    expect(titleCode.getText()).toBe("[all-in-one]");
    // form's code should not have a link
    expect(titleCodeLink.isPresent()).toBe(false);

    var itemCodeLink0 = element.all(by.css(".lf-de-label .lf-item-code a")).get(0);
    // the first question's code should have a link
    expect(itemCodeLink0.getText()).toBe("[type0]");
    var itemCode1 = element.all(by.css(".lf-de-label .lf-item-code span")).get(0);
    // the second question's code should not have a link
    expect(itemCode1.getText()).toBe("[type1]");
  });

});
