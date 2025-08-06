// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


import {escapeIDSelector} from './util';

// unhide the file input element, upload a file and hide the file input element
Cypress.Commands.add(
  'uploadFile',
  { prevSubject: 'element' },
  (subject, filePathName) => {
    // Temporarily unhide the file input element.
    cy.get(subject).invoke('attr', 'class', '');
    cy.get(subject).selectFile(filePathName);
    // Re-hide the file input element
    cy.get(subject).invoke('attr', 'class', 'hide');
  }
);

// Get one or more DOM elements by element's id where '/' and '.' is escaped
// and "#" is added if not already present.
Cypress.Commands.add(
  'byId',
  { prevSubject: 'optional' },
  (subject, idSelector) => {
    // idSelector might be a Promise-- maybe not needed?  Seems to be causing some issue
/*    if (!idSelector.then)
      idSelector = Promise.resolve(idSelector);
    idSelector.then(idSelVal=> {
    */
      // escape / and | in the id

//cy.log("typeof isSelVal = "+typeof isSelVal);
//cy.log("isSelVal = "+isSelVal);
      const escapedSelector = escapeIDSelector(idSelector);
      const cySelector = escapedSelector[0] === "#" ? escapedSelector : "#" + escapedSelector;
      if (subject) {
        return cy.wrap(subject).find(cySelector);
      }
      else {
        return cy.get(cySelector);
      }
 //   });
  }
);

// Get one or more DOM elements by CSS selector where '/' is escaped.
Cypress.Commands.add(
  'byCss',
  { prevSubject: 'optional' },
  (subject, idSelector) => {
    // escape the / in the id
    if (subject) {
      return cy.wrap(subject).find(idSelector.replace(/\//g,"\\/"));
    }
    else {
      return cy.get(idSelector.replace(/\//g,"\\/"));
    }
  }
);

// Type in a search box and wait until search queries are finished.
Cypress.Commands.add(
  'typeAndWait',
  { prevSubject: 'optional' },
  (subject, term) => {
    // Intercept the last query which would contain '={term}'.
    cy.intercept('GET', '*=' + term + '**').as('lastSearchQuery');
    cy.wrap(subject).type(term);
    cy.wait('@lastSearchQuery');
    // It's guaranteed that the queries have returned. But there was still a slight
    // chance that the next Cypress command catches some element before the application
    // finishes updating DOM.
    cy.wait(100);
  }
);
