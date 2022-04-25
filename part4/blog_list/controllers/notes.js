import Blog from "../models/note.js";

const read = async (request, response) =>
{

    try
    {
        const result1 = await Blog.Blog.find({})

        response.statusCode = 200;
        response.json(result1);
        response.end();
    }
    catch (err)
    {
        console.log("klaida read controller:", err);
        response.statusCode = 418;
        response.end();
    }
}


const create = async (request, response) =>
{

    try
    {

        if (request.body.likes === undefined)
        {
            request.body.likes = 0;
        }
        if ((request.body.title === undefined) || (request.body.url === undefined))
        {
            response.statusCode = 400;
            response.end();
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

const remove = async (request, response) =>
{
    try
    {
        const result1 = await Blog.Blog.deleteOne({ "id": request.params.id });

        response.statusCode = 201
        response.json(result1);
    }
    catch (err)
    {
        console.log("klaida remove controller", err);

        response.statusCode = 418;
        response.end();
    }

}



export default { create, read, remove };