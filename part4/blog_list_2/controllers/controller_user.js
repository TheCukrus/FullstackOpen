const express = require("express");
const model_user = require("../models/model_user.js");
const model_blog = require("../models/model_blog.js");
const generate_token = require("../utils/generate_token.js");
const hash_password = require("../utils/hash_password.js");

const router_users = express.Router();

router_users.get("/", async (request, response) =>
{
    try
    {
        const result1 = await model_user.modelUser.find({}).populate({ "path": "blogs", "model": model_blog.modelBlog });

        for (let i = 0; i < result1.length; i++)
        {
            delete result1[i]._doc.password;
            delete result1[i]._doc.token;
            delete result1[i]._doc.__v;
            delete result1[i]._doc._id;
            delete result1[i]._doc.blogs.owner;

        }

        response.statusCode = 200;
        response.json(result1);
    }
    catch (err)
    {
        response.statusCode = 404;
        response.end();
    }
})

router_users.get("/:user_name", async (request, response) =>
{
    try
    {
        //"populated method" make the same thing as loop at botom, changes from db
        let result1 = await model_user.modelUser.findOne({ "user_name": request.params.user_name }).populate({ "path": "blogs", "model": model_blog.modelBlog });
        result1 = result1.toJSON();

        //filtering
        delete result1.password;
        delete result1.token;
        delete result1.__v;
        for (let i = 0; i < result1.blogs.length; i++)
        {
            delete result1.blogs[i].owner;
            delete result1.blogs[i].__v;
        }



        //searching blogs from arr which have blog id
        // for (let i = 0; i < result1.blogs.length; i++)
        // {
        //     result1.blogs[i] = await model_blog.modelBlog.findOne({ "id": result1.blogs[i] })

        // }

        response.statusCode = 200;
        response.json(result1);
    }
    catch (err)
    {
        response.statusCode = 404;
        response.end();
    }
})

router_users.post("/", async (request, response) =>
{
    if (request.body.user_name === undefined)
    {
        response.statusCode = 401;
        response.end();
        return;
    }

    if (request.body.password === undefined)
    {
        response.statusCode = 401;
        response.end();
        return;
    }

    try
    {
        //check if user_name is already in db
        const result0 = await model_user.modelUser.findOne({ "user_name": request.body.user_name });

        if (result0 !== null)
        {
            response.statusCode = 400;
            response.end();
            return;
        }

        const result1 = await model_user.modelUser.create(
            {
                "user_name": request.body.user_name,
                "password": hash_password(request.body.password)
            }
        );

        response.statusCode = 201;
        response.end();
    }
    catch (err)
    {
        console.log(err)
        response.statusCode = 503;
        response.end();
    }
})

router_users.delete("/:user_name", async (request, response) =>
{
    try
    {
        const result1 = await model_user.modelUser.deleteOne({ "user_name": request.params.user_name })

        if (result1 === null)
        {
            response.statusCode = 404;
            response.end();
        }
        else
        {
            response.statusCode = 200;
            response.end();
        }
    }
    catch (err)
    {
        response.statusCode = 503;
        response.end();

    }
})

router_users.put("/:user_name", async (request, response) =>
{
    try
    {
        const result1 = await model_user.modelUser.updateOne({ "user_name": request.params.user_name }, request.body);

        if (result1.matchedCount === 0)
        {
            response.statusCode = 404;
            response.end();
            return;
        }


        response.statusCode = 200;
        response.end();
    }
    catch (err)
    {
        response.statusCode = 400;
        response.end();
    }
})

module.exports = router_users;
