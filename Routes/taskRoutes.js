const express = require("express");
const taskRoutes = express.Router();
const userModel = require("../Model/usersModel");
const listModel = require("../Model/listModel");
const taskModel = require("../Model/taskModel");
const middleware = require("../helper/middleware")
const helpfunc = require("../helper/helpfunc")

taskRoutes.post("/insert",middleware.authenticateToken,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY)
    const _user = await userModel.selectUser("uid",userId);
    // console.log(_user)
    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }
    const _list = await listModel.selectList("lid",req.body.lid);
    if (!_list.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "list id not found",
                data: {}
            });
    }
    if (_list[0].uid!== userId){
        return res.status(403).json(
            {
                "status": "failed",
                "message": "you cant add task to the list because you are not owner this list",
                data: {}
            });
    }
    const _task= await taskModel.insertTask(req.body);
    console.log(_task)
    return res.status(201).json(
        {
            "status": "success",
            "message": "task inserted",
            data: {"task":_task}
        });
});
taskRoutes.post("/get",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY);

    const _user = await userModel.selectUser("uid",userId);
    // console.log(_user)
    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }
    const _list = await listModel.selectList("lid",req.body.lid);
    if (!_list.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "list id not found",
                data: {}
            });
    }
    if (_list[0].uid!== userId){
        return res.status(201).json(
            {
                "status": "failed",
                "message": "you cant update task to the list because you are not owner this list",
                data: {}
            });
    }
    const _task = await taskModel.selectTask("lid",req.body.lid);

    return res.status(201).json(
        {
            "status": "success",
            "message": "_task geted",
            data: {"task":_task}
        });
});
taskRoutes.post("/update",middleware.authenticateToken ,async (req, res)=>{
    const userId = await helpfunc.getUserNameOfToken(req.cookies.token,process.env.SECRET_KEY);

    const _user = await userModel.selectUser("uid",userId);
    // console.log(_user)
    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not exists",
                data: {}
            });
    }
    const _task=await taskModel.selectTask("tid",req.body.tid);
    // console.log(_task)
    if (!_task.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "task id not found",
                data: {}
            });
    }
    const _list = await listModel.selectList("lid",_task[0].lid);
    if (!_list.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "list id not found",
                data: {}
            });
    }
    if (_list[0].uid!== userId){
        return res.status(201).json(
            {
                "status": "failed",
                "message": "you cant update task to the list because you are not owner this list",
                data: {}
            });
    }
    const _taskup= await taskModel.updateTask(req.body);
    return res.status(201).json(
        {
            "status": "success",
            "message": "_task updated",
            data: {_taskup}
        });
});
taskRoutes.post("/delete",middleware.authenticateToken ,async (req, res)=>{
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
    const _task=await taskModel.selectTask("tid",req.body.tid);
    if (!_task.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "task id not found",
                data: {}
            });
    }
    const _list = await listModel.selectList("lid",_task[0].lid);
    if (!_list.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "list id not found",
                data: {}
            });
    }
    if (_list[0].uid!== userId){
        return res.status(201).json(
            {
                "status": "failed",
                "message": "you cant delete task to the list because you are not owner this list",
                data: {}
            });
    }

    const _taskdel= await taskModel.deleteTask(req.body.tid);
    return res.status(201).json(
        {
            "status": "success",
            "message": "_task deleted",
            data: {_taskdel}
        });

});

module.exports=taskRoutes