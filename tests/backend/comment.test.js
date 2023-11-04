const request = require("supertest");

// Test the map routes
describe("testing the comment routes", () => {

  describe("GET /comments", () => {
    describe("given user is logged in", () => {
      describe("given map id", () => {
        it("should return status code 201", async () => {

        });
      });
      describe("given no map id", () => {
        it("should return status code 201", async () => {});
      });
    });
    describe("given user is not logged in", () => {
      it("should return status code 401", async () => {})
    });
  });

  describe("POST /comment", () => {
    describe("given user is logged in", () => {
      describe("given a comment", () => {
        it("should return 201", async () => {});
      });
      describe("given no comment", () => {
        it("should return 400", async () => {});
      });
    });
    describe("given user is not logged in", () => {
      it("should return status code 401", async () => {});
    });
  });
});

