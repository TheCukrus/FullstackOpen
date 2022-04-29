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

describe("get all blogs", () =>
{
    let request_result;
    let collection_dump1;

    test("request successfully send", async () =>
    {
        request_result = await supertest1.get("/api/blogs");
    });

    test("request_result statusCode is 200", () =>
    {
        expect(request_result.statusCode).toEqual(200);
    });

    test("collection successfully dumped collection_dump1", async () =>
    {
        collection_dump1 = await modelBlog.modelBlog.find({});

        for (let i = 0; i < collection_dump1.length; i++)
        {
            collection_dump1[i] = collection_dump1[i].toJSON();
            collection_dump1[i]._id = collection_dump1[i]._id.toString();
        }

        expect(collection_dump1).toEqual(request_result.body);
    })
})


