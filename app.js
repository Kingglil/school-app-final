var express = require('express');
var app = express();
var db = require('./db_conn');
var getCourses = require('./db_getcourses');
var addCourse = require('./db_addcourse');
var deleteCourse = require('./db_deletecourse');
var convertCourses = require('./convert');
var register = require('./db_register');

let con = db.connect();

function EnableCORS(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

app.get("/", function(req, res) {
    EnableCORS(res);
    res.send("Application working.");
    console.log("LOG: Sent information.");
});

app.get("/getcourses", async function(req, res) {
    EnableCORS(res);
    let courses = await getCourses(con);
    res.send(convertCourses(courses));
    console.log("LOG: Sent information.");
});

app.get("/addcourse", async function(req, res) {
    EnableCORS(res);
    let result = await addCourse(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.get("/deletecourse", async function(req, res) {
    EnableCORS(res);
    let result = await deleteCourse(con, req.query.name);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.get("/register", async function(req, res) {
    EnableCORS(res);
    let result = await register(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("LOG: Started listening on port " + process.env.PORT || 3000);
});