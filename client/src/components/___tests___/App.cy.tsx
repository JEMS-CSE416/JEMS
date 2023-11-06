/// <reference types="cypress" />
import App from "../../App";
import "@mantine/core/styles.css";

describe("App", () => {
  it("mounts", () => {
    cy.mount(<App />);
  });
});
