const request = require("supertest");

// Test the map routes
describe("testing the comment routes", () => {
  describe("GET /comments", () => {
    describe("given user is authenticated", () => {
      test("with a map id, it should return status code 201", async () => {});

      test("without a map id, it should return status code 201", async () => {});
    });

    describe("given user is not authenticated", () => {
      it("should return status code 401", async () => {});
    });
  });

  describe("POST /comment", () => {
    describe("given user is authenticated", () => {
      test("with a comment, it should return status code 201", async () => {});

      test("without a comment, it should return status code 400", async () => {});
    });

    describe("given user is not authenticated", () => {
      it("should return status code 401", async () => {});
    });
  });
});


