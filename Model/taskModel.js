const queryExec = require('./configDb');

// exports.insertTask = async (task,lid) => {
//     const sql = `INSERT INTO task(title, description ,lid) VALUES( ${task.title}" , "${task.description}" , "${lid}" ) `;
//     return await queryExec(sql);
// }
exports.insertTask = async(task) => {
    const sql = `INSERT INTO task(title, description ,lid) VALUES ("${task.title}" , "${task.description}" , "${task.lid}" )`;
    return await queryExec(sql);
}
exports.selectTask =  async(field,value) => {
    if (!field){
        const sql= `SELECT * FROM task`;
        return await queryExec(sql);
    }
    const sql= `SELECT * FROM task WHERE ${field} = "${value}"`;
    return await queryExec(sql);
}

// exports.updateTask =  async(task ,tid) => {
//     if (task.status){
//         const sql= `UPDATE task SET title = "${task.title}" , description = "${task.description}" , status = "${task.status}" WHERE tid ="${tid}"`;
//     }
//     const sql= `UPDATE task SET title = "${task.title}" , description = "${task.description}" WHERE tid ="${tid}"`;
//     return await queryExec(sql);
// }
exports.updateTask =  async(task) => {
    if (task.status){
        const sql= `UPDATE task SET title = "${task.title}" , description = "${task.description}" , status = "${task.status}" WHERE tid ="${task.tid}"`;
        return await queryExec(sql);
    }
    const sql= `UPDATE task SET title = "${task.title}" , description = "${task.description}" WHERE tid ="${task.tid}"`;
    return await queryExec(sql);
}

exports.deleteTask =  async(tid) => {
    const sql= `DELETE FROM task WHERE tid ="${tid}"`;
    return await queryExec(sql);
}