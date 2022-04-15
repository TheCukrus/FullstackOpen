import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Blog from "./models/note.js";
import notes from "./controllers/notes.js"

const app = express()


//db
const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())


//endpoints
app.get('/api/blogs', notes.create)
app.post('/api/blogs', notes.post)





const PORT = 3003
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})