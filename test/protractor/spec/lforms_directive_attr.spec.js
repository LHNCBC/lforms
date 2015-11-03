
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

describe('<lforms-panel-x> hide-check-boxes attribute', function() {
  it('default should show check boxes on the vertical panel ', function() {
    browser.get(test_url);
    assert_hidden_checkboxes(get_checkboxes(), 3, false);
  });
  it('default should show check boxes on the horizontal panel ', function() {
    browser.get(test_url+'#'+'/horizontal-form-default');
    assert_hidden_checkboxes(get_checkboxes(), 3, false);
  });
  it('true should hide check boxes on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-check-boxes-true');
    assert_hidden_checkboxes(get_checkboxes(), 3, true);
  });
  it('true should hide check boxes on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-check-boxes-true');
    assert_hidden_checkboxes(get_checkboxes(), 3, true);
  });
  it('false should show check boxes on the vertical panel', function() {
    browser.get(test_url+'#'+'/vertical-form-hide-check-boxes-false');
    assert_hidden_checkboxes(get_checkboxes(), 3, false);
  });
  it('false should show check boxes on the horizontal panel', function() {
    browser.get(test_url+'#'+'/horizontal-form-hide-check-boxes-false');
    assert_hidden_checkboxes(get_checkboxes(), 3, false);
  });
});

