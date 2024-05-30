const express = require("express");
const userRoutes = express.Router();
const userModel= require("../Model/usersModel")
const jwt = require("jsonwebtoken");
const middleware =require("../helper/middleware")
// const bcrypt = require("bcrypt");
// const SECRET_KEY ="24688642"
require('dotenv').config();
userRoutes.get("/signup",async (req, res)=>{
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
userRoutes.get("/signin",async (req, res)=>{
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
        username: _user[0].username,
        role:_user[0].role
    }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
    res.cookie('token', token, { httpOnly: true, secure: true, path: '/' });
    // res.json({ message: 'Login successful', token });
    return res.status(201).json({
                // user:_user[0],
            message: "Login successful",
            accessToken: {token},
        });

    // jwt.verify(token, "2468", (err, decoded) => {
    //     if (err) {
    //         console.error('Invalid token:', err);
    //         return;
    //     }
    //     console.log('Decoded Token:', decoded);
    // });
    // jwt.verify(token, "2468", (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     console.log(user)
    // });

    // const decoded = jwt.decode(token);
    // console.log('Decoded without verification:', decoded);
    // const authHeader = req.headers['authorization'];
    // const token1 = authHeader && authHeader.split(' ')[1];

    // res.clearCookie('token'); // حذف کوکی
    // res.json({ message: 'Logout successful' });
    //
    // const token = req.cookies.token;
    // if (!token) return res.sendStatus(401);
    // // اعتبارسنجی توکن (به طور مثال)
    // console.log(token)
    // res.json({ message: 'Protected data' });

    // res.clearCookie('token', { path: '/user' });
    // res.json({ message: 'Logout successful' });
    // res.clearCookie('token');
    //
    // const token1 = req.cookies.token;
    // console.log(token1)
    // return res.status(200)
    //     .json({
    //
    //             user:_user[0],
    //         message: "Login successfull",
    //         accessToken: {token},
    //     });
});
userRoutes.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(201).json({ message: 'Logout successful' });
});



// userRoutes.get("/aa",async (req, res)=>{
//     const _user= await userModel.selectUser("username",req.body.username);
//     console.log(_user)
//     if (!_user.length){
//         return res.status(404).json(
//             {
//                 "status": "failed",
//                 "message": "username not found",
//                 data: {"user":_user[0]}
//             });
//     }
//     console.log(_user[0].password)
//     if (req.body.password!==_user[0].password){
//         return res.status(401).json(
//             {
//                 "status": "failed",
//                 "message": "passsword invalid",
//                 data: {"pass":_user[0].password}
//             });
//     }
//     const token = jwt.sign({
//         username: _user[0].username,
//         role:_user[0].role
//     }, SECRET_KEY, {
//         expiresIn: '1h'
//     });
//     res.cookie('token', token, { httpOnly: true, secure: true, path: '/' });
//     // res.json({ message: 'Login successful', token });
//     return res.status(201).json({
//         // user:_user[0],
//         message: "Login successful",
//         accessToken: {token},
//     });
//
//     // jwt.verify(token, "2468", (err, decoded) => {
//     //     if (err) {
//     //         console.error('Invalid token:', err);
//     //         return;
//     //     }
//     //     console.log('Decoded Token:', decoded);
//     // });
//     // jwt.verify(token, "2468", (err, user) => {
//     //     if (err) return res.sendStatus(403);
//     //     console.log(user)
//     // });
//
//     // const decoded = jwt.decode(token);
//     // console.log('Decoded without verification:', decoded);
//     // const authHeader = req.headers['authorization'];
//     // const token1 = authHeader && authHeader.split(' ')[1];
//
//     // res.clearCookie('token'); // حذف کوکی
//     // res.json({ message: 'Logout successful' });
//     //
//     // const token = req.cookies.token;
//     // if (!token) return res.sendStatus(401);
//     // // اعتبارسنجی توکن (به طور مثال)
//     // console.log(token)
//     // res.json({ message: 'Protected data' });
//
//     // res.clearCookie('token', { path: '/user' });
//     // res.json({ message: 'Logout successful' });
//     // res.clearCookie('token');
//     //
//     // const token1 = req.cookies.token;
//     // console.log(token1)
//     // return res.status(200)
//     //     .json({
//     //
//     //             user:_user[0],
//     //         message: "Login successfull",
//     //         accessToken: {token},
//     //     });
// });








// userRoutes.get('/protected-route', (req, res) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json(
//         {
//             status:"failed",
//             message:"please login"
//         }
//     );
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) return res.status(403).json({ message: 'Invalid token', error: err });
//         res.json({ message: 'Protected data', user: decoded });
//     });
// });
userRoutes.get('/protected-route', middleware.authenticateToken, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});


function getUserNameOfToken(token,secret_key) {

    if (!token){
        return {
            status:"failed",
            message:"please login"
        };
    }
    return new Promise((resolve,reject)=>{
        jwt.verify(token, secret_key, (err, _user) => {
            if (err){
                reject({status:"failed", message: 'Invalid token', error: err });
            }
            console.log(_user)
            resolve(_user.username);
        });
    })
}
userRoutes.get('/t', (req, res) => {
    // let test;
    // getUserNameOfToken(req.cookies.token,SECRET_KEY).then(user => {
    //     console.log(user); // خروجی: 'amir16'
    // }).catch(error => {
    //     console.error(error);
    // });

    // console.log(process.env.SECRET_KEY)
    // const fetchUser = async () => {
    //     try {
    //         // استفاده از await برای دسترسی به مقدار پرامیس
    //         const user = await getUser();
    //         console.log(user); // خروجی: 'amir16'
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const x = getUserNameOfToken(req.cookies.token,SECRET_KEY)
    // console.log(x)
    return res.status(201).json(
        {
            message:"sfcsd"
        }
    )
});


module.exports = userRoutes;