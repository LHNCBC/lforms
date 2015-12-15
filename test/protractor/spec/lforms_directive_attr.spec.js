var tp = require('./lforms_testpage.po.js');

/**
 *
 * @param {integer} count Number of elements to assert.
 * @param {boolean} hidden True asserts for hidden
 * @returns {Void}
 */
function assertHiddenCheckboxes(count, hidden) {

  expect(tp.checkboxesFinder.count()).toEqual(count);
  for(var i=0; i < count; i++) {
    if(hidden) {
      expect(tp.checkboxesFinder.get(i).isDisplayed()).toBeFalsy();
    }
    else {
      expect(tp.checkboxesFinder.get(i).isDisplayed()).toBeTruthy();
    }
  }
}


/**
 * Assert header presence or absence
 *
 * @param {boolean} isPresent - Assert for presence or absence
 */
function assertHeader(isPresent) {
  if(isPresent) {
    expect(tp.headerEl.isDisplayed()).toBeTruthy();
  }
  else {
    expect(tp.headerEl.isPresent()).toBeFalsy();
  }
}


describe('<lforms> hide-check-boxes attribute', function() {
  it('default should show check boxes on the vertical panel ', function() {
    tp.openDirectiveAttrTest('');
    assertHiddenCheckboxes(3, false);
  });
  it('default should show check boxes on the horizontal panel ', function() {
    tp.openDirectiveAttrTest('#/horizontal-form-default');
    assertHiddenCheckboxes(3, false);
  });
  it('true should hide check boxes on the vertical panel', function() {
    tp.openDirectiveAttrTest('#/vertical-form-hide-check-boxes-true');
    assertHiddenCheckboxes(3, true);
  });
  it('true should hide check boxes on the horizontal panel', function() {
    tp.openDirectiveAttrTest('#/horizontal-form-hide-check-boxes-true');
    assertHiddenCheckboxes(3, true);
  });
  it('false should show check boxes on the vertical panel', function() {
    tp.openDirectiveAttrTest('#/vertical-form-hide-check-boxes-false');
    assertHiddenCheckboxes(3, false);
  });
  it('false should show check boxes on the horizontal panel', function() {
    tp.openDirectiveAttrTest('#/horizontal-form-hide-check-boxes-false');
    assertHiddenCheckboxes(3, false);
  });
  it('false should show header on the vertical panel', function() {
    tp.openDirectiveAttrTest('#/vertical-form-hide-header-false');
    assertHeader(true);
  });
  it('false should show header on the horizontal panel', function() {
    tp.openDirectiveAttrTest('#/horizontal-form-hide-header-false');
    assertHeader(true);
  });
  it('false should hide header on the vertical panel', function() {
    tp.openDirectiveAttrTest('#/vertical-form-hide-header-true');
    assertHeader(false);
  });
  it('false should show header on the horizontal panel', function() {
    tp.openDirectiveAttrTest('#/horizontal-form-hide-header-true');
    assertHeader(false);
  });
});

