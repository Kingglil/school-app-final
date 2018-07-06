var mysql = require('mysql');
var util = require('util');

module.exports = async function(con) {
    let sql = "SELECT * FROM courses";
    let teacherSQL = "SELECT ID, FullName FROM teachers";

    con.query = util.promisify(con.query);

    let courses = await con.query(sql);
    console.log("LOG: User fetched courses.");
    let teachers = await con.query(teacherSQL);

    let result = [];
    let flag = false;
    for(let x = 0; x < courses.length; x++) {
        for(let y = 0; y < teachers.length; y++) {
            if(courses[x].TeacherID == teachers[y].ID) {
                result[x] = courses[x];
                result[x].TeacherName = teachers[y].FullName;
                flag = true;
                break;
            }
        }
        if(!flag) {
            result[x] = courses[x];
            result[x].TeacherName = "Unknown";
        }
    }

    return result;
}