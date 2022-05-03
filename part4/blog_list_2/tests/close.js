const model_user = require("../models/model_user.js");
const express1_listener = require("../index.js");
const model_blogs = require("../models/model_blog.js");





const close_databases = () =>
{
    express1_listener.close();
    model_user.mongoose_connection.close();
    model_blogs.mongoose_connection.close();
}


module.exports = close_databases;