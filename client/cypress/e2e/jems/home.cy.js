/// <reference types="cypress" />
import { login } from "./utils";
const createMapModalButton = "#create-map-modal-button";
const createMapModalMapNameInput = "#create-map-modal-map-name-input";
const createMapModalMapDescriptionInput = "#create-map-modal-map-description-input";
const createMapModalMapVisibilityInput = "#create-map-modal-map-visibility-input";
const createMapModalMapTemplateInput = "#create-map-modal-map-template-input";
const createMapModalSubmitButton = "#create-map-modal-submit-button";

const fileDropZone = "#file-dropzone";

beforeEach(() => {
  login(); // Login
});

describe("Creating a New Map", () => {
  it("Display alert when no file or template selected", () => {
    // Stub window alert
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(createMapModalButton).click();
    cy.get(createMapModalMapNameInput).type("Test Map");
    cy.get(createMapModalMapDescriptionInput).type("Test Description");
    cy.get(createMapModalMapVisibilityInput).click();
    cy.get(".mantine-Select-option").contains("Public").click();
    cy.get(fileDropZone).attachFile("color_label_template.json");
    cy.get(createMapModalSubmitButton)
      .click()
      .then(() => {
        // Verify that alert was called
        expect(stub.getCall(0)).to.be.calledImmediatelyAfter;
      });
  });

  it("Should display an error when map name is empty", () => {
    cy.get(createMapModalButton).click();
    cy.get(createMapModalMapNameInput).should("have.value", "");
    cy.get(createMapModalSubmitButton).click();
    cy.get("#create-map-modal-map-name-input-error").should("contain", "Map name is required");
  });
  
  it("Should display an error when description is empty", () => {
    cy.get(createMapModalButton).click();
    cy.get(createMapModalMapNameInput).type("Test Map");
    cy.get(createMapModalMapDescriptionInput).should("have.value", "");
    cy.get(createMapModalSubmitButton).click();
    cy.get("#create-map-modal-map-description-input-error").should("contain", "Description is required");
  });

  it("Create a new map with file", () => {
    cy.get(createMapModalButton).click();
    cy.get(createMapModalMapNameInput).type("Test Map");
    cy.get(createMapModalMapDescriptionInput).type("Test Description");
    cy.get(createMapModalMapVisibilityInput).click();
    cy.get(".mantine-Select-option").contains("Public").click();
    cy.get(fileDropZone).attachFile("color_label_template.json");
    cy.get(createMapModalSubmitButton).click();
  });

  it("Create a new map with template", () => {
    cy.get(createMapModalButton).click();
    cy.get(createMapModalMapNameInput).type("Test Map");
    cy.get(createMapModalMapDescriptionInput).type("Test Description");
    cy.get(createMapModalMapVisibilityInput).click();
    cy.get(".mantine-Select-option").contains("Public").click();
    cy.get(createMapModalMapTemplateInput).click();
    cy.get(".mantine-Select-option").contains("Color Label").click();
    cy.get(createMapModalSubmitButton).click();
  });
});
