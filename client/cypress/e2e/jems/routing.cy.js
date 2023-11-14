/// <reference types="cypress" />

import {
  splashGetStartedButton,
  mapCard,
  loginButton,
  editButton,
} from "./id";

beforeEach(() => {
  cy.visit("/");
});

describe("Routing", () => {
  it("Navigates to home and selected pages", () => {
    cy.get(splashGetStartedButton).click();
    cy.get(loginButton).click();
    cy.url().should("include", "/home");

    cy.get(mapCard).click();
    cy.url().should("include", "/selected");

    cy.get(editButton).click();
    cy.url().should("include", "/edit");

  });
});

describe("Modal checking", () => {

});
