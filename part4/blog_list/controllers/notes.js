import Blog from "../models/note.js";

const read = (request, response) =>
{
    Blog.Blog
        .find({})
        .then(blogs =>
        {
            response.json(blogs)
        })
}


const create = async (request, response) =>
{

    try
    {

        if (request.body.likes === undefined)
        {
            request.body.likes = 0;
        }

        const result1 = await Blog.Blog.create({
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
        console.log("klaida create controller", err);
        response.statusCode = 418;
        response.end();
    }
}



export default { create, read };