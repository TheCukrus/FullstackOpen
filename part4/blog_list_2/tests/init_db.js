const model_blog = require("../models/model_blog")
const model_user = require("../models/model_user.js")
const generate_token = require("../utils/generate_token.js")

const inicial_users = [
    { "user_name": "owner1", "password": "password1" },
    { "user_name": "owner2", "password": "password2" },
    { "user_name": "owner3", "password": "password3" },
    { "user_name": "owner4", "password": "password4" },]


const inicial_blogs = [
    { "title": "vienas", "author": "pirmas", "url": "http://google.lt1", "likes": 1, "owner": inicial_users[0].user_name },
    { "title": "du", "author": "antras", "url": "http://google.lt2", "likes": 2, "owner": inicial_users[1].user_name },
    { "title": "trys", "author": "trecias", "url": "http://google.lt3", "likes": 3, "owner": inicial_users[2].user_name },
    { "title": "keturi", "author": "ketvirtas", "url": "http://google.lt4", "likes": 4, "owner": inicial_users[3].user_name }
]

const init = async () =>
{
    await model_blog.modelBlog.deleteMany()
    await model_user.modelUser.deleteMany()

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
}

module.exports = { init, inicial_blogs, inicial_users }