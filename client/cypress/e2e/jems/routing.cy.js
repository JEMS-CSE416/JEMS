/// <reference types="cypress" />

import { splashGetStartedButton, mapCard, loginButton, editButton } from "./id";

beforeEach(() => {
  cy.visit("/");
});

describe("Routing", () => {
  it("Navigates to home and selected pages", () => {
    // click on the get started button
    cy.get(splashGetStartedButton).click();

    // clicks on the login screen
    cy.get(loginButton).click();

    // checks if the url includes /home
    cy.url().should("include", "/home");

    // once we're in the home screen try to click on a card. any card. in this case we'll choose MyMapCard1
    //cy.get("#MyMapCard1").click();
    //cy.url().should("include", "/selected");

    //cy.get(editButton).click();
    //cy.url().should("include", "/edit");
  });
});

describe("Modal checking", () => {});
