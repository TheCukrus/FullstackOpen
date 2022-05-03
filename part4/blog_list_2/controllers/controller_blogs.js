const express = require("express");
const model_blog = require("../models/model_blog.js");
const model_user = require("../models/model_user.js");

const router_blogs = express.Router();

router_blogs.get('/', async (request, response) =>
{
    try
    {
        const result1 = await model_blog.modelBlog.find({})
        // .populate({"path":"owner", "model": model_user.modelUser});

        for (let i = 0; i < result1.length; i++)
        {
            result1[i]._doc.owner = await model_user.modelUser.findOne({ "user_name": result1[i]._doc.owner })
            delete result1[i]._doc.owner._doc.password;
            delete result1[i]._doc.__v;
            delete result1[i]._doc.owner._doc.__v;
            delete result1[i]._doc.owner._doc.token;
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

router_blogs.get('/:id', async (request, response) =>
{
    try
    {
        const result1 = await model_blog.modelBlog.findOne({ "id": request.params.title }, { "_id": 0, "__v": 0 });

        result1._doc.owner = await model_user.modelUser.findOne({ "title": result1._doc.owner }, { "password": 0, "token": 0, "_id": 0, "__v": 0 })

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
        let resolved_user = await model_user.modelUser.findOne({ "token": request.headers.auth_token });

        resolved_user = resolved_user.toJSON();

        if (resolved_user.token !== request.headers.auth_token)
        {
            response.statusCode = 401;
            response.end();
            return;
        }


        //creating new blog
        const new_blog = await model_blog.modelBlog.create(
            {
                "title": request.body.title,
                "author": request.body.author,
                "url": request.body.url,
                "likes": request.body.likes,
                "owner": resolved_user.user_name,
            }
        );

        //add created blog id to users blogs area
        await model_user.modelUser.findOneAndUpdate({ "user_name": resolved_user.user_name }, { "$push": { "blogs": new_blog._id } })

        response.statusCode = 201;
        response.json(new_blog);
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
        let resolved_blog = await model_blog.modelBlog.findByIdAndDelete(request.params.id);
        resolved_blog = resolved_blog.toJSON();

        if (resolved_blog === null)
        {
            response.statusCode = 404;
            response.end();
            return;
        }



        const updateStatus = await model_user.modelUser.updateOne({ "user_name": resolved_blog.owner }, { "$pull": { "blogs": resolved_blog._id } });

        if (updateStatus.modifiedCount === 0)
        {
            response.statusCode = 503;
            response.end();
            return;
        }

        response.statusCode = 200;
        response.end();

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
        await model_blog.modelBlog.updateOne({ "_id": request.params.id }, request.body);

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