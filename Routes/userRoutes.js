const express = require("express");
const userRoutes = express.Router();
const userModel = require("../Model/usersModel");
const middleware = require("../helper/middleware")
const helpfunc = require("../helper/helpfunc")
userRoutes.post("/update",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)

    const _user = await userModel.selectUser("uid",userId);

    // console.log(userId,"eeeeeeeee")
    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }
    const userObg =await userModel.selectUser("username",req.body.username);
    console.log(userObg)
    if (userObg.length && userObg[0].username!=_user[0].username)
    {
        return res.status(401).json(
            {
                "status": "failed",
                "message": "username exists please enter anouther username",
                data: {}
            });
    }
    const y= await userModel.updateUser(req.body,userId);
    return res.status(201).json(
        {
            "status": "success",
            "message": "username updated",
            data: {y}
        });
});
userRoutes.post("/delete",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)

    const _user = await userModel.selectUser("uid",userId);

    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }
    const y= await userModel.deleteUser(userId);
    return res.status(201).json(
        {
            "status": "success",
            "message": "username deleted",
            data: {y}
        });
});
userRoutes.post("/get",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)

    const _user = await userModel.selectUser("uid",userId);

    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }

    return res.status(201).json(
        {
            "status": "success",
            "message": "username founded",
            data: {"user":_user[0]}
        });
});
module.exports=userRoutes