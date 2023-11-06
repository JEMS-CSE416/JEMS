/// <reference types="cypress" />

import { splashGetStartedButton, mapCard } from "./id";

beforeEach(() => {
    cy.visit('/');
});

describe('Routing', () => {
    it('Navigates to home and selected pages', () => {
        cy.get(splashGetStartedButton).click();
        cy.url().should('include', '/home');

        cy.get(mapCard).click();
        cy.url().should('include', '/selected');
    });
});

describe('Modal checking', () => {
    
})
