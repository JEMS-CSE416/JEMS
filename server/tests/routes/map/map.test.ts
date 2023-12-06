import request from "supertest";
import app from "../../../app";
import map_content_files from "../../fakeCreateMaps/maps.json";

// https://stackoverflow.com/questions/69794934/set-an-authentication-token-in-a-request-header-when-using-supertest-with-jest-a
// for auth

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

  // Test Update Map
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

  // Test Creating Map
  describe("PUT /api/maps/", () => {
    describe("when user is authenticated", () => {});

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
        // let response = await request(app)
        //   .get("/api/maps/query/")
        //   .query({
        //     map_name: "Sample Map 4",
        //     creator_id: "6119dbef8b0915f12c818a3a",
        //     session_token: "6119dbef8b0915f12c818a3a",
        //   })
        //   .expect(200);
        // expect(response.body[0]).toHaveProperty("_id");
        // const mapID = response.body[0]._id;
        // const token = "6119dbef8b0915f12c818a3a"; // TODO: the token will be the userID for now
        // response = await request(app)
        //   .delete(`/api/maps/${mapID}`)
        //   .set("Authorization", "Bearer " + token)
        //   .expect(204);
      });

      test("with an invalid map ID, it should return a specific error and return status code 404: Not Found", async () => {
        // Test logic for deleting a map with an invalid ID
      });

      test("with a valid map ID that does not belong to the user, it should return a specific error and return status code 401: Unauthorized", async () => {
        // Test logic for deleting a map with a valid ID that does not belong to the user
      });
    });

    describe("when user is not authenticated", () => {
      test("when the user provides no auth token, it should return status code 401: Unauthorized", async () => {
        // Test logic for an unauthenticated user
      });

      test("when the user provides an invalid auth token, it should return status code 401: Unauthorized", async () => {
        // Test logic for an unauthenticated user
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
