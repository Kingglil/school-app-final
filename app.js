var express = require('express');
var app = express();
var db = require('./db_conn');
var getCourses = require('./db_getcourses');
var getCourses = require('./db_getevents');
var addCourse = require('./db_addcourse');
var addEvent = require('./db_addevent');
var deleteCourse = require('./db_deletecourse');
var convertor = require('./convert');
var register = require('./db_register');
var login = require('./db_login');
var joinCourse = require('./db_joincourse');
var joinEvent = require('./db_joinevent');
var leaveCourse = require('./db_leavecourse');
var leaveEvent = require('./db_leaveevent');

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
    res.send(convertor.constructCourses(courses));
    console.log("LOG: Sent information.");
});

app.get("/getevents", async function(req, res) {
    EnableCORS(res);
    let events = await getEvents(con);
    res.send(convertor.constructEvents(events));
    console.log("LOG: Sent information.");
});

app.get("/addcourse", async function(req, res) {
    EnableCORS(res);
    let result = await addCourse(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.get("/addevent", async function(req, res) {
    EnableCORS(res);
    let result = await addEvent(con, req.query);
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

app.get("/login", async function(req, res) {
    EnableCORS(res);
    let result = await login(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.");
});

app.get("/joincourse", async function(req, res) {
    EnableCORS(res);
    let result = await joinCourse(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.")
});

app.get("/joinevent", async function(req, res) {
    EnableCORS(res);
    let result = await joinEvent(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.")
});

app.get("/leavecourse", async function(req, res) {
    EnableCORS(res);
    let result = await leaveCourse(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.")
});

app.get("/leaveevent", async function(req, res) {
    EnableCORS(res);
    let result = await leaveEvent(con, req.query);
    res.send(result);
    console.log("LOG: Sent information.")
});

app.listen(process.env.PORT || 3000, () => {
    console.log("LOG: Started listening on port " + process.env.PORT || 3000);
});