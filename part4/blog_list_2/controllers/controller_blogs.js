const express = require("express");
const modelBlog = require("../models/model_blog.js");
const model_user = require("../models/model_user.js");

const router_blogs = express.Router();

router_blogs.get('/', async (request, response) =>
{
    try
    {
        const result1 = await modelBlog.modelBlog.find({})
        response.statusCode = 200;
        response.json(result1);
    }
    catch (err)
    {
        response.statusCode = 404;
        response.end();
    }
})

router_blogs.post('/', async (request, response) =>
{

    //input verification
    if (request.headers.auth_token === undefined)
    {
        response.statusCode = 401;
        response.end();
        return;
    }


    try
    {
        //check if user exist in db
        let result0 = await model_user.modelUser.findOne({ "token": request.headers.auth_token });

        result0 = result0.toJSON();

        if (result0.token !== request.headers.auth_token)
        {
            response.statusCode = 401;
            response.end();
            return;
        }


        //creating new blog
        const result1 = await modelBlog.modelBlog.create(
            {
                "title": request.body.title,
                "author": request.body.author,
                "url": request.body.url,
                "likes": request.body.likes,
                "owner": result0.user_name
            }
        );

        response.statusCode = 201;
        response.json(result1);
    }
    catch (err)
    {
        response.statusCode = 503;
        response.end();
    }
})

router_blogs.delete('/:id', async (request, response) =>
{
    try
    {
        const result1 = await modelBlog.modelBlog.findByIdAndDelete(request.params.id);

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

router_blogs.put('/:id', async (request, response) =>
{
    try
    {
        await modelBlog.modelBlog.updateOne({ "_id": request.params.id }, request.body);

        response.statusCode = 200;
        response.end();
    }
    catch (err)
    {
        response.statusCode = 400;
        response.end();
    }
})

module.exports = router_blogs;