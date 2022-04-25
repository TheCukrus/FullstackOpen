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

describe("4.9*", () =>
{
    test("check if id is defined", async () =>
    {
        const result1 = await supertest1.get("/api/blogs");

        expect(result1.body[0].id).toBeDefined();
        console.log(result1);
    })
})

describe("4.10: blog list tests, step3", () =>
{
    test("checking how many post is in db", async () =>
    {
        const result0 = await supertest1.get("/api/blogs");
        expect(result0.body.length).toEqual(3);
    })

    test("making new post", async () =>
    {
        await supertest1.post("/api/blogs")
            .send({
                "title": "laikinasis",
                "author": "neas",
                "url": "/api/blogs",
                "likes": 49
            })
    })

    test("checking if new post added to the db", async () =>
    {
        const result1 = await supertest1.get("/api/blogs");
        expect(result1.body.length).toEqual(4);
    })

})

describe("4.11*: Blog list tests, step4", () =>
{
    test("creating test without likes property", async () =>
    {
        await supertest1.post("/api/blogs")
            .send(
                {
                    "title": "temp11",
                    "author": "assas",
                    "url": "/api/blogs"
                })
    })

    test("wathching blogs", async () =>
    {
        const result1 = await supertest1.get("/api/blogs")
        expect(result1.body[4].likes).toEqual(0);
    })

})


describe("4.12*: Blog list tests, step5", () =>
{
    test("testing post request without title", async () =>
    {
        const temp1 = await supertest1.post("/api/blogs")
            .send(
                {
                    "author": "a",
                    "url": "api/blogs",
                    "likes": 10
                }
            )
        expect(temp1.statusCode).toEqual(400);
    })

    test("testing post request without url", async () =>
    {
        const temp1 = await supertest1.post("/api/blogs")
            .send(
                {
                    "title": "betkas",
                    "author": "a",
                    "likes": 10
                }
            )
        expect(temp1.statusCode).toEqual(400);
    })
})

test("paskutinis testas", async () =>
{
    await db1.disconnect();
    app.app_listen.close();
})