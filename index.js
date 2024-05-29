const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const mysql = require('mysql');
const queryExec = require('./Model/configDb');
const userRoutes = require("./Routes/userRoutes");

app.use("/user", userRoutes);

// queryExec("create database amir");
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


