/// <reference types="cypress" />
import { splashGetStartedButton } from "./id";
const duplicateButton = "#duplicate-button";
const duplicateModal = "#duplicate-modal";
const duplicateModalSubmitButton = "#duplicate-modal-submit-button";

const downloadButton = "#download-button";
const downloadModal = "#download-modal";

const deleteButton = "#delete-button";
const deleteModalConfirmButton = "#delete-modal-confirm-button";
const deleteModalCancelButton = "#delete-modal-cancel-button";

const loginEmailInput = "#loginEmailInput";
const loginPasswordInput = "#loginPasswordInput";
const loginSubmitButton = "#loginButton";

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
  // Login 
  login();
  // click on card id of 65666368ac743f6444ab4773
  cy.get("#6570831f904450313965d9a5").click();
});


describe("Modal checking", () => {
  it("Checks if the duplicate modal is visible", () => {
    // Click on the button to open the duplicate modal
    cy.get(duplicateButton).click();
    cy.get(duplicateModalSubmitButton).click();
  });

  it("Checks if the download modal is visible", () => {
    // Click on the button to open the duplicate modal
    cy.get(downloadButton).click();
  });

});
