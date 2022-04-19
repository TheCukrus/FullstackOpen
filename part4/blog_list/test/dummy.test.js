import list_helper from "../utils/list_helper.js";
import app from "../app.js";
import mongoose from "mongoose";
import supertest from "supertest";


test('dummy returns one', () =>
{
    const blogs = []

    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
})

test("blog has some blogs, equals all blogs likes sum", async () =>
{
    const result1 = await list_helper.totalLikes();
    expect(result1).toBe(3400);
})


describe("favoriteBlog", () =>
{

    const a = {
        "title": "vienas",
        "author": "as",
        "likes": 1000
    }


    test("favoriteBlog to find out whitch post has most likes", async () =>
    {
        const result1 = await list_helper.favoriteBlog();
        expect(result1).toEqual(a);
    })
})

describe("mostblogs", () =>
{

    const a = {
        "author": "as",
        "blogs": 6
    }
    test("mostblogs searches author who made most blogs and number of blogs", async () =>
    {
        const result1 = await list_helper.mostBlogs();
        expect(result1).toEqual(a);
    })
})

describe("supertest", () =>
{

    const supertest1 = supertest(app.app)

    test("supertest", async () =>
    {
        const result1 = await supertest1.get("/api/blogs")
        expect(result1.status).toEqual(200)
    })
})

test("paskutinis testas", async () =>
{
    await mongoose.disconnect();
    app.app_listen.close();
})