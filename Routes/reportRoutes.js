const express = require("express");
const reportRoutes = express.Router();
const userModel = require("../Model/usersModel");
const listModel = require("../Model/listModel");
const taskModel = require("../Model/taskModel");
const reportModel = require("../Model/reportModel");
const middleware = require("../helper/middleware")
const helpfunc = require("../helper/helpfunc")

reportRoutes.post("/insert",async (req, res)=>{
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
    const _task = await taskModel.selectTask("tid",req.body.tid);
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
                "message": "you cant add report to the list because you are not owner this list",
                data: {}
            });
    }
    const report= await reportModel.insertReport(req.body);
    console.log(report)
    return res.status(201).json(
        {
            "status": "success",
            "message": "report inserted",
            data: {report}
        });
});
reportRoutes.post("/get",middleware.authenticateToken ,async (req, res)=>{
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
    const _task = await taskModel.selectTask("tid",req.body.tid);
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
                "message": "you cant get report to the list because you are not owner this list",
                data: {}
            });
    }
    const _report = await reportModel.selectReport("tid",req.body.tid);

    return res.status(201).json(
        {
            "status": "success",
            "message": "report geted",
            data: {_report}
        });
});
reportRoutes.post("/update",middleware.authenticateToken ,async (req, res)=>{
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
    const _report=await reportModel.selectReport("rid",req.body.rid);
    // console.log(_task)
    if (!_report.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "_report id not found",
                data: {}
            });
    }
    const _task=await taskModel.selectTask("tid",_report[0].tid);
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
                "message": "you cant update report to the list because you are not owner this list",
                data: {}
            });
    }
    const _reportup= await reportModel.updateReport(req.body);
    return res.status(201).json(
        {
            "status": "success",
            "message": "report updated",
            data: {_reportup}
        });
});
reportRoutes.post("/delete",middleware.authenticateToken ,async (req, res)=>{
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
    const _report=await reportModel.selectReport("rid",req.body.rid);
    if (!_report.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "_report id not found",
                data: {}
            });
    }
    const _task=await taskModel.selectTask("tid",_report[0].tid);
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
                "message": "you cant delete report to the list because you are not owner this list",
                data: {}
            });
    }

    const _reportdel= await reportModel.deleteReport(req.body.rid);
    return res.status(201).json(
        {
            "status": "success",
            "message": "_report deleted",
            data: {_reportdel}
        });

});

module.exports=reportRoutes