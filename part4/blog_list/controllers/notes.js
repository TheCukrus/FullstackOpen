import Blog from "../models/note.js";

const read = (request, response) =>
{
    Blog
        .find({})
        .then(blogs =>
        {
            response.json(blogs)
        })
}


const create = (request, response) =>
{
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result =>
        {
            response.status(201).json(result)
        })
}


export default { create, read };