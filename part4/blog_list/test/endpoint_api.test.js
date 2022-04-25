import note from "../models/note.js";
import db1 from "../dbs/db1.js";
// import list_helper from "../utils/list_helper.js";
// import supertest from "supertest";
import app from "../app.js";


describe("4.13 Blog list expansions, step1", () =>
{
    test("finding get all blogs", async () =>
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
        expect(result1.length).toBe(3);

        await note.Blog.findByIdAndRemove(result1[0].id);
        const result2 = await note.Blog.find();
        expect(result2.length).toBe(2);
    })

})

test("paskutinis testas", async () =>
{
    await db1.disconnect();
    app.app_listen.close();
})