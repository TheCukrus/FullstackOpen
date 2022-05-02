const mongoose = require("mongoose");
const config = require("../utils/config.js");

const mongoose_connection = mongoose.createConnection(config.MONGODB_URI);


const user_schema = new mongoose.Schema(
    {
        user_name: { type: String, required: true },
        password: { type: String, required: true, minlength: 8 },
        token: { type: String, required: true }
    })


const modelUser = mongoose_connection.model("user", user_schema);

module.exports =
{
    modelUser,
    mongoose_connection
}