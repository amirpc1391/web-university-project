const express = require("express");
const statusRoutes = express.Router();
const userModel = require("../Model/usersModel");
const statusModel = require("../Model/statusModel");
const middleware = require("../helper/middleware")
const helpfunc = require("../helper/helpfunc")
statusRoutes.post("/get",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)
    const statusOpen = await statusModel.getAllTaskCount(uid,"open");
    return res.status(201).json(
        {
            "status": "success",
            "message": "list geted",
            data: {"list":_list}
        });
});