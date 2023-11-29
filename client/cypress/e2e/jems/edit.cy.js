/// <reference types="cypress" />
import { splashGetStartedButton } from "./id";

const loginEmailInput = "#loginEmailInput";
const loginPasswordInput = "#loginPasswordInput";
const loginSubmitButton = "#loginButton";

const settingsButton = '#settings-button';
const settingsModalTitle = '#settings-modal-title';
const exportButton = '#export-button';
const exportModalTitle = '#export-modal-title';

const editButton = '#edit-button';

function login() {
  cy.visit("/");

  // click on the get started button
  cy.get(splashGetStartedButton).click();

  cy.get(loginEmailInput).type("jendyren@gmail.com");
  cy.get(loginPasswordInput).type("12345678");

  // clicks on the login button
  cy.get(loginSubmitButton).click();

  // checks if the url includes /home
  cy.url().should("include", "/home");
}


beforeEach(() => {
  login();
  cy.get("#6567576c0837a4d8bcca4f79").click();
});

describe("Routed to Edit Screen", () => {
  it("Successfully displays edit", () => {
    cy.get(editButton).click();
    cy.url().should("include", "6567576c0837a4d8bcca4f79");
  });
});


describe("Modal Checking", () => {
  it("Checks if the settings modal is visible", () => {
    cy.get(editButton).click();
    cy.url().should("include", "6567576c0837a4d8bcca4f79");
    // Click on the settings button to open the duplicate modal
    cy.get(settingsButton).click();

  });

  it("Checks if the export modal is visible", () => {
    cy.get(editButton).click();
    cy.url().should("include", "6567576c0837a4d8bcca4f79");
    // Click on the button to open the duplicate modal
    cy.get(exportButton).click();
  });
});

