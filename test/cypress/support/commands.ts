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

// escape '/' in the element id string and get the element
Cypress.Commands.add(
  'byId',
  { prevSubject: 'optional' },
  (subject, idSelector) => {
    // escape the / in the id
    if (subject) {
      return cy.wrap(subject).get(idSelector.replace(/\//g,"\\/"));
    }
    else {
      return cy.get(idSelector.replace(/\//g,"\\/"));
    }
  }
);

// typing tab key is not support in cypress
// this solution is not reliable https://github.com/cypress-io/cypress/issues/299
Cypress.Commands.add('typeTab', (shiftKey, ctrlKey) => {
  cy.focused().trigger('keydown', {
      keyCode: 9,
      which: 9,
      shiftKey: shiftKey,
      ctrlKey: ctrlKey
  });
});