var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, userInfo) {
    con.query = util.promisify(con.query);

    let testSql = `SELECT * FROM events WHERE Name = ${userInfo.name}`;
    let updateSql = `UPDATE events SET People = 'CONCAT(People, ';${userInfo.id}')' WHERE Name = '${userInfo.name}')`;1

    let res = await con.query(testSql);
    if(res.length == 0) {
        console.log("WARNING: A user tried to join an event but failed.");
        console.log("REASON: There is no event with that name.");
        return { code: 1 };
    }

    if(res[0].People.split(";").length == res[0].PeopleCount) {
        console.log("WARNING: A user tried to join an event but failed.");
        console.log("REASON: There is no space.");

        return { code: 2 };
    }

    await con.query(updateSql);

    return { code: 0 };
}