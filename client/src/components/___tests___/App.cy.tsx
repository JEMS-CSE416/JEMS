// <reference types="cypress"/>
import App from "../../App";
import HomePage from "../common/HomeScreen";
import "@mantine/core/styles.css";

describe("App", () => {
  it("mounts", () => {
    cy.mount(<App />)
  });
});
