const supertest = require("supertest");
const express1 = require("../app.js");
const model_blog = require("../models/model_blog");
const express1_listener = require("../index.js");
const model_user = require("../models/model_user.js");
const generate_token = require("../utils/generate_token.js");
const inicialized_db = require("./init_db.js");
const supertest1 = supertest(express1)


beforeAll(inicialized_db)

afterAll(() =>
{
    express1_listener.close();
    model_blog.mongoose_connection.close();
    model_user.mongoose_connection.close();
})

describe("add blog", () =>
{
    let collection_dump1;
    let collection_dump2;
    let request_respons;

    test("collection collection_dumb1", async () =>
    {
        collection_dump1 = await model_blog.modelBlog.find({});

        for (let i = 0; i < collection_dump1.length; i++)
        {
            collection_dump1[i] = collection_dump1[i].toJSON()
            collection_dump1[i]._id = collection_dump1[i]._id.toString();
        }

        expect(collection_dump1.length).toEqual(4)
    })

    test("post request", async () =>
    {

        request_respons = await supertest1
            .post("/api/blogs")
            .set("auth_token", inicial_users[1].token)
            .send(
                {
                    "title": "penki",
                    "author": "penktas",
                    "url": "http://google.lt5",
                    "likes": 5,
                })

        expect(request_respons.statusCode).toEqual(201);
    });



    test("collection collection_dumb2", async () =>
    {
        collection_dump2 = await model_blog.modelBlog.find({});

        for (let i = 0; i < collection_dump2.length; i++)
        {
            collection_dump2[i] = collection_dump2[i].toJSON()
            collection_dump2[i]._id = collection_dump2[i]._id.toString();
        }
        expect(collection_dump2.length).toEqual(5)
    })

    test("respons body equal", async () =>
    {
        expect(request_respons.body).toEqual(collection_dump2[4])
    })

    test("checking collection_dump1 and collection_dump2", async () =>
    {
        collection_dump1.push(
            {
                "title": "penki",
                "author": "penktas",
                "url": "http://google.lt5",
                "likes": 5,
                "__v": request_respons.body.__v,
                "_id": request_respons.body._id,
                "owner": inicial_users[1].user_name
            })
        expect(collection_dump1).toEqual(collection_dump2);
    })

})


