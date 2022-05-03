const express = require("express");
const model_user = require("../models/model_user.js");
const generate_token = require("../utils/generate_token.js");
const hash_password = require("../utils/hash_password.js");

const router_login = express.Router();


module.exports = router_login;

//login RESTfull
router_login.post("/", async (request, response) =>
{
    if (request.body.user_name === undefined)
    {
        response.statusCode = 401;
        response.end();
        return;
    }

    if (request.body.password === undefined)
    {
        response.statusCode = 401;
        response.end();
        return;
    }

    try
    {
        const resolved_user = await model_user.modelUser.findOne({ "user_name": request.body.user_name });

        if (resolved_user === null)
        {
            response.statusCode = 401;
            response.end();
            return;
        }

        if (request.body.password !== hash_password(resolved_user.password))
        {
            response.statusCode = 401;
            response.end();
            return;
        }

        const token = generate_token()

        await model_user.modelUser.updateOne({ "user_name": request.body.user_name }, { "token": token })
        response.statusCode = 200;
        response.json({ "token": token })
    }
    catch (err)
    {

    }
})

//logout RESTfull
router_login.delete("/", async (request, response) =>
{
    if (request.header.token === undefined)
    {
        response.statusCode = 403;
        response.end();
    }

    try
    {
        const resolved_user = await model_user.modelUser.findOne({ "token": request.body.token })
        //pamoka baigiau ties sita vieta
    }
    catch (err)
    {

    }
})