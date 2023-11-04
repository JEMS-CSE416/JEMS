const { describe } = require("node:test");
const request = require("supertest");

// Test the map routes
describe("testing the map routes", () => {
  describe("GET /map", () => {
    describe("when user is logged in", () => {
      describe("given an id of a map", () => {
        it("should return status code 201", async () => {});
      });
      describe("given no id of a map", () => {
        it("should return status code 201", async () => {});
      });
    });
    describe("when user is not logged in", () => {
      it("should return status code 401", async () => {});
    });
  });

  describe("GET /map/:id", () => {
    describe("when user is logged in", () => {
      describe("given an id of a map", () => {
        it("should return status code 201", async () => {});
      });
      describe("given invalid id of a map", () => {
        it("should return status code 404", async () => {});
      });
    });
    describe("when user is not logged in", () => {
      it("should return status code 401", async () => {});
    });
  });

  describe("PUT /map", () => {
    describe("when user is logged in", () => {
      describe("given map file details", () => {
        it("should return status code 201", async () => {});
      });
      describe("given no map file details", () => {
        it("should return status code 400", async () => {});
      });
    });
    describe("when user is not logged in", () => {
      it("should return status 401", () => {});
    });
  });

  describe("POST /map/:id", () => {
    describe("when user is logged in", () => {
      describe(":id is not a valid for user to update", () => {
        it("should return status 400", async () => {});
      });

      describe("contents of the request are not correct", () => {
        it("should ...", async () => {
          
        });
      });
    });
    describe("when user is not logged in", () => {
      it("should return 401", async () => {});
    });
  });

  describe("POST /map/duplicate", () => {});
});
