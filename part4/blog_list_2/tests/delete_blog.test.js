const supertest = require("supertest");
const express1 = require("../app.js");
const model_user = require("../models/model_user")
const model_blog = require("../models/model_blog");
const express1_listener = require("../index.js");
const generate_token = require("../utils/generate_token.js");


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
    model_blog.mongoose_connection.close();
    model_user.mongoose_connection.close();
})

describe("delete blog", () =>
{

    let collection_dump1;
    let collection_dump2;
    let request_response;

    test("collection collection_dumb1", async () =>
    {
        collection_dump1 = await model_blog.modelBlog.find({});

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
        collection_dump2 = await model_blog.modelBlog.find({});

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


