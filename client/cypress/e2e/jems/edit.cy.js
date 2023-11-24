/// <reference types="cypress" />
const settingsButton = '#settings-button';
const settingsModalTitle = '#settings-modal-title';
const exportButton = '#export-button';
const exportModalTitle = '#export-modal-title';

const editButton = '#edit-button';

beforeEach(() => {
  cy.visit("/selected");
});

describe("Modal checking", () => {
  //it("Checks if the export modal is visible", () => {
    //cy.visit("/edit")
    //// Click on the button to open the export modal
    //cy.get(exportButton).click();
    //cy.get(`${exportModalTitle}+button`).click();
  //});
  //it("Checks if the settings modal is visible", () => {
    //cy.visit("/edit")
    //// Click on the button to open the settings modal
    //cy.get(settingsButton).click();
    //cy.get(`${settingsModalTitle}+button`).click();
  //});
});

describe("Navigation checking", () => {
  it("Checks if the duplicate modal is visible", () => {
    //cy.visit("/selected")
    //// Click on the button to open the duplicate modal
    //cy.get(editButton).click();
    //cy.location('pathname').should('eq', '/edit')
  });
});
