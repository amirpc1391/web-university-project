// const mysql = require('mysql');
//
// const connecting = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "taskdb"
// });
// async function queryExec(querys) {
//     console.log(querys);
//     connecting.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//     })
//
//     connecting.query(querys, (err, result) => {
//         if (err) throw err;
//         console.log("query executed");
//         console.log(result)
//         return result;
//     });
// }
// module.exports=queryExec;
// const mysql = require('mysql');
//
// // ایجاد یک اتصال به دیتابیس
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "taskdb"
// });
//
// // اتصال به دیتابیس
// connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected to the database!");
// });
//
// // تابع برای اجرای کوئری
// function queryExec(query) {
//     return new Promise((resolve, reject) => {
//         console.log(query);
//
//         connection.query(query, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log("Query executed");
//                 console.log(result);
//                 resolve(result);
//             }
//         });
//     });
// }
//
// module.exports = queryExec;

const mysql = require('mysql');

// ایجاد یک اتصال به دیتابیس
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "taskdb"
});

// اتصال به دیتابیس
// connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected to the database!");
// });

// تابع برای اجرای کوئری
function queryExec(query) {
    let x =new Promise((resolve, reject) => {
        // console.log(query);

        // اجرای کوئری
        connection.query(`SELECT * FROM user WHERE username = "amir2"`, (err, result) => {
            // if (err) {
            //     return reject(err);
            // }
            // console.log("Query executed");
            // console.log(result);
            resolve(result);
        });
    });
    console.log(x)
}

module.exports = queryExec;
