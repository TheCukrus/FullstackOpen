const supertest = require("supertest");
const express1 = require("../app.js");
const modelBlog = require("../models/model_blog");
const express1_listener = require("../index.js");
const  modelUser = require("../models/model_user.js");

const supertest1 = supertest(express1)

const inicial_blogs = [
    { "title": "vienas", "author": "pirmas", "url": "http://google.lt", "likes": 1 },
    { "title": "du", "author": "antras", "url": "http://google.lt", "likes": 2 },
    { "title": "trys", "author": "trecias", "url": "http://google.lt", "likes": 3 },
    { "title": "keturi", "author": "ketvirtas", "url": "http://google.lt", "likes": 4 }
]

beforeAll(async () =>
{
    await modelBlog.modelBlog.deleteMany()

    for (let i = 0; i < inicial_blogs.length; i++)
    {
        await modelBlog.modelBlog.create(inicial_blogs[i])
    }
})

afterAll(() =>
{
    express1_listener.close();
    modelBlog.mongoose_connection.close();
    modelUser.mongoose_connection.close();
})

describe("update blog", () =>
{
    let collection_dump1;
    let collection_dump2;
    let request_respons;

    test("collection collection_dumb1", async () =>
    {
        collection_dump1 = await modelBlog.modelBlog.find({});

        for (let i = 0; i < collection_dump1.length; i++)
        {
            collection_dump1[i] = collection_dump1[i].toJSON()
            collection_dump1[i]._id = collection_dump1[i]._id.toString();
        }

        expect(collection_dump1.length).toEqual(4)
    })

    test("update request send", async () =>
    {

        request_respons = await supertest1.put(`/api/blogs/${collection_dump1[2]._id}`)
            .send(
                {
                    "title": "penki",
                    "author": "penktas",
                    "url": "http://google.lt",
                    "likes": 5
                })
        expect(request_respons.statusCode).toEqual(200);
    });


    test("collection collection_dumb2", async () =>
    {
        collection_dump2 = await modelBlog.modelBlog.find({});

        for (let i = 0; i < collection_dump2.length; i++)
        {
            collection_dump2[i] = collection_dump2[i].toJSON()
            collection_dump2[i]._id = collection_dump2[i]._id.toString();
        }
        expect(collection_dump2.length).toEqual(4)
    })

    test("checking collection_dump2 and collection_dump1 modified", async () =>
    {
        collection_dump1[2].title = "penki";
        collection_dump1[2].author = "penktas";
        collection_dump1[2].likes = 5;


        expect(collection_dump2).toEqual(collection_dump1);
    })

})

