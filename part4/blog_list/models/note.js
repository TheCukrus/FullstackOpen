import mongoose from "mongoose";
import db1 from "../dbs/db1.js"

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) =>
  {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = db1.connection.model('Blog', blogSchema);



export default { Blog };