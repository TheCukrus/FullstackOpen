const supertest = require("supertest");
const express1 = require("../app.js");
const model_user = require("../models/model_user.js");
const express1_listener = require("../index.js");
const model_blogs = require("../models/model_blog.js");
const generate_token = require("../utils/generate_token.js");
const model_blog = require("../models/model_blog.js")

const supertest1 = supertest(express1)

const inicial_users = [
    { "user_name": "owner1", "password": "password1", "token": generate_token("owner1", "password1") },
    { "user_name": "owner2", "password": "password2", "token": generate_token("owner2", "password2") },
    { "user_name": "owner3", "password": "password3", "token": generate_token("owner3", "password3") },
    { "user_name": "owner4", "password": "password4", "token": generate_token("owner4", "password4") },];


const inicial_blogs = [
    { "title": "vienas", "author": "pirmas", "url": "http://google.lt1", "likes": 1, "owner": inicial_users[0].user_name },
    { "title": "du", "author": "antras", "url": "http://google.lt2", "likes": 2, "owner": inicial_users[1].user_name },
    { "title": "trys", "author": "trecias", "url": "http://google.lt3", "likes": 3, "owner": inicial_users[2].user_name },
    { "title": "keturi", "author": "ketvirtas", "url": "http://google.lt4", "likes": 4, "owner": inicial_users[3].user_name }
]

beforeAll(async () =>
{
    await model_blog.modelBlog.deleteMany()
    await model_user.modelUser.deleteMany();

    for (let i = 0; i < inicial_users.length; i++)    
    {
        //creating users
        await model_user.modelUser.create(inicial_users[i])
    }

    for (let i = 0; i < inicial_blogs.length; i++)    
    {
        //create blog
        let temp1 = await model_blog.modelBlog.create({
            ...inicial_blogs[i],
            "owner": inicial_users[i].user_name//add owner
        })
        temp1 = temp1.toJSON();

        //push created blog id to owners blogs area
        await model_user.modelUser.updateOne({ "user_name": inicial_users[i].user_name }, { "$push": { "blogs": temp1._id } });
    }
})


afterAll(() =>
{
    express1_listener.close();
    model_user.mongoose_connection.close();
    model_blogs.mongoose_connection.close();
})

describe("add user", () =>
{
    let collection_dump1;
    let collection_dump2;

    test("collection collection_dump1", async () =>
    {
        collection_dump1 = await model_user.modelUser.find({})
        collection_dump1 = collection_dump1.map(ele => ele.toJSON());
        expect(collection_dump1.length).toEqual(4);
    })

    test("send post type request", async () =>
    {
        const request_respons = await supertest1.post("/api/users")
            .send(
                {
                    "user_name": "vienas",
                    "password": "vienasvienas"
                })
        expect(request_respons.statusCode).toEqual(201);

    });

    test("send post type request with the same name", async () =>
    {
        const request_respons = await supertest1.post("/api/users")
            .send(
                {
                    "user_name": "vienas",
                    "password": "vienasvienas"
                })
        expect(request_respons.statusCode).toEqual(400);
    });

    test("send post type request with passwords length 7", async () =>
    {
        const request_respons = await supertest1.post("/api/users")
            .send(
                {
                    "user_name": "du",
                    "password": "vienasd"
                })
        expect(request_respons.statusCode).toEqual(503);
    })

    test("collection collection_dump2", async () =>
    {
        collection_dump2 = await model_user.modelUser.find({})
        collection_dump2 = collection_dump2.map(ele => ele.toJSON());
        expect(collection_dump2.length).toEqual(5);
    })

    test("checking collection_dump1 and collection_dump2 if they are equal", async () =>
    {
        collection_dump1.push(
            {
                "user_name": "vienas",
                "password": "vienasvienas",
                "_id": collection_dump2[4]._id,
                "__v": collection_dump2[4].__v,
                "token": generate_token("vienas", "vienasvienas"),
                "blogs": []
            })

        expect(collection_dump2).toEqual(collection_dump1)
    })
})