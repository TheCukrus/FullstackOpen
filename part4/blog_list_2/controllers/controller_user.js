const express = require("express");
const model_user = require("../models/model_user.js");
const generate_token = require("../utils/generate_token.js");

const user_router_blogs = express.Router();


user_router_blogs.post("/", async (request, response) =>
{
    try
    {
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
                "password": request.body.password,
                "token": generate_token(request.body.user_name, request.body.password)
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

user_router_blogs.delete("/:user_name", async (request, response) =>
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

user_router_blogs.put("/:user_name", async (request, response) =>
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

module.exports = user_router_blogs;
