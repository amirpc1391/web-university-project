const express = require("express");
const auth = express.Router();
const userModel= require("../Model/usersModel")
const jwt = require("jsonwebtoken");
const middleware =require("../helper/middleware")
const helpfunc =require("../helper/helpfunc")
// const bcrypt = require("bcrypt");
require('dotenv').config();
auth.post("/signup",async (req, res)=>{
    const x = await userModel.selectUser("username",req.body.username);
    // console.log(x)
    if (x.length){
        return res.status(401).json(
            {
                "status": "failed",
                "message": "username exists",
                data: {x}
            });
    }
    const y= await userModel.insertUser(req.body);
    return res.status(201).json(
        {
            "status": "success",
            "message": "username created",
            data: {y}
        });
});
auth.post("/signin",async (req, res)=>{
    const _user= await userModel.selectUser("username",req.body.username);
    console.log(_user)
    if (!_user.length){
        return res.status(404).json(
            {
                "status": "failed",
                "message": "username not found",
                data: {"user":_user[0]}
            });
    }
    console.log(_user[0].password)
    if (req.body.password!==_user[0].password){
        return res.status(401).json(
            {
                "status": "failed",
                "message": "passsword invalid",
                data: {"pass":_user[0].password}
            });
    }
    const token = jwt.sign({
        uid: _user[0].uid,
        username: _user[0].username,
        role:_user[0].role
    }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
    res.cookie('token', token, { httpOnly: true,  sameSite: 'None', secure: true, path: '/' });
    // res.json({ message: 'Login successful', token });
    return res.status(201).json({
        // user:_user[0],
        status:"success",
        message: "Login successful",
        accessToken: {token},
    });
});
auth.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(201).json({ message: 'Logout successful' });
});

auth.post('/protected-route', middleware.authenticateToken, (req, res) => {
    return res.status(201).json({ message: 'Protected data', user: req.user });
});
module.exports = auth;