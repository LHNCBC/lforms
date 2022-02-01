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
      if (actualValue?.should) {
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
      }
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

export function element(locator) {
  let elem; // a reference to the Cypress element

  /**
   *  Gets and caches the element referred to by locator.
   */
  function getElem() {
    return elem ||= cy.get(locator);
  }

  function type(textStr) {
    getElem().type(textStr);
  };

  return {
    getCyElem: getElem,
    getAttribute: function (attrName) {
      return getElem().invoke('attr', attrName);
    },
    type: type,
    sendKeys: type,
    element: function(subLocator) {
      getElem().get(subLocator);
    },
    click: ()=>getElem().click()
  }
}

export const protractor = {
  Key: {
    ARROW_DOWN: '{downarrow}',
    ENTER: '{enter}'
  }
}

