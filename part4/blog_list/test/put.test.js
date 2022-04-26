import note from "../models/note.js";
import db1 from "../dbs/db1.js";
import list_helper from "../utils/list_helper.js";
import supertest from "supertest";
import app from "../app.js";

//supertest1 => 
const supertest1 = supertest(app.app)

describe("all tests", () =>
{



    beforeAll(async () =>
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

    })

    afterAll(async () =>
    {
        await db1.disconnect();
        app.app_listen.close();
    })

    let id;
    test("get id of post", async () =>
    {
        const result1 = await note.Blog.find({})
        expect(result1.length).toEqual(3);

        id = result1[1].id;
    })

    test("does return 201 statusCode", async () =>
    {
        const result1 = await supertest1.put(`/api/blogs/${id}`)
            .send(
                {
                    "title": "temp20",
                    "author": "asee",
                    "url": "/api/blogs",
                    "likes": 51
                })
        expect(result1.statusCode).toEqual(201);
    });

    test("does it change data", async () =>
    {
        let temp;
        const result1 = await note.Blog.find({});
        for (let i = 0; i < result1.length; i++)
        {
            if (result1[i].id === id)
            {
                temp = result1[i];
            }
        }
        expect(temp !== undefined).toBe(true);
        expect(temp.title).toEqual("temp20");
        
    })

})