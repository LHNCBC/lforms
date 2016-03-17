var tp = require('./lforms_testpage.po.js');

describe('Data Type', function() {

  var typeTitle = element(by.css("label[for='/titleHeader/1']"));

  it('TITLE row should appear', function () {
    tp.openFullFeaturedForm();
    expect(typeTitle.isDisplayed()).toBe(true);
  });

});

