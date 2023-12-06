import request from "supertest";
import app from "../../../app";
import mapjson from "../../fakeCreateMaps/map.json";
import mapjson_invalid from "../../fakeCreateMaps/map_invalid.json";

beforeAll(async () => {
  // populate the database with fake data
  const Fixtures = require("node-mongodb-fixtures");
  const fixtures = new Fixtures({
    dir: "tests/fakeDB",
    filter: /\.(json|js)$/,
    mute: true,
  });

  await fixtures
    .connect("mongodb://localhost:27017")
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .then(() => fixtures.disconnect());
});

// Test the map routes
describe("testing MAPS routes", () => {
  // Test Get Map
  describe("GET /api/maps/:id", () => {
    describe("when user is authenticated", () => {
      test("given an ID of a public map, it should return status code 200", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        // Then, get a map
        const id = "656ff8a4f651eef41c74c9d3";
        const response = await request(app)
          .get(`/api/maps/${id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(200);
      });

      test("given an invalid ID of a map, it should return status code 404", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        // Then, get a map
        const id = "656ff8a4f651eef31c74c9d4"; // this is an invalid map id that does not exist
        const response = await request(app)
          .get(`/api/maps/${id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(404);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        const id = "656ff8a4f651eef41c74c9d3";
        const response = await request(app).get(`/api/maps/${id}`).expect(401);
      });
    });
  });

  // Test Query Maps
  describe("GET /api/maps/", () => {
    describe("when user is authenticated", () => {
      test("getting private maps, it should return status code 200", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        // Then, get private maps
        const response = await request(app)
          .get("/api/maps/")
          .query({ private: true })
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(200);

        expect(response.body[0]).toHaveProperty("creatorId");
        expect(response.body[0]).toHaveProperty("mapName");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.body[0]).toHaveProperty("public");
      });

      test("getting private maps of a another user, it should return status code 200 with content as an empty []", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        // Attempt to get a private map that does not belong to you
        const response = await request(app)
          .get("/api/maps/")
          .query({
            private: true,
            map_name: "asdasd",
          })
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(200);
        expect(response.body).toEqual([]);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
        const response = await request(app)
          .get("/api/maps/")
          .query({ private: true })
          .expect(401);
      });
    });
  });

  // TODO Test Update Map
  describe("PUT /api/maps/update/", () => {
    describe("when user is authenticated", () => {});

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  // Tests Duplicating Map
  describe("POST /api/maps/duplicate", () => {
    describe("when user is authenticated", () => {
      test("with a valid public map ID, it should successfully duplicate the map and return 201", async () => {
        const loginResponse = await login();

        // duplicate a map
        const id = "656ff8a4f651eef41c74c9d3";
        const response = await request(app)
          .post(`/api/maps/duplicate`)
          .send({
            map_id: id,
            map_name: "Duplicate of Region Names 2",
            description: "Duplicate Description of Region Names 2",
            public: false,
          })
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(201);
      });

      test("with a valid private map ID, it should fail to duplicate the map and return 401", async () => {
        const loginResponse = await login();

        // duplicate a map
        const id = "656ff90bfd27abc1d48a4226";
        const response = await request(app)
          .post(`/api/maps/duplicate`)
          .send({
            map_id: id,
            map_name: "Duplicate of taiwan",
            description: "Duplicate Description of 12",
            public: false,
          })
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(201);
      });

      test("with an invalid map ID, it should return a specific error and return 400", async () => {
        const loginResponse = await login();

        // duplicate a map
        const id = "656ff90bfd27aba1d48a4222"; // invalid non existant map id
        const response = await request(app)
          .post(`/api/maps/duplicate`)
          .send({
            map_id: id,
            map_name: "Duplicate of taiwan",
            description: "Duplicate Description of 12",
            public: false,
          })
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(404);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // duplicate a map
        const id = "656ff8a4f651eef41c74c9d3";
        const response = await request(app)
          .post(`/api/maps/duplicate`)
          .send({
            map_id: id,
            map_name: "Duplicate of Region Names 2",
            description: "Duplicate Description of Region Names 2",
            public: false,
          })
          .expect(401);
      });
    });
  });

  // Tests Creating Map
  describe("PUT /api/maps/", () => {
    describe("when user is authenticated", () => {
      test("with valid JSON map data, it should successfully create a map and return 201", async () => {
        const loginResponse = await login();

        const response = await request(app)
          .put(`/api/maps/`)
          .send(mapjson)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(201);
      });

      test("with invalid JSON map data, it should return a specific error and return 400", async () => {
        const loginResponse = await login();

        const response = await request(app)
          .put(`/api/maps/`)
          .send(mapjson_invalid)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(400);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  // Test Deleting Map
  describe("DELETE /api/maps/:id", () => {
    describe("when user is authenticated", () => {
      test("with a valid map ID, it should successfully delete the map and return status code 204: No content", async () => {
        const loginResponse = await login();

        const id = "6570ae07e245dce73cc1acbe";
        const response = await request(app)
          .delete(`/api/maps/${id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(204);
      });

      test("with an invalid map ID, it should return a specific error and return status code 404: Not Found", async () => {
        const loginResponse = await login();

        const id = "6570ae07e242dce73cc1acde"; // an invalid non existing map id
        const response = await request(app)
          .delete(`/api/maps/${id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(404);
      });

      test("with a valid map ID that does not belong to the user, it should return a specific error and return status code 401: Unauthorized", async () => {
        const loginResponse = await login();

        const id = "656ff2283e72ed7d266574cb";
        const response = await request(app)
          .delete(`/api/maps/${id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(401);
      });
    });

    describe("when user is not authenticated", () => {
      it("it should return status code 401: Unauthorized", async () => {
        const id = "656ff2283e72ed7d266574cb";
        const response = await request(app)
          .delete(`/api/maps/${id}`)
          .expect(401);
      });
    });
  });
});

async function login() {
  const loginResponse = await request(app)
    .post("/api/auth/login/")
    .send({ email: "test@test.test", password: "123" })
    .expect(200);
  return loginResponse;
}
