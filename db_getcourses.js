var mysql = require('mysql');
var util = require('util');

module.exports = async function(con) {
    let sql = "SELECT * FROM courses";
    let res;

    con.query = util.promisify(con.query);

    res = await con.query(sql);
    console.log("LOG: User fetched courses.");

    return res;
}