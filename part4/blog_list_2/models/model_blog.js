const mongoose = require("mongoose");
const config = require("../utils/config.js")

const mongoose_connection = mongoose.createConnection(config.MONGODB_URI)

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true },
    owner: { type: String, required: true, ref: "user" }
})

const modelBlog = mongoose_connection.model('Blog', blogSchema);

module.exports = {
    modelBlog,
    mongoose_connection
}




