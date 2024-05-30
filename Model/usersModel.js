const queryExec = require('./configDb');

 exports.insertUser = async (user) => {
    // const x = await queryExec(`SELECT * FROM user WHERE username = "${user.username}"`)
    const sql = `INSERT INTO user(username, email, password, fullname) VALUES ("${user.username}","${user.email}","${user.password}","${user.fullname}")`;
     return await queryExec(sql);
}
exports.selectUser =  async(field,value) => {
     if (!field){
         const sql= `SELECT * FROM user`;
         return await queryExec(sql);
     }
    const sql= `SELECT * FROM user WHERE ${field} = "${value}"`;
    return await queryExec(sql);
}