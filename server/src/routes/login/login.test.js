const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Login API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test POST /register", () => {
    completeUserData = {
      username: "testUser",
      password: "12345",
      email: "test@gmail.com",
      fullname: "Tester",
    };

    missingUserData = {
      username: "testUser",
      fullname: "Tester",
      password: "12345",
    };

    test("It should response with 200 success", async () => {
      const response = await request(app)
        .post("/v1/auth/register")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/auth/register")
        .send(missingUserData)
        .expect("Content-Type", /json/)
        .expect(400);
    });

    test('It should respond with 200 successful login', async () => {
        const response = await request(app)
          .post('/v1/auth/login') // Change the route based on your app
          .send({
            username: 'testUser',
            password: '12345',
          });
    
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Logged in successfully');
        expect(response.headers['set-cookie']).toBeDefined(); // Check if the cookie is set
      });

      test('It should respond with 401 unauthorized login', async () => {
        const response = await request(app)
          .post('/v1/auth/login') // Change the route based on your app
          .send({
            username: 'testUser',
            password: '1245', // Incorrect pwd
          });
    
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Username or password incorrect");
      });
  });
});
