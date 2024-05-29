const express = require("express");
const userRoutes = express.Router();
const userModel= require("../Model/usersModel")
userRoutes.get("/signup",(req, res)=>{
    userModel.insertUser(req.body);
    // console.log(req.body)
    return res.status(201).json(
        {
            "status": "success",
            "message": "user created successfully",
            data: {}
        });
});
module.exports = userRoutes;