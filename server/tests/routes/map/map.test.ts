import request from "supertest";
import app from "../../../app";
import map_content_files from "../../fakeCreateMaps/maps.json";

// https://stackoverflow.com/questions/69794934/set-an-authentication-token-in-a-request-header-when-using-supertest-with-jest-a
// for auth

beforeEach(async () => {
  // populate the database with fake data
  const Fixtures = require("node-mongodb-fixtures");
  const fixtures = new Fixtures({
    dir: "tests/fakeDB",
    filter: "*.json",
    mute: true,
  });



  await fixtures
    .connect("mongodb://localhost:27017")
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .then(() => fixtures.disconnect());
});

// Test the map routes
describe("testing the api/map route", () => {
  describe("GET /api/map/query/", () => {
    describe("when user is authenticated", () => {
      test("getting private maps, it should return status code 200", async () => {
        // First, log in to create a session
        const loginResponse = await request(app)
          .post("/api/auth/login/")
          .send({ email: "test@test.test", password: "123" })
          .expect(200);

        // Then, get private maps
        const response = await request(app)
          .get("/api/maps/")
          .query({ private: true })
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(200);

        console.log(response.body);
        expect(response.body[0]).toHaveProperty("creatorId");
        expect(response.body[0]).toHaveProperty("mapName");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.body[0]).toHaveProperty("public");
      });

      test("getting private maps of a another user, it should return status code 200 with content as an empty []", async () => {
        // const response = await request(app)
        //   .get("/api/maps/query/")
        //   .query({
        //     private: true,
        //     creator_id: "6119dbef8b0915f12c818a3a",
        //     session_token: "6119dbef8b0915f12c818a37",
        //   })
        //   .expect(200);
        // expect(response.body).toEqual([]);
      });

      test("getting all maps created by a user", async () => {
        // const response = await request(app)
        //   .get("/api/maps/query/")
        //   .query({
        //     creator_id: "6119dbef8b0915f12c818a3a",
        //   })
        //   .expect(200);
        // expect(response.body.length).toEqual(0);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // // Test logic for an unauthenticated user
        // const response = await request(app)
        //   .get("/api/maps/query/")
        //   .query({ private: true })
        //   .expect(401);
      });
    });
  });

  describe("GET /api/map/get/:id", () => {
    describe("when user is authenticated", () => {
      test("given an ID of a map, it should return status code 201", async () => {
        // Test logic for a valid ID of a map
      });

      test("given an invalid ID of a map, it should return status code 404", async () => {
        // Test logic for an invalid ID of a map
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  describe("PUT /api/map", () => {
    describe("when user is authenticated", () => {
      test("given map file details, it should return status code 201", async () => {
        // const map_2 = map_content_files[1];
        // const response = await request(app)
        //   .put("/api/maps/")
        //   .send(map_2)
        //   .expect(201);
      });

      test("given no map file details, it should return status code 400", async () => {
        // const authenticated = true;
        // const response = await request(app)
        //   .put("/api/maps/")
        //   .send({})
        //   .expect(400);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  describe("POST /api/map/:id", () => {
    describe("when user is authenticated", () => {
      test("when ID is not valid for the user to update, it should return status code 400", async () => {
        // Test logic for an invalid ID for the user to update
      });

      test("when contents of the request are not correct, it should return status code 400", async () => {
        // Test logic for incorrect request contents
      });

      test("when ID is valid and all contents are valid, it should return status code 200", async () => {
        // Test logic for a valid ID and contents
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  describe("POST /api/map/duplicate", () => {
    describe("when user is authenticated", () => {
      test("with a valid map ID, it should successfully duplicate the map and return 201", async () => {
        // let response = await request(app)
        //   .get("/api/maps/query/")
        //   .query({
        //     creator_id: "6119dbef8b0915f12c818a3b",
        //     session_token: "6119dbef8b0915f12c818a37",
        //   })
        //   .expect(200);
        // expect(response.body[0]).toHaveProperty("creatorId");
        // expect(response.body[0]).toHaveProperty("mapName");
        // expect(response.body[0]).toHaveProperty("description");
        // expect(response.body[0]).toHaveProperty("public");
        // const mapID = response.body[0]._id;
        // const map_name = "Copy Of" + response.body[0].mapName;
        // const description = "Copy Of" + response.body[0].description;
        // const isPublic = "false";
        // const token = "6119dbef8b0915f12c818a37";
        // response = await request(app)
        //   .post("/api/maps/duplicate/")
        //   .set("Authorization", "Bearer " + token)
        //   .send({
        //     map_id: mapID,
        //     map_name: map_name,
        //     description: description,
        //     public: isPublic,
        //   })
        //   .expect(201);
        // expect(response.body).toHaveProperty("creatorId");
        // expect(response.body).toHaveProperty("mapName");
        // expect(response.body).toHaveProperty("description");
        // expect(response.body).toHaveProperty("public");
        // // check response.body.creatorId == token
        // expect(response.body.creatorId).toEqual(token);
        // // check response.body.mapName == map_name
        // expect(response.body.mapName).toEqual(map_name);
        // // check response.body.description == description
        // expect(response.body.description).toEqual(description);
        // // check response.body.public == isPublic
        // expect(response.body.public).toEqual(false);
      });

      test("with an invalid map ID, it should return a specific error and return 400", async () => {
        // Test logic for duplicating a map with an invalid ID
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        // Test logic for an unauthenticated user
      });
    });
  });

  describe("DELETE /api/map/:id", () => {
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
