var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, loginInfo) {
    con.query = util.promisify(con.query);

    let getSQL = "SELECT * FROM teachers";
    let addSQL = `INSERT INTO teachers (Username, Password, FullName, Subjects) VALUES ('${loginInfo.username}', ` +
    + `'Pass', 'FN', 'Nemski;Psihologiq')`;

    let result = await con.query(getSQL);
    return result;
}