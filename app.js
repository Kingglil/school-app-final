var express = require('express');
var app = express();
var db = require('./db_conn');
var getCourses = require('./db_getcourses');
var addCourse = require('./db_addcourse');
var deleteCourse = require('./db_deletecourse');
var convertCourses = require('./convert');

let con = db.connect();

app.get("/", function(req, res) {
    res.send("Application working.");
    console.log("LOG: Sent information.");
});

app.get("/getcourses", async function(req, res) {
    let courses = await getCourses(con);
    res.send(convertCourses(courses));
    console.log("LOG: Sent information.");
});

app.get("/addcourse", async function(req, res) {
    let result = await addCourse(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.get("/deletecourse", async function(req, res) {
    let result = await deleteCourse(con, req.query.name);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("LOG: Started listening on port 3000.");
});