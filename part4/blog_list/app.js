import express from "express";
import cors from "cors";
import notes from "./controllers/notes.js"
import list_helper from "./utils/list_helper.js";

const app = express()


// list_helper.totalLikes()
// list_helper.favoriteBlog()
// list_helper.mostBlogs()
list_helper.mostLikes()


app.use(cors())
app.use(express.json())


//endpoints
app.get('/api/blogs', notes.read)
app.post('/api/blogs', notes.create)





const PORT = 3003
const app_listen = app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})

export default app_listen;