const supertest = require("supertest");
const express1 = require("../app.js");
const model_blog = require("../models/model_blog");
const express1_listener = require("../index.js");
const model_user = require("../models/model_user.js");
const request = require("superagent");
const generate_token = require("../utils/generate_token.js");
const supertest1 = supertest(express1)

const inicial_users = [
    { "user_name": "owner1", "password": "password1", "token": generate_token("owner1", "password1") },
    { "user_name": "owner2", "password": "password2", "token": generate_token("owner2", "password2") },
    { "user_name": "owner3", "password": "password3", "token": generate_token("owner3", "password3") },
    { "user_name": "owner4", "password": "password4", "token": generate_token("owner4", "password4") },];


const inicial_blogs = [
    { "title": "vienas", "author": "pirmas", "url": "http://google.lt", "likes": 1, "owner": inicial_users[0].user_name },
    { "title": "du", "author": "antras", "url": "http://google.lt", "likes": 2, "owner": inicial_users[1].user_name },
    { "title": "trys", "author": "trecias", "url": "http://google.lt", "likes": 3, "owner": inicial_users[2].user_name },
    { "title": "keturi", "author": "ketvirtas", "url": "http://google.lt", "likes": 4, "owner": inicial_users[3].user_name }
]

beforeAll(async () =>
{
    await model_blog.modelBlog.deleteMany()
    await model_user.modelUser.deleteMany();

    for (let i = 0; i < inicial_users.length; i++)    
    {
        await model_user.modelUser.create(inicial_users[i])
    }

    for (let i = 0; i < inicial_blogs.length; i++)    
    {
        await model_blog.modelBlog.create(inicial_blogs[i])
    }
})

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
                    "url": "http://google.lt",
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
                "url": "http://google.lt",
                "likes": 5,
                "__v": request_respons.body.__v,
                "_id": request_respons.body._id,
                "owner": inicial_users[1].user_name
            })
        expect(collection_dump1).toEqual(collection_dump2);
    })

})


