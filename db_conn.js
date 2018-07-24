var mysql = require('mysql');

exports.connect = function () {
    var con = mysql.createConnection({
        host: "us-cdbr-iron-east-04.cleardb.net",
        user: "b1ba993ebe3ccc",
        password: "cff678d5",
        database: "heroku_bce8628dfd233a9"
    });

    con.connect(function(err) {
        if (err) {
            throw err;
        }

        console.log("LOG: Successfully connected to the database.");
    });

    return con;
}