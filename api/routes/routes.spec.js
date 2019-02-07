const request = require("supertest");
const server = require("../server.js");
const db = require("../database/dbConfig.js");


jest.setTimeout(100000);

let testToken = "";

describe("routes.js", () => {
  describe("GET / endpoint test", () => {
    it("should respond with status code 200 OK", async () => {
      let response = await request(server.server).get("/");
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        "Sanity Check Server is Connected: https://one-line-a-day-2.herokuapp.com/"
      );
    });
  });
  describe("Register", () => {
    it("Respond with Status Code 201", async () => {
      await db("users").truncate();
      const body = {
        username: "user1",
        password: "pass",
        firstname: "first",
        lastname: "last",
        email: "email1"
      };
      let response = await request(server.server)
        .post("/api/register")
        .send(body);
      expect(response.body).toEqual([1]);
      expect(response.status).toEqual(201);
    });
  });

  describe("Login", () => {
    it("Respond with Status Code 200/Body: 1", async () => {
      const body = {
        username: "user1",
        password: "pass"
      };
      let response = await request(server.server)
        .post("/api/login")
        .send(body);
      testToken = response.body.token;
      console.log(testToken);
      expect(response.status).toEqual(200);
      expect(response.body.id).toEqual(1);
    });
  });
  describe("GET Users/ endpoint All Users", () => {
    it("Respond with status code 200 OK/Body: {user info}", async () => {
      const Headers = {
        Authorization: testToken
      };
      let response = await request(server.server)
        .get("/api/users")
        .send(Headers);
      expect(response.status).toEqual(200);
      const { id, username, email } = response.body[0];
      expect(id).toEqual(1);
      expect(username).toEqual("user1");
      expect(email).toEqual("email1");
    });
  });

  describe("Update User / endpoint User 1", () => {
    it("should respond with status code 202 Accepted/Body: 1", async () => {
      const body = {
        username: "user2",
        password: "pass",
        firstname: "first",
        lastname: "last",
        email: "email2",
        Authorization: testToken
      };
      let response = await request(server.server)
        .put("/api/users/1")
        .send(body);
      expect(response.status).toEqual(202);
      const res = response.body;
      expect(res).toEqual(1);
    });
  });

  describe("GET User / endpoint User 1", () => {
    it("Respond with status code 200 OK/Body: {user info}", async () => {
      const Headers = {
        Authorization: testToken
      };
      let response = await request(server.server)
        .get("/api/users/1")
        .send(Headers);
      expect(response.status).toEqual(200);
      const { id, username, email } = response.body[0];
      expect(id).toEqual(1);
      expect(username).toEqual("user2");
      expect(email).toEqual("email2");
    });
  });

  describe("Post Entry / endpoint User 1 entry 1", () => {
    it("should respond with status code 201 Created/Body: 1", async () => {
      await db("entries").truncate();
      const body = {
        entry: "entry",
        user_id: 1, //"1"
        Authorization: testToken
      };
      let response = await request(server.server)
        .post("/api/users/1/entries")
        .send(body);
      expect(response.status).toEqual(201);
      const res = response.body;
      expect(res).toEqual([1]);
    });
  });

  describe("GET Entry's / endpoint User 1 entries", () => {
    it("Respond with status code 200 OK/Body: {user info}", async () => {
      const Headers = {
        Authorization: testToken
      };
      let response = await request(server.server)
        .get("/api/users/1/entries")
        .send(Headers);
      expect(response.status).toEqual(200);
      const { id, entry, user_id } = response.body[0];
      expect(id).toEqual(1);
      expect(entry).toEqual("entry");
      expect(user_id).toEqual(1);
    });
  });

  describe("GET Entry 1 / endpoint User 1 entry 1", () => {
    it("Respond with status code 200 OK/Body: {user info}", async () => {
      const Headers = {
        Authorization: testToken
      };
      let response = await request(server.server)
        .get("/api/users/1/entries/1")
        .send(Headers);
      expect(response.status).toEqual(200);
      const { id, entry, user_id } = response.body[0];
      expect(id).toEqual(1);
      expect(entry).toEqual("entry");
      expect(user_id).toEqual(1);
    });
  });

  describe("Update Entry / endpoint User 1 Entry 1", () => {
    it("should respond with status code 202 Accepted/Body: 1", async () => {
      const body = {
        entry: "updated entry",
        user_id: 1,
        Authorization: testToken
      };
      let response = await request(server.server)
        .put("/api/users/1/entries/1")
        .send(body);
      expect(response.status).toEqual(202);
      const resp = response.body;
      expect(resp).toEqual(1);
    });
  });

  describe("Delete Entry 1/ endpoint User 1 Entry 1", () => {
    it("should respond with status code 204 No Content/Body: {}", async () => {
      const body = {
        Authorization: testToken
      };
      let response = await request(server.server)
        .delete("/api/users/1/entries/1")
        .send(body);
      expect(response.status).toEqual(204);
      const resp = response.body;
      expect(resp).toEqual({});
    });
  });

  describe("Delete User/ endpoint User 1", () => {
    it("should respond with status code 204 No Content/Body: {}", async () => {
      const body = {
        Authorization: testToken
      };
      let response = await request(server.server)
        .delete("/api/users/1")
        .send(body);
      expect(response.status).toEqual(204);
      const res = response.body;
      expect(res).toEqual({});
    });
  });
});
