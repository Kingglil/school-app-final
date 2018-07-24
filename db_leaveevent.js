var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, userInfo) {
    con.query = util.promisify(con.query);

    let testSql = `SELECT * FROM events WHERE Name = '${userInfo.name}'`;

    let res = await con.query(testSql);

    if(res.length == 0) {
        console.log("WARNING: A user tried to leave an event but failed.");
        console.log("REASON: There is no event with that name.");
        return { code: 1 };
    }

    if(!res[0].People.split(";").includes(userInfo.id)) {
        console.log("WARNING: A user tried to leave an event but failed.");
        console.log("REASON: The user has not joined that event yet.");
        return { code: 2 };
    }

    let str = res[0].People.split(";").splice(res[0].People.split(";").indexOf(userInfo.id), 1);

    let updateSql = `UPDATE events SET People = '${str}' WHERE Name = '${userInfo.name}'`;

    await con.query(updateSql);

    return { code: 0 };
}