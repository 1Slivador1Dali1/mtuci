var groupmates = [
    {
        "name": "Василий",
        "group": "912-2",
        "age": 19,
        "marks": [4, 3, 5, 5, 4]
    },
    {
        "name": "Анна",
        "group": "912-1",
        "age": 18,
        "marks": [3, 2, 3, 4, 3]
    },
    {
        "name": "Георгий",
        "group": "912-2",
        "age": 19,
        "marks": [3, 5, 4, 3, 5]
    },
    {
        "name": "Валентина",
        "group": "912-1",
        "age": 18,
        "marks": [5, 5, 5, 4, 5]
    },
    {
        "name": "Елена",
        "group": "912-2",
        "age": 19,
        "marks": [4, 4, 4, 5, 5]
    }
];

console.log("Исходный массив студентов:");
console.log(groupmates);

var rpad = function(str, length) {
    str = str.toString();
    while (str.length < length)
        str = str + ' ';
    return str;
};

var printStudents = function(students) {
    console.log('\n' + rpad("Имя студента", 15) + ' ' +
                rpad("Группа", 8) + ' ' +
                rpad("Возраст", 8) + ' ' +
                rpad("Оценки", 20));
    
    console.log(rpad("", 15, '-') + ' ' + 
                rpad("", 8, '-') + ' ' + 
                rpad("", 8, '-') + ' ' + 
                rpad("", 20, '-'));
    
    for (var i = 0; i < students.length; i++) {
        console.log(
            rpad(students[i]['name'], 15) + ' ' +
            rpad(students[i]['group'], 8) + ' ' +
            rpad(students[i]['age'], 8) + ' ' +
            rpad(students[i]['marks'].join(', '), 20)
        );
    }
    console.log('\n');
};

printStudents(groupmates);

var filterByGroup = function(students, groupName) {
    var result = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i]['group'] === groupName) {
            result.push(students[i]);
        }
    }
    return result;
};

console.log("Студенты группы 912-2:");
var group912_2 = filterByGroup(groupmates, "912-2");
printStudents(group912_2);

console.log("Студенты группы 912-1:");
var group912_1 = filterByGroup(groupmates, "912-1");
printStudents(group912_1);