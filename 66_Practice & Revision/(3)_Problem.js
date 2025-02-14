// Read the (2) part full with Questions and Answer 
// Write a program to print marks of 10 students in class inside OBJECT using [forof] and [forin] loop 

const studentsMarks = {
    John: 85,
    Sarah: 92,
    Michael: 78,
    Emma: 89,
    David: 95
};

// (1) for-of loop
for (const key in studentsMarks) {
    console.log(key, studentsMarks[key])
}
console.log("\n")



// (2) for-in loop : needs iteratable value and object{} is not iteratable
// So, converting object{} into  Array[] using "Object.entries"
const studentDetailArray = Object.entries(studentsMarks)

for (const [name, marks] of studentDetailArray) { // why i have written these two values [name, marks] ?  [Answer : below]
    console.log(name, marks);
}                                                                                                                                                                               /* 



Que : why i have written these two values [name, marks] ?
Ans : After converting object : studentsMarks{} into Array using [Object.entries]
    ---> const studentDetailArray = Object.entries(studentsMarks)

    The [studentDetailArray] contains nested array values. 
    So the Output of [studentDetailArray] will be : 

    studentDetailArray =
    [
        ["John", 85]
        ["Sarah", 92]
        ["Michael", 78]
        ["Emma", 89]
        ["David", 95]
    ]
    
    that means at every index of [studentDetailArray] a array value is stored 
    So output of ---> studentDetailArray[0]     =  ["John", 85] 
    And output of ---> studentDetailArray[0][0]  =    John

    Ou

    Now if we write "pair" in place of [name, marks]
    ---> for (const pair of studentDetail) then, 
    ---> console.log(pair)   will print :
        ["John", 85]
        ["Sarah", 92]
        ["Michael", 78]
        ["Emma", 89]
        ["David", 95]

    Hence pair = ["John", 85]......

    To solve this we will use [Destructuring]
    Now we know
    --> const [Fruit1, Fruit2] = ["Apple", "Mango"] 
    --> Fruit1 = "Apple"   &   Fruit2 = "Mango"     
    
    So if I Destructure [pair] then 
         [pair]  = [name, marks]
    ["John", 85] = [name, marks]



    */ 