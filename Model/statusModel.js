const queryExec = require('./configDb');

exports.getAllTaskCount =  async(uid,status) => {
    if (status){
        const sql= `select count(*) from task where lid in(SELECT lid FROM list WHERE uid = ${uid}) and status = '${status}'`
        return await queryExec(sql);
    }
    const sql= `select count(*) from task where lid in(SELECT lid FROM list WHERE uid = ${uid})`
    return await queryExec(sql);

}





// select count(*) from task where lid in(SELECT lid FROM `list` WHERE uid =55) and status = 'open'