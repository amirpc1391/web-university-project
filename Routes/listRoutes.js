const express = require("express");
const listRoutes = express.Router();
const userModel = require("../Model/usersModel");
const listModel = require("../Model/listModel");
const middleware = require("../helper/middleware")
const helpfunc = require("../helper/helpfunc")

listRoutes.post("/insert",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)
    const _user = await userModel.selectUser("uid",userId);
    console.log(_user)
    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }

    const _list= await listModel.insertList(req.body,_user[0].uid);
    return res.status(201).json(
        {
            "status": "success",
            "message": "list inserted",
            data: {_list}
        });
});
listRoutes.post("/get",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)

    const _list = await listModel.selectList("uid",userId);

    // if (!_list.length){
    //     return res.status(404).json(
    //         {
    //             "status": "failed",
    //             "message": "list not exists",
    //             data: {}
    //         });
    // }

    return res.status(201).json(
        {
            "status": "success",
            "message": "list geted",
            data: {"list":_list}
        });
});
listRoutes.post("/update",middleware.authenticateToken ,async (req, res)=>{
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
    const _list = await listModel.selectList("lid",req.body.lid)
    if (!_list.length)
    {
        return res.status(404).json(
            {
                "status": "failed",
                "message": "list not found",
                data: {}
            });
    }
    if (_user[0].uid !== _list[0].uid){
        return res.status(401).json(
            {
                "status": "failed",
                "message": "you cant change this list because you aren't owner",
                data: {}
            });
    }

    const y= await listModel.updateList(req.body,req.body.lid);
    return res.status(201).json(
        {
            "status": "success",
            "message": "list updated",
            data: {y}
        });
});
listRoutes.post("/delete",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY);
    const _user = await userModel.selectUser("uid",userId);

    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }
    const _list = await listModel.selectList("lid",req.body.lid)
    // console.log(_list)
    if (!_list.length)
    {
        return res.status(404).json(
            {
                "status": "failed",
                "message": "list not found",
                data: {}
            });
    }
    if (_user[0].uid!==_list[0].uid){
        return res.status(401).json(
            {
                "status": "failed",
                "message": "you cant delete this list because you aren't owner",
                data: {}
            });
    }

    const y= await listModel.deleteList(req.body.lid);
    return res.status(201).json(
        {
            "status": "success",
            "message": "list deleted",
            data: {y}
        });
});

module.exports=listRoutes