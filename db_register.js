var mysql = require('mysql');
var util = require('util');

const SECRET_KEY = "123456";

module.exports = async function(con, registerInfo) {
    con.query = util.promisify(con.query);

    let accoultLevel = 0;

    if(registerInfo.secretKey != undefined) {
        if(registerInfo.secretKey != SECRET_KEY) {
            console.log("WARNING: Somebody tried to registered but failed.");
            console.log("REASON: The SecretKey did not match.")
            return { code: 1 };
        }

        accoultLevel = 2;
    }

    

    let getSQL = `SELECT * FROM accounts WHERE Username = '${registerInfo.username}'`;
    let result = await con.query(getSQL);
    if(result.length > 0) {
        console.log("WARNING: Somebody tried to registered but failed.");
        console.log("REASON: A user with that username already exists.");
        return { code: 2 };
    }

    let addSQL = `INSERT INTO accounts (Username, Password, FullName, AccountLevel) VALUES ('${registerInfo.username}', ` +
                 `'${registerInfo.password}', '${registerInfo.fullname}', '${accoultLevel}')`;

    

    await con.query(addSQL);
    console.log("LOG: A new teacher has just been created.");
    return { code: 0 }; 
}