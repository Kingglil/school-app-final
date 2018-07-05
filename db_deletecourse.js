var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, name) {
    let sql = `DELETE FROM courses WHERE Name = '${name}'`;

    con.query = util.promisify(con.query);
    
    try {
        await con.query(sql);
        console.log("LOG: A user has just deleted a course from the database.");

        return { code: 0 };
    } catch(err) {
        console.log("WARNING: A user has just failed to delete a course from the database.");

        return { code: 1 };
    }

}