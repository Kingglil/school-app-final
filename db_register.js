var mysql = require('mysql');
var util = require('util');

const SECRET_KEY = "123456";

module.exports = async function(con, registerInfo) {
    con.query = util.promisify(con.query);

    if(registerInfo.secretKey != SECRET_KEY) {
        console.log("WARNING: Somebody tried to registered but failed.");
        console.log("REASON: The SecretKey did not match.")
        return { code: 1 };        
    }

    let getSQL = `SELECT * FROM teachers WHERE Username = '${registerInfo.username}'`;
    let result = await con.query(getSQL);
    if(result.length > 0) {
        console.log("WARNING: Somebody tried to registered but failed.");
        console.log("REASON: A teacher with that username already exists.");
        return { code: 2 };
    }

    let addSQL = `INSERT INTO teachers (Username, Password, FullName, Subjects) VALUES ('${registerInfo.username}', ` +
                 `'${registerInfo.password}', '${registerInfo.fullname}', '${registerInfo.subjects}')`;

    

    await con.query(addSQL);
    console.log("LOG: A new teacher has just been created.");
    return { code: 0 }; 
}