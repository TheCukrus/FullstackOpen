import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema);


const mongoUrl = 'mongodb+srv://cluster0.f2drs.mongodb.net/db3'
mongoose.connect(mongoUrl, { user: "Zenia", pass: "Zenia", authSource: "admin" })


export default Blog;