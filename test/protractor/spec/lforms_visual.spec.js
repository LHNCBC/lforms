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
