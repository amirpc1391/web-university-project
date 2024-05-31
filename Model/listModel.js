const queryExec = require('./configDb');

exports.insertList = async (list) => {
    // const x = await queryExec(`SELECT * FROM user WHERE username = "${user.username}"`)
    const sql = `INSERT INTO list(username, email, password, fullname) VALUES ("${list.username}","${list.email}","${list.password}","${list.fullname}")`;
    return await queryExec(sql);
}
exports.selectList =  async(field,value) => {
    if (!field){
        const sql= `SELECT * FROM user`;
        return await queryExec(sql);
    }
    const sql= `SELECT * FROM user WHERE ${field} = "${value}"`;
    return await queryExec(sql);
}
exports.updateList =  async(user ,uid) => {
    const sql= `UPDATE user SET username = "${user.username}",email="${user.email}",password="${user.password}",fullname="${user.fullname}" WHERE uid ="${uid}"`;
    return await queryExec(sql);
}
exports.deleteList =  async(uid) => {
    const sql= `DELETE FROM user WHERE uid ="${uid}"`;
    return await queryExec(sql);
}