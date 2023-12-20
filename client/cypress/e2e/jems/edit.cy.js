/// <reference types="cypress" />
import { login } from "./utils";

const settingsButton = "#settings-button";
const settingsModalTitle = "#settings-modal-title";
const exportButton = "#export-button";
const exportModalTitle = "#export-modal-title";

const editButton = "#edit-button";

beforeEach(() => {
  login();
  // click on the first card in the home page
  cy.wait(1500);
  cy.get(".card.cursor-pointer").first().click();
});

describe("Routed to Edit Screen", () => {
  it("Successfully displays edit", () => {
    cy.get(editButton).click();
    cy.url().should("include", "edit");
  });
});

describe("Modal Checking", () => {
  it("Checks if the settings modal is visible", () => {
    cy.get(editButton).click();
    cy.url().should("include", "edit");
    // Click on the settings button to open the duplicate modal
    cy.get(settingsButton).click();
  });

  it("Checks if the export modal is visible", () => {
    cy.get(editButton).click();
    cy.url().should("include", "edit");
    // Click on the button to open the duplicate modal
    cy.get(exportButton).click();
  });
});
