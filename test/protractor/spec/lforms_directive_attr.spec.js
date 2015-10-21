
var test_url = 'http://0.0.0.0:9001/test/directiveAttrTest.html';

/**
 * 
 * @returns {WebElements} Return check boxes 
 */
function get_checkboxes() {
  return element.all(by.css('div.checkbox > label > input[type="checkbox"]'));
}

/**
 * 
 * @param {WebElements} checkboxes The list of check boxes
 * @param {integer} count Number of elements to assert.
 * @param {boolean} hidden True asserts for hidden 
 * @returns {Void}
 */
function assert_hidden_checkboxes(checkboxes, count, hidden) {
  expect(checkboxes.count()).toEqual(count);
  for(var i=0; i < count; i++) {
    if(hidden) {
      expect(checkboxes.get(i).isDisplayed()).toBeFalsy();
    }
    else {
      expect(checkboxes.get(i).isDisplayed()).toBeTruthy();
    }
  }
}


/**
 * Pick header element
 *
 * @returns {ElementArrayFinder|!ElementArrayFinder|ElementFinder|!webdriver.promise.Promise|*}
 */
function getHeader() {
  return element.all(by.css('div.row[ng-if="!hideHeader"]'));
}


/**
 * Assert header presence or absence
 *
 * @param header
 * @param assert
 */
function assertHeader(header, isPresent) {
  if(isPresent) {
    expect(header.count()).toEqual(1);
    expect(header.get(0).isDisplayed()).toBeTruthy();
  }
  else {
    expect(header.count()).toEqual(0);
  }
}


describe('<lforms-panel-x> hide-check-boxes attribute', function() {
  it('default should show check boxes on the vertical panel ', function() {
    browser.get(test_url);
    assert_hidden_checkboxes(get_checkboxes(), 2, false);
  });
  it('default should show check boxes on the horizontal panel ', function() {
    browser.get(test_url+'#'+'/horizontal-form-default');
    assert_hidden_checkboxes(get_checkboxes(), 2, false);
  });
  it('true should hide check boxes on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-check-boxes-true');
    assert_hidden_checkboxes(get_checkboxes(), 2, true);
  });
  it('true should hide check boxes on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-check-boxes-true');
    assert_hidden_checkboxes(get_checkboxes(), 2, true);
  });
  it('false should show check boxes on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-check-boxes-false');
    assert_hidden_checkboxes(get_checkboxes(), 2, false);
  });
  it('false should show check boxes on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-check-boxes-false');
    assert_hidden_checkboxes(get_checkboxes(), 2, false);
  });
  it('false should show check boxes on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-check-boxes-absent');
    assert_hidden_checkboxes(get_checkboxes(), 2, false);
  });
  it('false should show check boxes on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-check-boxes-absent');
    assert_hidden_checkboxes(get_checkboxes(), 2, false);
  });
  it('false should show header on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-header-absent');
    assertHeader(getHeader(), true);
  });
  it('false should show header on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-header-absent');
    assertHeader(getHeader(), true);
  });
  it('false should show header on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-header-false');
    assertHeader(getHeader(), true);
  });
  it('false should show header on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-header-false');
    assertHeader(getHeader(), true);
  });
  it('false should hide header on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-header-true');
    assertHeader(getHeader(), false);
  });
  it('false should show header on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-header-true');
    assertHeader(getHeader(), false);
  });
});

