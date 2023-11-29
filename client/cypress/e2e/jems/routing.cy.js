/// <reference types="cypress" />

import { splashGetStartedButton, mapCard, loginButton, editButton } from "./id";

const loginEmailInput = "#loginEmailInput";
const loginPasswordInput = "#loginPasswordInput";
const loginSubmitButton = "#loginButton";

const signUpLink = "#signUpLink";
const loginLink = "#loginLink";
const forgotPasswordLink = "#forgotPasswordLink";

const signUpEmailInput = "#signUpEmailInput";
const signupDisplayNameInput = "#signupDisplayNameInput";
const signUpPasswordInput = "#signupPasswordInput";
const signUpConfirmPasswordInput = "#signupConfirmPasswordInput";
const signUpSubmitButton = "#signUpSubmitButton";

beforeEach(() => {
  cy.visit("/");
});

describe("Login as existing User", () => {
  it("Successfully login as existing user", () => {
    // click on the get started button
    cy.get(splashGetStartedButton).click();

    cy.get(loginEmailInput).type("bunpillo@gmail.com")
    cy.get(loginPasswordInput).type("12345678")
    
    // clicks on the login button
    cy.get(loginSubmitButton).click();

    // checks if the url includes /home
    cy.url().should("include", "/home");
  });
});

describe("Sign up as a new user", () => {
  it("Successfully create user", () => {
    // click on the get started button
    cy.get(splashGetStartedButton).click();

    // clicks on the login screen
    cy.get(signUpLink).click();

    cy.get(signUpEmailInput).type("cypressuser1@gmail.com")
    cy.get(signupDisplayNameInput).type("cypressUser1")
    cy.get(signUpPasswordInput).type("12345678")
    cy.get(signUpConfirmPasswordInput).type("12345678")

    // clicks on the login button
    cy.get(signUpSubmitButton).click();

    // Log in with the newly created user
    cy.get(loginEmailInput).type("cypressuser1@gmail.com")
    cy.get(loginPasswordInput).type("12345678")

    // clicks on the login button
    cy.get(loginSubmitButton).click();

    // checks if the url includes /home
    cy.url().should("include", "/home");
  });
});
