function convertStringToClasses(str) {
    let res = [];
    let arr = str.split(';');
    for(let i = 0; i < arr.length; i++) {
        res.push({
            year: arr[i][0],
            subclass: arr[i][1]
        });
    }

    return res;
}

module.exports = function constructCourses(objs) {
    let courses = [];
    for(let i = 0; i < objs.length; i++) {
        let obj = objs[i];

        courses.push({
            name: obj.Name,
            dayFirst: obj.DayFirst,
            daySecond: obj.DaySecond,
            timeStartFirst: obj.TimeStartFirst,
            timeStartSecond: obj.TimeStartSecond,
            timeEndFirst: obj.TimeEndFirst,
            timeEndSecond: obj.TimeEndSecond,
            roomFirst: obj.RoomFirst,
            roomSecond: obj.RoomSecond,
            canJoin: obj.CanJoin,
            classes: convertStringToClasses(obj.Classes),
            teacherName: obj.TeacherName,
            subject: obj.Subject
        });
    }

    return courses;
}