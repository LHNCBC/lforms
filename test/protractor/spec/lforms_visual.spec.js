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


describe('Change Obx table columns ', function() {

  it('should be able to dynamically obx table columns names and displayControl', function () {

    var unitsCol = element(by.id("th_Units"));
    var nameCol = element(by.id("th_Name"));
    var valueCol = element(by.id("th_Value"));
    var valuesCol = element(by.id("th_Values"));

    var comment =element(by.id("comment"));
    var timeDone =element(by.id("time_done"));

    tp.openFullFeaturedForm();

    // units column is shown
    expect(unitsCol.isDisplayed()).toBe(true);
    expect(nameCol.isDisplayed()).toBe(true);
    expect(valueCol.isDisplayed()).toBe(true);
    // change the "value" to "values"
    element(by.id("change-columns")).click();
    expect(unitsCol.isDisplayed()).toBe(true);
    expect(nameCol.isDisplayed()).toBe(true);
    expect(valuesCol.isDisplayed()).toBe(true);
    expect(valueCol.isPresent()).toBe(false);

    // obr has only two fields
    expect(comment.isPresent()).toBe(false);
    expect(timeDone.isPresent()).toBe(false);
  });

});
