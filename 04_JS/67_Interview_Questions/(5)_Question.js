// 5. The Sum Selector:
//    You are working on a function that should sum all numbers in an array until it encounters a negative number.

let arrayNum = [10, 20, 0, 30, 40]

function Sum(arr) {
    let finalAnswer = 0
    for (let value of arrayNum) {
        if (value===0) { break }
        finalAnswer += value
    }   
    return finalAnswer
}

console.log(Sum(arrayNum));
