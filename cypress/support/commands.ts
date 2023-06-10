/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "cypress-localstorage-commands";
import { NORMA_API} from '../../src/utils/burger-api';

Cypress.Commands.add("fillContentAndVisit", ()=>{
    cy.intercept("GET", `${NORMA_API}ingredients`, {
        fixture: "ingredients"
    });
   
    cy.setLocalStorage("refreshToken", "661ba153431466e34aebba5e6fd5b3cceac0371eeb634a5802ff5fe928d9fe877f19a6a000f174ae");
    cy.setCookie('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY5YTJlOGE0YjYyMDAxYzgzNzYyMSIsImlhdCI6MTY4NjIyMzU2NywiZXhwIjoxNjg2MjI0NzY3fQ.CVRCRrHglR1QaHZlcejWILIgtFivzG_tstn7OtF_fdY')

    cy.visit("/");
})