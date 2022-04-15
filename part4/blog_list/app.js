import express from "express";
import cors from "cors";
import notes from "./controllers/notes.js"
import list_helper from "./utils/list_helper.js";

const app = express()


list_helper.totalLikes()



app.use(cors())
app.use(express.json())


//endpoints
app.get('/api/blogs', notes.read)
app.post('/api/blogs', notes.create)





const PORT = 3003
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})