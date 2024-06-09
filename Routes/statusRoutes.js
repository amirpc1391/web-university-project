const express = require("express");
const statusRoutes = express.Router();
const statusModel = require("../Model/statusModel");
const middleware = require("../helper/middleware")
const helpfunc = require("../helper/helpfunc")
statusRoutes.post("/getcount",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)
    const statusOpen = await statusModel.getAllTaskCount(userId,"open");
    const statusProgress = await statusModel.getAllTaskCount(userId,"in-progress");
    const statusClose = await statusModel.getAllTaskCount(userId,"close");
    const statusAll = await statusModel.getAllTaskCount(userId);
    return res.status(201).json(
        {
            "status": "success",
            "message": "count status geted",
            data: {"open":statusOpen[0]["count(*)"],"progress":statusProgress[0]["count(*)"],"close":statusClose[0]["count(*)"],"statusall":statusAll[0]["count(*)"]}
        });
});

module.exports =statusRoutes