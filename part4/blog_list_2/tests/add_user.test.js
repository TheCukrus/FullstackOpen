const supertest = require("supertest");
const express1 = require("../app.js");
const model_user = require("../models/model_user.js");
const express1_listener = require("../index.js");
const model_blogs = require("../models/model_blog.js");
const generate_token = require("../utils/generate_token.js");

const supertest1 = supertest(express1)

beforeAll(async () =>
{
    await model_user.modelUser.deleteMany()

})

afterAll(() =>
{
    express1_listener.close();
    model_user.mongoose_connection.close();
    model_blogs.mongoose_connection.close();
})

describe("add user", () =>
{
    let collection_dump1;
    let collection_dump2;

    test("collection collection_dump1", async () =>
    {
        collection_dump1 = await model_user.modelUser.find({})

        expect(collection_dump1.length).toEqual(0);
    })

    test("send post type request", async () =>
    {
        const request_respons = await supertest1.post("/api/users")
            .send(
                {
                    "user_name": "vienas",
                    "password": "vienasvienas"
                })
        expect(request_respons.statusCode).toEqual(201);

    });

    test("send post type request with the same name", async () =>
    {
        const request_respons = await supertest1.post("/api/users")
            .send(
                {
                    "user_name": "vienas",
                    "password": "vienasvienas"
                })
        expect(request_respons.statusCode).toEqual(400);
    });

    test("send post type request with passwords length 7", async () =>
    {
        const request_respons = await supertest1.post("/api/users")
            .send(
                {
                    "user_name": "du",
                    "password": "vienasd"
                })
        expect(request_respons.statusCode).toEqual(503);
    })

    test("collection collection_dump2", async () =>
    {
        collection_dump2 = await model_user.modelUser.find({})
        collection_dump2[0] = collection_dump2[0].toJSON();
        expect(collection_dump2.length).toEqual(1);
    })

    test("checking collection_dump1 and collection_dump2 if they are equal", async () =>
    {
        collection_dump1.push(
            {
                "user_name": "vienas",
                "password": "vienasvienas",
                "_id": collection_dump2[0]._id,
                "__v": collection_dump2[0].__v,
                "token": generate_token("vienas", "vienasvienas")
            })

        expect(collection_dump2).toEqual(collection_dump1)
    })
})