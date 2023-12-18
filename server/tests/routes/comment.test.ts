import request from "supertest"
import app from "../../app";

// Test the comment routes
describe("testing the comment routes", () => {
  describe("GET /comments", () => {
    describe("when user is authenticated", () => {
      test("with a valid map ID, it should return status code 200", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        // Get comments for a map
        const mapId = "657e02f381cf0ba4460ce31e"
        const response = await request(app)
          .get(`/api/comment/`)
          .set("id", mapId)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(200);
      });

      test("without a map ID, it should return status code 404", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        const response = await request(app)
          .get('/api/comment/')
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(404);
      });

      test("with an private map ID, it should return status code 401", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        const mapId = "6580b226e22d1b683816d0a0" // Private map under a different user
        const response = await request(app)
          .get(`/api/comment/`)
          .set("id", mapId)
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .expect(401);
      });
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        const response = await request(app)
          .get('/api/comment/')
          .expect(401);
      });
    });
  });

  describe("PUT /comment", () => {
    describe("when user is authenticated", () => {
      test("with a comment, it should return status code 200", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        const response = await request(app)
          .put('/api/comment/create')
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .send({
            "mapId": "657e02f381cf0ba4460ce31e",
            "content": "Test comment"
          })
          .expect(200);
      });

      test("without a comment, it should return status code 400", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        const response = await request(app)
          .put('/api/comment/create')
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .send({
            mapId: '657e02f381cf0ba4460ce31e',
            comment: ''
          })
          .expect(400);
      });

      test("with a private map ID, it should return status code 401", async () => {
        // First, log in to create a session
        const loginResponse = await login();

        const response = await request(app)
          .put('/api/comment/create')
          .set("Cookie", loginResponse.headers["set-cookie"]) // Pass the session cookie
          .send({
            mapId: '6580b226e22d1b683816d0a0',
            comment: 'Test comment which should fail'
          })
          .expect(401);
      }
      );
    });

    describe("when user is not authenticated", () => {
      it("should return status code 401", async () => {
        const response = await request(app)
          .put('/api/comment/create')
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


