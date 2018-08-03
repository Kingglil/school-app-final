var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, info) {
    con.query = util.promisify(con.query);

    if(info.level > 2) {
        console.log("WARNING: AccountLevel too high.");
        return { code: 1 };
    }

    let sql = `SELECT ID, AccountLevel FROM accounts WHERE ID = ${info.id} OR ID = ${info.accountID}`;
    
    let result = await con.query(sql);
    let firstAccLevel = 0, secondAccLevel = 0;
    if(result[0] === undefined || result[1] === undefined)
    {
        console.log("WARNING: ID's do not exist.");
        return { code: 2 };
    }

    if(result[0].ID == info.id) {
        firstAccLevel = result[0].AccountLevel;
        secondAccLevel = result[1].AccountLevel;
    }
    else {
        firstAccLevel = result[1].AccountLevel;
        secondAccLevel = result[0].AccountLevel;
    }
    
    if(firstAccLevel <= secondAccLevel) {
        console.log("WARNING: AccountLevel is the same or higher.");
        return { code: 3 };
    }

    if(firstAccLevel <= level) {
        console.log("WARNING: level is the same or higher.");
        return { code: 4 };
    }

    sql = `UPDATE accounts SET AccountLevel = ${info.level}`;
    await con.query(sql);

    return { code: 0 };
}