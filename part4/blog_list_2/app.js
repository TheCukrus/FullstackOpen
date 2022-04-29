const express = require('express');
const cors = require('cors');
const router_blogs = require('./controllers/controller_blogs.js');

const express1 = express()


//middleware
express1.use(cors())
express1.use(express.json())
express1.use("/api/blogs", router_blogs)



module.exports = express1;