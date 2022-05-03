const supertest = require("supertest");
const close_databases = require("./close");
const express1 = require("../app");
const init_db = require("./init_db.js");

const supertesst1 = supertest(express1);

beforeAll(init_db.init)

afterAll(close_databases);

describe("login", () =>
{
    let request_response;
    test("post request", async () =>
    {
        request_response = await supertesst1.post("/api/login")
            .send(
                {
                    "user_name": init_db.inicial_users[1].user_name,
                    "password": init_db.inicial_users[1].password
                })
        expect(request_response.statusCode).toBe(200);
    })

    test("request_responst body has valid token", () =>
    {
        expect(request_response.body.token).toBe(init_db.inicial_users[1].token)
    })

})