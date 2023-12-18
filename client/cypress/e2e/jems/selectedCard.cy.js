/// <reference types="cypress" />
import { login } from "./utils";
const duplicateButton = "#duplicate-button";
const duplicateModal = "#duplicate-modal";
const duplicateModalSubmitButton = "#duplicate-modal-submit-button";

const downloadButton = "#download-button";
const downloadModal = "#download-modal";

const deleteButton = "#delete-button";
const deleteModalConfirmButton = "#delete-modal-confirm-button";
const deleteModalCancelButton = "#delete-modal-cancel-button";

beforeEach(() => {
  // Login
  login();
  // click on the first card in the home page
  cy.get(".card.cursor-pointer").first().click();
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
