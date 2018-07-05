var mysql = require('mysql');

exports.connect = function () {
    var con = mysql.createConnection({
        host: "sql7.freemysqlhosting.net",
        user: "sql7246221",
        password: "CcsM3uASrL",
        database: "sql7246221"
    });

    con.connect(function(err) {
        if (err) {
            throw err;
        }

        console.log("LOG: Successfully connected to the database.");
    });

    return con;
}