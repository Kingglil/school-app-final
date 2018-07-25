var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, eventInfo) {
    con.query = util.promisify(con.query);

    let sql = `SELECT * FROM accounts WHERE ID = ${eventInfo.accountID}`;
    let result = await con.query(sql);

    if(result.length == 0) {
        console.log("WARNING: Somebody tried to create an event but failed.");
        console.log("REASON: A user with that ID does not exist.");

        return { code: 2 };
    }

    if(result[0].AccountLevel == 0) {
        
        return { code: 1 };
    }

    if(result[0].AccountLevel > 0) {
        
        sql = `INSERT INTO events ( Name, Address, Time, Description, CreatedBy, PeopleLimit, Date ) VALUES ` +
            + `( '${eventInfo.name}', '${eventInfo.address}', '${eventInfo.time}', '${eventInfo.description}', '${eventInfo.accountID}', ` + 
            + `'${eventInfo.peopleLimit}', '${eventInfo.date}' )`;

        console.log(sql);            

        await con.query(sql);
            
        return { code: 0 };
    }
}