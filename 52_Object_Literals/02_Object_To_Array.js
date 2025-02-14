// Write a program to print marks of 10 students in class using [forof] and [forin] loop 

const studentsMarks = {
    John: 85,
    Sarah: 92,
    Michael: 78,
    Emma: 89,
    David: 95
};

for (const key in studentsMarks) {
    console.log(key, studentsMarks[key])
}


const Array = Object.entries(studentsMarks) // 
console.log(Array);




// for (const eachStudent of marksArray) {
//     console.log(eachStudent);
// }
