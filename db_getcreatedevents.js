var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, info) {
    con.query = util.promisify(con.query);

    let sql = `SELECT * events WHERE CreatedBy = ${info.id}`;

    let result = await con.query(sql);

    console.log(result);

    return result;
}