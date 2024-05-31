const queryExec = require('./configDb');

exports.insertList = async (list,uid) => {
    const sql = `INSERT INTO list(uid, title) VALUES ("${uid}","${list.title}")`;
    return await queryExec(sql);
}
exports.selectList =  async(field,value) => {
    if (!field){
        const sql= `SELECT * FROM list`;
        return await queryExec(sql);
    }
    const sql= `SELECT * FROM list WHERE ${field} = "${value}"`;
    return await queryExec(sql);
}
exports.updateList =  async(list ,lid) => {
    const sql= `UPDATE list SET title = "${list.title}" WHERE lid ="${lid}"`;
    return await queryExec(sql);
}
exports.deleteList =  async(lid) => {
    const sql= `DELETE FROM list WHERE lid ="${lid}"`;
    return await queryExec(sql);
}