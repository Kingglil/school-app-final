var mysql = require('mysql');

var connectionState = false;

var db_config = {
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b1ba993ebe3ccc",
    password: "cff678d5",
    database: "heroku_bce8628dfd233a9"
};

exports.connect = function () {

    con = mysql.createConnection(db_config);

    con.connect(function(err) {
        connectionState = true;
        if (err) {
            throw err;
            return;
        }

        console.log("LOG: Successfully connected to the database.");
    });

    con.on("error", function(err) {
        if(err.code === "PROTOCOL_CONNECTION_LOST") {
            connectionState = false;
            console.log("ERROR: The connection to the datebase has been stopped.");
            console.log("LOG: Attempting to reconnect to the database.");
        }
    });   

    setInterval(function() {
        con.query("SELECT 1");
    }, 5000);

    return con;
}