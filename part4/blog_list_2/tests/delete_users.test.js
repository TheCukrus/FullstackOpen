const supertest = require("supertest");
const express1 = require("../app.js");
const model_user = require("../models/model_user.js");
const express1_listener = require("../index.js");
const model_blogs = require("../models/model_blog.js")

const supertest1 = supertest(express1)

const init = [
    {
        "user_name": "user_name1",
        "password": "password1"
    },
    {
        "user_name": "user_name2",
        "password": "password2"
    },
    {
        "user_name": "user_name3",
        "password": "password3"
    }]

beforeAll(async () =>
{
    await model_user.modelUser.deleteMany()

    for (let i = 0; i < init.length; i++)
    {
        await model_user.modelUser.create(init[i])
    }
})

afterAll(() =>
{
    express1_listener.close();
    model_user.mongoose_connection.close();
    model_blogs.mongoose_connection.close();
})

describe("delete user", () =>
{
    let collection_dump1;
    let collection_dump2;

    test("collection collection_dump1", async () =>
    {
        collection_dump1 = await model_user.modelUser.find({})

        for (let i = 0; i < collection_dump1.length; i++)
        {
            collection_dump1[i] = collection_dump1[i].toJSON();
        }

        expect(collection_dump1.length).toEqual(3);
    })



    test("send delete type request", async () =>
    {
        const request_respons = await supertest1.delete(`/api/users/${init[1].user_name}`)

        expect(request_respons.statusCode).toEqual(200);

    });


    test("collection collection_dump2", async () =>
    {
        collection_dump2 = await model_user.modelUser.find({})

        for (let i = 0; i < collection_dump2.length; i++)
        {
            collection_dump2[i] = collection_dump2[i].toJSON();
        }
        expect(collection_dump2.length).toEqual(2);
    })

    test("checking collection_dump1 and collection_dump2 if they are equal", async () =>
    {
        collection_dump1.splice(1, 1);

        expect(collection_dump2).toEqual(collection_dump1)
    })
})