const supertest = require("supertest");
const express1 = require("../app.js");
const modelBlog = require("../models/model_blog");
const express1_listener = require("../index.js");

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
})

describe("delete blog", () =>
{

    let collection_dump1;
    let collection_dump2;
    let request_response;

    test("collection collection_dumb1", async () =>
    {
        collection_dump1 = await modelBlog.modelBlog.find({});

        for (let i = 0; i < collection_dump1.length; i++)
        {
            collection_dump1[i] = collection_dump1[i].toJSON()
            collection_dump1[i]._id = collection_dump1[i]._id.toString();
        }
    })

    test("send delete request", async () =>
    {
        request_response = await supertest1.delete(`/api/blogs/${collection_dump1[2]._id}`)
        expect(request_response.statusCode).toEqual(200);
    })

    test("collection collection_dumb2", async () =>
    {
        collection_dump2 = await modelBlog.modelBlog.find({});

        for (let i = 0; i < collection_dump2.length; i++)
        {
            collection_dump2[i] = collection_dump2[i].toJSON()
            collection_dump2[i]._id = collection_dump2[i]._id.toString();
        }
        expect(collection_dump2.length).toEqual(3)
    })

    test("collection_dump1 is equal collection_dump2 and modify", async () =>
    {
        collection_dump1.splice(2, 1)

        expect(collection_dump1).toEqual(collection_dump2);
    })


})


