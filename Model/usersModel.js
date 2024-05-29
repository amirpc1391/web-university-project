const queryExec = require('./configDb');

exports.insertUser =  (user) => {
    // try {
    //     const result = await queryExec('SELECT * FROM your_table');
    //     console.log(result);
    // } catch (error) {
    //     console.error('Error executing query:', error);
    // }
    console.log(queryExec(`SELECT * FROM user WHERE username = "amir2"`))
    // const sql = `INSERT INTO user(username, email, password, fullname) VALUES ("${user.username}","${user.email}","${user.password}","${user.fullname}")`;
    // queryExec(sql);
}