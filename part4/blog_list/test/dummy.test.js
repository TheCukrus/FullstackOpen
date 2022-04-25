import note from "../models/note.js";
import db1 from "../dbs/db1.js";
import list_helper from "../utils/list_helper.js";
import supertest from "supertest";
import app from "../app.js";

//supertest1 => 
const supertest1 = supertest(app.app)


test("drop database", async () =>
{
    await db1.drop_db();

    await note.Blog.create({
        "title": "temp",
        "author": "as",
        "url": "/api/blogs",
        "likes": 50
    });

    await note.Blog.create({
        "title": "temp2",
        "author": "as",
        "url": "/api/blogs",
        "likes": 501
    });

    await note.Blog.create({
        "title": "temp3",
        "author": "asf",
        "url": "/api/blogs",
        "likes": 60
    })

    const result1 = await note.Blog.find();
    console.log(result1);

})


test("blog has some blogs, equals all blogs likes sum", async () =>
{
    const result1 = await list_helper.totalLikes();
    expect(result1).toBe(611);
})


describe("favoriteBlog", () =>
{

    const a = {
        "title": "temp2",
        "author": "as",
        "likes": 501
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
        "blogs": 2
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

describe("does __v or _id is in the db", () =>
{

    test("deleting __v and _id", async () =>
    {
        const result1 = await supertest1.get("/api/blogs")
        //   expect(result1[0]["body"]).toEqual(undefined)
        console.log(result1.body[0])
    })
})

describe("test for defining an id", () =>
{
    test("check if id is defined", async () =>
    {
        const result1 = await supertest.get("api/blogs:id");
        expect(result1).toBeDefined();
        console.log(result1);
    })
})

test("paskutinis testas", async () =>
{
    await db1.disconnect();
    app.app_listen.close();
})