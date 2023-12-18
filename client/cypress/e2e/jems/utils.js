/// <reference types="cypress" />
// Use this file to export all commonly used functions to the actual suites
const splashGetStartedButton = '#splash-button';
const loginEmailInput = "#loginEmailInput";
const loginPasswordInput = "#loginPasswordInput";
const loginSubmitButton = "#loginButton";

export function login() {
  cy.visit("/");

  // click on the get started button
  cy.get(splashGetStartedButton).click();

  cy.get(loginEmailInput).type("bunpillo@gmail.com");
  cy.get(loginPasswordInput).type("12345678");

  // clicks on the login button
  cy.get(loginSubmitButton).click();

  // checks if the url includes /home
  cy.url().should("include", "/home");
}
