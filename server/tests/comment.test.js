const request = require("supertest");

// Test the comment routes
describe("testing the comment routes", () => {
  describe("GET /comments", () => {
    describe("when user is authenticated", () => {
      test("with a map ID, it should return status code 201", async () => {
        // Test logic for a request with a map ID
      });

      test("without a map ID, it should return status code 201", async () => {
        // Test logic for a request without a map ID
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  describe("POST /comment", () => {
    describe("when user is authenticated", () => {
      test("with a comment, it should return status code 201", async () => {
        // Test logic for a request with a comment
      });

      test("without a comment, it should return status code 400", async () => {
        // Test logic for a request without a comment
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });
});



