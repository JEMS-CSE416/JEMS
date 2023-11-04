const request = require("supertest");

// Test the map routes
describe("testing the auth routes", () => {
  describe("GET /loggedIn", () => {
    describe("session token provided", () => {
      it("should return 200", async () => {});
    });
    describe("no session token provided", () => {
      it("should return 400", async () => {});
    });
  });

  describe("POST /logout", () => {
    describe("session token provided", () => {
      it("should return 200", async () => {});
    });
    describe("no session token provided", () => {
      it("should return 400", async () => {});
    });
  });

  describe("POST /login", () => {
    describe("email and password is provided", () => {
      describe("email is wrong", () => {
        it("should return 401", async () => {});
      });
      describe("password is wrong", () => {
        it("should return 401", async () => {});
      });
      describe("both correct", () => {
        it("should return 200", async () => {});
      });
    });
    describe("email is given, but password is missing", () => {
      it("should return 400", async () => {});
    });
    describe("email is missing, but password is given", () => {
      it("should return 400", async () => {});
    });
  });

  describe("POST /register", () => {
    describe("firstName, lastName, email, password, and passwordVerify is provided", () => {
      it("should return 201", async () => {});
    });
    describe("zero or more of the fields is not provided or wrong or not unique email", () => {
      describe("firstName, lastName, email, password, and passwordVerify is not provided", () => {
        it("should return 400", async () => {});
      });
      describe("email, password, and passwordVerify is not provided", () => {
        it("should return 400", async () => {});
      });
      describe("password, and passwordVerify is not provided", () => {
        it("should return 400", async () => {});
      });

      describe("password, and passwordVerify is wrong", () => {
        it("should return 400", async () => {});
      });

      describe("not unique email",()=>{
        it("should return 400", async () => {});
      })
    });
  });
});
