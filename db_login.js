var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, loginInfo) {
    con.query = util.promisify(con.query);

    let sql = `SELECT Username, FullName, Subjects FROM accounts WHERE Username = '${loginInfo.username}' AND Password = '${loginInfo.password}'`;
    let result = await con.query(sql);

    if(result.length == 0) {
        console.log("WARNING: A user tried to login but failed.");
        console.log("REASON: There is no user with this username and password.");
        return { code: 1 };
    }

    console.log("LOG: A user successfully logged into his/her account.");
    return {
        code: 0,
        info: result
    };
}