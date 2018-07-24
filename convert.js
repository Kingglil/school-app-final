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

function countPeople(str) {
    return str.split(";").length;
}

module.exports = { 
    
    constructCourses: function(objs) {
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
                peopleLimit: obj.PeopleLimit,
                peopleCount: countPeople(obj.People),
                subject: obj.Subject,
                description: obj.Description
            });
        }

        return courses;
    },

    constructEvents: function(objs) {
        let events = [];
        for(let i = 0; i < objs.length; i++) {
            let obj = objs[i];

            events.push({
                name: obj.Name,
                address: obj.Address,
                timeStartFirst: obj.Time,
                dayFirst: obj.Date,
                description: obj.Description,
                teacherName: obj.CreatedBy,
                peopleLimit: obj.PeopleLimit,
                peopleCount: countPeople(obj.People)
            });
        }
    }
}