var po = require('./buildTest.po');
describe('build test page', function() {
  it('should have a drug name field that autocompletes', function() {
    po.openPage();
    expect(po.drugNameField.isDisplayed()).toBeTruthy();
    po.drugNameField.sendKeys('ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, 5000);
  });


  fit('should have loaded image resources', function() {
    // Borrowing code from http://stackoverflow.com/a/28343848/360782
    // Unfortunately this code only checks the loading of image tags, not
    // background images.  I'm not sure how to check those have loaded.
    // Also, the only img tags we have at present are blank with a background
    // image so this test is quite pointless.
    po.openPage();
    browser.executeAsyncScript(function (callback) {
      var imgs = document.getElementsByTagName('img'),
          loaded = 0;
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].naturalWidth > 0) {
          loaded = loaded + 1;
        }
      };
      callback(imgs.length - loaded);
    }).then(function (brokenImagesCount) {
      expect(brokenImagesCount).toBe(0);
    });
  });
});
