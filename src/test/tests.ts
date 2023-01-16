import request from "supertest";
import { server } from "../index";
import { HttpStatusCode, UserData } from "../models/interfaces";
import { v4 as uuidv4 } from 'uuid';
import { users } from "../models/userModels";


const testedUser: UserData = {
  username: "One",
  age: 18,
  hobbies: ["one", "two"],
};
const updatedUser: UserData = {
  username: "Two",
  age: 21,
  hobbies: ["three", "four"],
};
const nonFullUser = {
  age: 18,
};


describe("1 SCENARIO, SUCCESS empty DB -> add user -> get user -> update user -> delete user-> get user-> empty DB", () => {
  
  let testedUserId: string;
  afterAll((done) => {
    server.close(() => {});
    done();
  });

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(res.status).toBe(HttpStatusCode.OK);
    expect(users).toEqual([]);
  });
  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const res = await request(server).post("/api/users").send(testedUser);
    expect(res.statusCode).toBe(HttpStatusCode.CREATED);
    expect(res.body).toMatchObject(testedUser);
    testedUserId = res.body.id;
  });
  it("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const res = await request(server).get(`/api/users/${testedUserId}`);
    expect(res.statusCode).toBe(HttpStatusCode.OK);
    expect(res.body).toMatchObject(testedUser);
  });
  it("We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const res = await request(server)
      .put(`/api/users/${testedUserId}`)
      .send(updatedUser);
    expect(res.status).toBe(HttpStatusCode.OK);
    expect(res.body).toMatchObject(updatedUser);
    expect(res.body.id).toBe(testedUserId);
  });
  it("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res = await request(server).delete(`/api/users/${testedUserId}`);
    expect(res.status).toBe(HttpStatusCode.NO_CONTENT);
  });
  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const res = await request(server).get(`/api/users/${testedUserId}`);
    expect(res.statusCode).toBe(HttpStatusCode.NOT_FOUND);
  });
  it("Get all records with a GET api/users request (an empty array is expected, we remove the one user)", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(res.status).toBe(HttpStatusCode.OK);
    expect(users).toEqual([]);
  });
});


describe("2 SCENARIO, ERROR HANDLING invalid data", () => {

  afterAll((done) => {
    server.close(() => {});
    done();
  });
    
  it("With a GET api/user/{unExistUser not uuid} request, Server should answer with status code 400 and corresponding message if userId is invalid", async () => {
    const res = await request(server).get(`/api/users/non-uuid-user`);
    expect(res.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.text).toEqual(expect.anything());
  });
  it("With a POST api/users request with non-JSON data (server should answer with status code 500)", async () => {
    const res = await request(server).post("/api/users").send("Non-JSON-data");
    expect(res.statusCode).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(res.text).toEqual(expect.anything());
  });
  it("With a POST api/users request with non-USER type data (Server should answer with status code 400 and message that body does not contain required fields)", async () => {
    const res = await request(server)
      .post("/api/users")
      .send(JSON.stringify(nonFullUser));
    expect(res.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.text).toEqual(expect.anything());
  });

  it("With a DELETE api/user/{unExistUser not uuid} request, Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const res = await request(server).delete(`/api/users/non-uuid-user`);
    expect(res.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.text).toEqual(expect.anything());
  });
  it("With a PUT api/user/{unExistUser not uuid} request, Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const res = await request(server)
      .put(`/api/users/non-uuid-user`)
      .send(testedUser);
    expect(res.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.text).toEqual(expect.anything());
  });
});


describe("3 SCENARIO, ERROR HANDLING user NOT exist", () => {

  afterAll((done) => {
    server.close(() => {});
    done();
  });
  
  it("With a GET api/user/{unExistUser uuid} request, Server should answer with status code 404", async () => {
    const res = await request(server).get(`/api/users/${uuidv4()}`);
    expect(res.statusCode).toBe(HttpStatusCode.NOT_FOUND);
  });
  it("With a DELETE api/user/{unExistUser uuid} request, Server should answer with status code 404 and message that record with id === userId doesn't exist", async () => {
    const res = await request(server).delete(`/api/users/${uuidv4()}`);
    expect(res.statusCode).toBe(HttpStatusCode.NOT_FOUND);
    expect(res.text).toEqual(expect.anything());
  });
  it("With a PUT api/user/{unExistUser uuid} request, Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist", async () => {
    const res = await request(server)
      .put(`/api/users/${uuidv4()}`)
      .send(testedUser);
    expect(res.statusCode).toBe(HttpStatusCode.NOT_FOUND);
    expect(res.text).toEqual(expect.anything());
  });  
});
