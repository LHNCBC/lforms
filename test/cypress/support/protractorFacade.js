/*
export browser = {
  driver: {
    executeAsyncScript: function(script, ...args) {
      cy.window().then(win=>{
        function
        win.eval('('+script+').apply(null,'+JSON.stringify(args)+')');:w

      });
    }
  }
};
*/

// Additional expect functions
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
      toBeFalsy: ()=>cypressExpect(!actualValue).to.be.true
    }
  }
  const rtn = assertions();
  rtn.not = assertions(true);
  return rtn;
}
facadeExpect.prototype = cypressExpect;


export const by = {
  id: (id) => '#'+id.replaceAll('/', '\\/'),
  css: (cssLocator) => cssLocator.replaceAll('/', '\\/')
}


/**
 *  Mimics protractor's element function.
 * @param locator usually a CSS string that can be passed to cy.get(), but it
 *  can also be the result of a cy.get().
 */
export function element(locator) {
  let cyElem;
  if (locator['should']) // a cypress "Chainer"
    cyElem = locator;

  /**
   *  Gets the element referred to by locator.
   */
  function getElem() {
    return cyElem || cy.get(locator);
  }

  function type(textStr) {
    getElem().type(textStr);
  };

  return {
    getCyElem: getElem,
    getAttribute: function (attrName) {
      return getElem().invoke('attr', attrName);
    },
    getText: ()=>getElem().invoke('text'),
    type: type,
    sendKeys: type,
    element: function(subLocator) {
      getElem().get(subLocator);
    },
    click: ()=>getElem().click(),
  }
}

element.all = function (allLocator) {
  return {
    get: (index) => element(cy.get(allLocator).eq(index))
  }
}

export const protractor = {
  Key: {
    ARROW_DOWN: '{downarrow}',
    ENTER: '{enter}'
  }
}

