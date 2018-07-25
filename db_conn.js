var mysql = require('mysql');

var connectionState = false;

var db_config = {
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b1ba993ebe3ccc",
    password: "cff678d5",
    database: "heroku_bce8628dfd233a9"
};

exports.checkConnection = function() {
    return connectionState;
}

exports.onConnectionLost = function() {};

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
            exports.onConnectionLost();
        }
    });   

    return con;
}

exports.attemptToReconnect = function() {
    con = mysql.createConnection(db_config);

    con.connect(function(err) {
        if(err) {
            console.log("ERROR: The server could not connect to the databse. Trying again in 2 seconds.");
            return undefined;
        }
        else {
            console.log("LOG: The server successfully reconnected to the databse.");
            connectionState = true;
            return con;
        }
    });
}