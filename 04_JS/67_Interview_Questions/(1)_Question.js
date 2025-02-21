// The Magical Sorting Hat: Imagine you are creating a magical sorting hat for a wizard school.
// Implement a JavaScript function that takes an array of student names and assigns them to one of
// the four houses (Gryffindor (length less than 6), Hufflepuff(length less than 8), Ravenclaw(length
// less than 12), or Slytherin (length greater than or equal to 12)) based on the length of their names.

const students = [
    "Harry", "Hermione", "Ron", "Draco", "Luna",
    "Neville", "Ginny", "Cedric", "Sirius", "Bellatrix",
    "Albus", "Voldemort", "Severus", "Minerva", "Hagrid",
    "Fleur", "Cho", "Lavender", "Percy", "Dobby"
];


for (let index = 0; index < students.length; index++) {
    let houseFilter = (students[index].length) < 6 ? "Gryffindor" : (students[index].length) < 8 ? "Hufflepuff" : (students[index].length) < 12 ? "Ravenclaw" : "Slytherin";
    let subArray= [students[index], houseFilter]
    students[index] = subArray
}

console.log(students);

