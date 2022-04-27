import model_blog from "../models/model_blog.js"

//CRUD

//create
const create = async (request, response) =>
{
    try
    {
        if (request.body.likes === undefined)
        {
            request.body.likes = 0
        }

        if ((request.body.title === undefined) || (request.body.url === undefined))
        {
            response.statusCode = 400
            response.end()
        }

        const result1 = await model_blog.create({
            "title": request.body.title,
            "author": request.body.author,
            "url": request.body.url,
            "likes": request.body.likes
        })

        response.statusCode = 201;
        response.end();
    }
    catch (err)
    {
        response.statusCode = 418
        response.end()
    }
}

//read
const read = async (request, response) =>
{
    try
    {
        const result1 = await model_blog.find({})

        response.statusCode = 200
        response.json(result1)
    }
    catch (err)
    {
        console.log("controller_blog.read", err)
        response.statusCode = 418
        response.end()
    }
}

//update
const update = async (request, response) =>
{
    if (request.params.id === undefined)
    {
        response.statusCode = 400
        response.end()
    }

    if ((request.body instanceof Object) === false)
    {
        response.statusCode = 400
        response.end()
    }

    try
    {
        const result1 = await model_blog.findByIdAndUpdate(
            request.params.id,
            {
                "title": request.body.title,
                "author": request.body.author,
                "url": request.body.url,
                "likes": request.body.likes
            })

        response.statusCode = 200
        response.end()
    }
    catch (err)
    {
        response.statusCode = 418;
        response.end();
    }
}

//remove
const remove = async (request, response) =>
{
    if (request.params.id === undefined)
    {
        response.statusCode = 400
        response.end()
    }

    try
    {
        const result1 = await model_blog.deleteOne({ "id": request.params.id })

        response.statusCode = 200
        response.end()
    }
    catch (err)
    {
        response.statusCode = 418
        response.end()
    }
}

export default { create, read, update, remove }