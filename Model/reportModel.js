const queryExec = require('./configDb');

exports.insertReport = async(report) => {
    const sql = `INSERT INTO report(description ,tid) VALUES ("${report.description}" , "${report.tid}" )`;
    return await queryExec(sql);
}
exports.selectReport =  async(field,value) => {
    if (!field){
        const sql= `SELECT * FROM report`;
        return await queryExec(sql);
    }
    const sql= `SELECT * FROM report WHERE ${field} = "${value}"`;
    return await queryExec(sql);
}
exports.updateReport =  async(report) => {
    const sql= `UPDATE report SET description = "${report.description}" WHERE rid ="${report.rid}"`;
    return await queryExec(sql);
}
exports.deleteReport =  async(rid) => {
    const sql= `DELETE FROM report WHERE rid ="${rid}"`;
    return await queryExec(sql);
}