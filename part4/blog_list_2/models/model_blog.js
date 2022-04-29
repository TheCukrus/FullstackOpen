const mongoose = require("mongoose");
const config = require("../utils/config.js")

const mongoose_connection = mongoose.createConnection(config.MONGODB_URI)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const modelBlog = mongoose_connection.model('Blog', blogSchema);

module.exports = {
    modelBlog,
    mongoose_connection
}




