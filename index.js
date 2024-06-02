const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
// const mysql = require('mysql');
const queryExec = require('./Model/configDb');
const auth = require("./Routes/auth.js");
app.use("/user", auth);
const userRoutes = require("./Routes/userRoutes");
app.use("/user", userRoutes);
const listRoutes = require("./Routes/listRoutes");
app.use("/list", listRoutes);
const taskRoutes = require("./Routes/taskRoutes");
app.use("/task", taskRoutes);
const reportRoutes = require("./Routes/reportRoutes");
app.use("/report", reportRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})