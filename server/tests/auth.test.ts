import request from "supertest"

// Test the auth routes
describe("testing the auth routes", () => {
  describe("GET /loggedIn", () => {
    describe("session token provided", () => {
      it("should return 200", async () => {
        // Test logic for a provided session token
      });
    });

    describe("no session token provided", () => {
      it("should return 400", async () => {
        // Test logic for no session token provided
      });
    });
  });

  describe("POST /logout", () => {
    describe("session token provided", () => {
      it("should return 200", async () => {
        // Test logic for a provided session token
      });
    });

    describe("no session token provided", () => {
      it("should return 400", async () => {
        // Test logic for no session token provided
      });
    });
  });

  describe("POST /login", () => {
    describe("email and password are provided", () => {
      describe("email is wrong", () => {
        it("should return 401", async () => {
          // Test logic for incorrect email
        });
      });

      describe("password is wrong", () => {
        it("should return 401", async () => {
          // Test logic for incorrect password
        });
      });

      describe("both correct", () => {
        it("should return 200", async () => {
          // Test logic for correct email and password
        });
      });
    });

    describe("email is given, but password is missing", () => {
      it("should return 400", async () => {
        // Test logic for missing password
      });
    });

    describe("email is missing, but password is given", () => {
      it("should return 400", async () => {
        // Test logic for missing email
      });
    });
  });

  describe("POST /register", () => {
    describe("firstName, lastName, email, password, and passwordVerify are provided", () => {
      it("should return 201", async () => {
        // Test logic for all necessary fields provided
      });
    });

    describe("zero or more of the fields are not provided or wrong or not a unique email", () => {
      describe("firstName, lastName, email, password, and passwordVerify are not provided", () => {
        it("should return 400", async () => {
          // Test logic for missing all necessary fields
        });
      });

      describe("email, password, and passwordVerify are not provided", () => {
        it("should return 400", async () => {
          // Test logic for missing email, password, and passwordVerify
        });
      });

      describe("password and passwordVerify are not provided", () => {
        it("should return 400", async () => {
          // Test logic for missing password and passwordVerify
        });
      });

      describe("password and passwordVerify are wrong", () => {
        it("should return 400", async () => {
          // Test logic for incorrect password and passwordVerify
        });
      });

      describe("not unique email", () => {
        it("should return 400", async () => {
          // Test logic for a non-unique email
        });
      });
    });
  });
});


