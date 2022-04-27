import express from "express"
import cors from "cors"
import controller_blog from "./controllers/controller_blog"

const express_1 = express()

//midlewares
express_1.use(cors())
express_1.use(express.json())


//endpoints
express_1.post('/api/blogs', controller_blog.create);
express_1.get('/api/blogs', controller_blog.read);
express_1.put('/api/blogs/:id', controller_blog.update)
express_1.delete('/api/blogs/:id', controller_blog.remove);

const PORT = 3003
const express_1_listener = express_1.listen(PORT, "127.0.0.1", () =>
{
    console.log(`Server running on port ${PORT}`)
})

export default { express_1_listener, express_1 }