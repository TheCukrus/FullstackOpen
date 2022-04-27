import mongoose from "mongoose"
import database_1 from "../databases/database_1.js"

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON',
  {
    transform: (document, returnedObject) =>
    {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const model_blog = database_1.connection.model('blog', blogSchema);

export default model_blog;