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

exports.updateUser =  async(user ,uid) => {
    const sql= `UPDATE user SET username = "${user.username}",email="${user.email}",password="${user.password}",fullname="${user.fullname}" WHERE uid ="${uid}"`;
    return await queryExec(sql);
}
exports.deleteUser =  async(uid) => {
    const sql= `DELETE FROM user WHERE uid ="${uid}"`;
    return await queryExec(sql);
}