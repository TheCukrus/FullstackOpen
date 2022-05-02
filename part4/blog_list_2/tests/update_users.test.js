const supertest = require("supertest");
const express1 = require("../app.js");
const model_user = require("../models/model_user.js");
const express1_listener = require("../index.js");
const model_blogs = require("../models/model_blog.js");
const generate_token = require("../utils/generate_token.js");

const supertest1 = supertest(express1)

const init = [
    {
        "user_name": "user_name1",
        "password": "password1",
        "token": generate_token(this.user_name, this.password)
    },
    {
        "user_name": "user_name2",
        "password": "password2",
        "token": generate_token(this.user_name, this.password)
    },
    {
        "user_name": "user_name3",
        "password": "password3",
        "token": generate_token(this.user_name, this.password)
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

describe("update user", () =>
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

    test("send put type request", async () =>
    {
        const request_respons = await supertest1.put(`/api/users/${init[1].user_name}`)
            .send(
                {
                    "user_name": "vienas",
                    "password": "vienasvienas"
                })
        expect(request_respons.statusCode).toEqual(200);

    });



    test("collection collection_dump2", async () =>
    {
        collection_dump2 = await model_user.modelUser.find({})
        for (let i = 0; i < collection_dump2.length; i++)
        {
            collection_dump2[i] = collection_dump2[i].toJSON();
        }

        expect(collection_dump2.length).toEqual(3);
    })

    test("checking collection_dump1 and collection_dump2 and if collection_dump2 modified", async () =>
    {
        collection_dump1[1] =
        {
            "user_name": "vienas",
            "password": "vienasvienas",
            "__v": 0,
            "_id": collection_dump2[1]._id,
            "token": generate_token(this.user_name, this.password)
        }

        expect(collection_dump2).toEqual(collection_dump1)
    })
})