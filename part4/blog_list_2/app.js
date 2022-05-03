const express = require('express');
const cors = require('cors');
const router_blogs = require('./controllers/controller_blogs.js');
const router_users = require('./controllers/controller_user.js');
const router_login = require('./controllers/controller_login.js');


const express1 = express()


//middleware
express1.use(cors())
express1.use(express.json())

express1.use("/api/blogs", router_blogs)
express1.use("/api/users", router_users)
express1.use("/api/login", router_login)



module.exports = express1;