const { describe } = require("node:test");
const request = require("supertest");

// Test the map routes
describe("testing the map routes", () => {
describe("GET /map", () => {
  describe("when user is logged in", () => {
    test("given an id of a map, it should return status code 201", async () => {
      // Add your test logic for a request with an id of a map
    });

    test("given no id of a map, it should return status code 201", async () => {
      // Add your test logic for a request without an id of a map
    });
  });

  describe("when user is not logged in", () => {
    it("should return status code 401", async () => {
      // Add your test logic for an unauthenticated user
    });
  });
});


  describe("GET /map/:id", () => {
    describe("when user is logged in", () => {
      test("given an id of a map, it should return status code 201", async () => {
        // Add your test logic for a valid id of a map
      });
  
      test("given an invalid id of a map, it should return status code 404", async () => {
        // Add your test logic for an invalid id of a map
      });
    });
  
    describe("when user is not logged in", () => {
      it("should return status code 401", async () => {
        // Add your test logic for an unauthenticated user
      });
    });
  });
  

  describe("PUT /map", () => {
    describe("when user is logged in", () => {
      test("given map file details, it should return status code 201", async () => {});
  
      test("given no map file details, it should return status code 400", async () => {});
    });
  
    describe("when user is not logged in", () => {
      it("should return status 401", async () => {});
    });
  });
  

  describe("POST /map/:id", () => {
    describe("when user is logged in", () => {
      test(":id is not valid for user to update, it should return status 400", async () => {});
  
      test("contents of the request are not correct, it should return status 400", async () => {});
  
      test(":id is valid and all contents are valid, it should return status 200", async () => {});
    });
  
    describe("when user is not logged in", () => {
      it("should return 401", async () => {});
    });
  });
  

  describe("POST /map/duplicate", () => {
    describe("when user is authenticated", () => {
      test("with a valid map ID, it should successfully duplicate the map and return 201", async () => {});

      test("with an invalid map ID, it should return a specific error and return 400", async () => {});
    });

    describe("when user is not authenticated", () => {
      it("should return 401", async () => {});
    });
  });
});
