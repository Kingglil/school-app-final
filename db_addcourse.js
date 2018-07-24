var mysql = require('mysql');
var util = require('util');

module.exports = async function(con, course) {

    con.query = util.promisify(con.query);

    let addSQL = `INSERT INTO courses(Name, DayFirst, DaySecond, TimeStartFirst, TimeStartSecond, TimeEndFirst, TimeEndSecond, RoomFirst, ` + 
        `RoomSecond, CanJoin, Classes, Subject, PeopleLimit, Description, TeacherID) VALUES ('${course.name}', '${course.dayFirst}', '${course.daySecond}', ` +
        `'${course.timeStartFirst}', '${course.timeStartSecond}', '${course.timeEndFirst}', '${course.timeEndSecond}', '${course.roomFirst}', ` + 
        `'${course.roomSecond}', '${course.canJoin}', '${course.classes}', '${course.subject}', '${course.peopleLimit}', '${course.description}', ` +
        `'${course.teacherID}',)`;

    let timeStartFirstVal = parseInt(course.timeStartFirst.substr(0, 2)) * 60 + parseInt(course.timeStartFirst.substr(3, 2));
    let timeEndFirstVal = parseInt(course.timeEndFirst.substr(0, 2)) * 60 + parseInt(course.timeEndFirst.substr(3, 2));
    let timeStartSecondVal = parseInt(course.timeStartSecond.substr(0, 2)) * 60 + parseInt(course.timeStartSecond.substr(3, 2));
    let timeEndSecondVal = parseInt(course.timeEndSecond.substr(0, 2)) * 60 + parseInt(course.timeEndSecond.substr(3, 2));

    let getSQL = `SELECT * FROM courses WHERE Name = '${course.name}' OR (DayFirst = '${course.dayFirst}' AND RoomFirst = '${course.roomFirst}'
                  AND (CONVERT(Substring(TimeStartFirst, 1, 2), UNSIGNED INTEGER) * 60 + CONVERT(Substring(TimeStartFirst, 4, 2), UNSIGNED INTEGER)
                  BETWEEN ${timeStartFirstVal} AND ${timeEndFirstVal} OR 
                  CONVERT(Substring(TimeEndFirst, 1, 2), UNSIGNED INTEGER) * 60 + CONVERT(Substring(TimeEndFirst, 4, 2), UNSIGNED INTEGER)
                  BETWEEN ${timeStartFirstVal} AND ${timeEndFirstVal}))
                  OR (DaySecond = '${course.dayFirst}' AND RoomSecond = '${course.roomFirst}'
                  AND (CONVERT(Substring(TimeStartSecond, 1, 2), UNSIGNED INTEGER) * 60 + CONVERT(Substring(TimeStartSecond, 4, 2), UNSIGNED INTEGER)
                  BETWEEN ${timeStartSecondVal} AND ${timeEndSecondVal} OR 
                  CONVERT(Substring(TimeEndSecond, 1, 2), UNSIGNED INTEGER) * 60 + CONVERT(Substring(TimeEndSecond, 4, 2), UNSIGNED INTEGER)
                  BETWEEN ${timeStartSecondVal} AND ${timeEndSecondVal}))`;
    
    let result = await con.query(getSQL);

    if(result.length > 0) {
        let code = -1;
        console.log("WARNING: A user tried to add course but failed.");
        if(result[0].Name == course.name) {
            code = 1;
            console.log("REASON: A course with that name already exists.");
        } else {
            code = 2;
            console.log("REASON: This room is busy that time.");
        }
        return {
            code: code
        };
    }

    await con.query(addSQL);

    console.log("LOG: Added 1 course to the database.");

    return {
        code: 0
    };
}