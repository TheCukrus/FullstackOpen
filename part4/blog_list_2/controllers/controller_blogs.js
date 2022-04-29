const express = require("express");
const modelBlog = require("../models/model_blog.js");

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
    try
    {
        const result1 = await modelBlog.modelBlog.create(request.body);

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
        await modelBlog.modelBlog.findByIdAndUpdate(request.params.id, request.body);

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