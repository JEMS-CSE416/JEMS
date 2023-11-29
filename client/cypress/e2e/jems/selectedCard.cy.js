/// <reference types="cypress" />

const duplicateButton = '#duplicate-button';
const duplicateModal = '#duplicate-modal';
const duplicateModalSubmitButton = '#duplicate-modal-submit-button';

const deleteButton = "#delete-button";
const downloadButton = "#download-button";
const deleteModalConfirmButton = "#delete-modal-confirm-button";
const deleteModalCancelButton = "#delete-modal-cancel-button";

beforeEach(() => {
  cy.visit("/map/6567576c0837a4d8bcca4f79");
});

describe("Modal checking", () => {
  it("Checks if the duplicate modal is visible", () => {
    // Click on the button to open the duplicate modal
    cy.get(duplicateButton).click();
    cy.get(duplicateModalSubmitButton).click();
  });
  it("Checks if the delete modal is visible", () => {
    // Click on the button to open the delete modal
    cy.get(deleteButton).click();
    cy.get(deleteModalConfirmButton).click();
  });
});
