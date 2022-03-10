// A facade for implementing Protractor calls with Cypress.


// expect functions
const cypressExpect = expect;
export function facadeExpect(actualValue) {
  function assertions(isNot=false) {
    function toBe(expectedValue) {
      if (actualValue?.should) {
        if (isNot)
          actualValue.should('not.equal', expectedValue);
        else
          actualValue.should('equal', expectedValue);
      }
      else {
        if (isNot)
          cypressExpect(actualValue).to.not.equal(expectedValue);
        else
          cypressExpect(actualValue).to.equal(expectedValue);
      }
    };
    function toEqual(expectedValue) {
      if (actualValue?.should) { // a promise from a cypress command
        if (isNot)
          actualValue.should('not.deep.equal', expectedValue);
        else
          actualValue.should('deep.equal', expectedValue);
      }
      else {
        if (isNot)
          cypressExpect(actualValue).to.not.deep.equal(expectedValue);
        else
          cypressExpect(actualValue).to.deep.equal(expectedValue);
      }
    };
    return {
      toBe: toBe,
      toEqual: toEqual,
      toBeNull: function() {
        if (isNot)
          cypressExpect(actualValue).to.not.be.null;
        else
          cypressExpect(actualValue).to.be.null;
      },
      toBeFalsy: ()=>cypressExpect(!actualValue).to.be.true,
      toBeGreaterThanOrEqual: (v)=>cypressExpect(actualValue).to.be.gte(v),
      toBeLessThanOrEqual: (v)=>cypressExpect(actualValue).to.be.at.most(v),
      toContain: (v)=>actualValue.should('contain', v),
      toMatch: (v)=>actualValue.should('match', v)
    }
  }
  const rtn = assertions();
  rtn.not = assertions(true);
  return rtn;
}
facadeExpect.prototype = cypressExpect;


export const by = {
  id: (id) => '#'+id.replaceAll(/([\.\/])/g, '\\$1'),
  css: (cssLocator) => cssLocator.replaceAll('/', '\\/'),
  tagName: (tagName)=>tagName
}


/**
 *  Mimics protractor's element function.
 * @param locator a CSS string that can be passed to cy.get()
 */
export function element(locator) {
  /**
   *  Gets the element referred to by locator.
   */
  function getElem() {
    // element.all below passes in a cypress element instead of a CSS locator.
    return locator.should ? locator : cy.get(locator);
  }

  function type(textStr) {
    getElem().type(textStr);
  };

  return {
    getCyElem: getElem,
    getAttribute: function (attrName) {
      return attrName=='value' ? getElem().invoke('val') :getElem().invoke('attr', attrName);
    },
    getText: ()=>getElem().invoke('text'),
    type: type,
    sendKeys: type,
    element: (subLocator)=>element(locator + ' ' + subLocator),
    isSelected: ()=>getElem().invoke('val'),
    click: ()=>getElem().click(),
    clear: ()=>getElem().clear(),
    all: (allLocator)=>getElem().find(allLocator),
    should: (assertion)=>getElem().should(assertion)
  }
}

element.all = function (allLocator) {
  return {
    /**
     *  Returns an "element" for the DOM element at the given index of the
     *  results of allLocator.  Because of the way cypress works, this must be
     *  used in the same statement or it might be invalid.
     */
    get: (index) => element(cy.get(allLocator).eq(index)),
    then: (fn) => cy.get(allLocator).then((items)=>fn(items))
  }
}

export const protractor = {
  Key: {
    ARROW_DOWN: '{downarrow}',
    DOWN: '{downarrow}',
    ENTER: '{enter}'
  }
}

