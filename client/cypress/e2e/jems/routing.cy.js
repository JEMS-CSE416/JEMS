/// <reference types="cypress" />

import { splashGetStartedButton } from "./id";

beforeEach(() => {
    cy.visit('/');
});

describe('Routing', () => {
    it('should navigate to the home page', () => {
        cy.get(splashGetStartedButton).click();
        cy.url().should('include', '/home');
    });
});
