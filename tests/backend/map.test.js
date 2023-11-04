const { describe, default: test } = require("node:test");
const request = require("supertest");

// Test the map routes
describe("testing the map routes", () => {

  describe("GET map routes", () => {
    describe("given user is logged in", () => {
      describe("given an id of a map", () => {
        it("should return status code 201", async () => {});
      });
      describe("given no id of a map", () => {
        it("should return status code 201", async () => {});
      });
    });
    describe("given user is not logged in", () => {
      describe("given an id of a map", () => {});
      describe("given no id of a map", () => {});
    });
  });

  describe("PUT map routes", () => {
    describe("given user is logged in", () => {
      describe("given file content of map in json form", () => {
        it("should return 201", async () => {});
      });
      describe("given no file content of a map in json form", () => {
        it("should return status code 400", async () => {});
      });
    });
    describe("given user is not logged in", () => {});
  });

  describe("POST map routes", () => {
    describe("given user is logged in", () => {
      describe("given a map", () => {
        it("should return 201", async () => {});
      });
      describe("given no map", () => {
        it("should return 400", async () => {});
      });
    });
    describe("given user is not logged in", () => {
      it("should return status code 401", async () => {});
    });
  });
});
