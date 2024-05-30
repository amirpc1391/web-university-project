const mysql = require('mysql');

const connecting = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "taskdb"
});
function queryExec(querys) {
    // console.log(querys);
    // connecting.connect( (err)=>{
    //     if (err) throw err;
    //     console.log("Connected!");
    // })
    return new Promise((resolve ,reject)=> {
        connecting.query(querys, (err, result) => {
            if (err){
                console.log(err);
                // resolve(reject);
            }
            console.log("query executed");
            resolve(result);
        });
    })
}
module.exports=queryExec;
