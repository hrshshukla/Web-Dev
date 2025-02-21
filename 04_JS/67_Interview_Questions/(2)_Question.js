// 2. The Double Trouble: You are tasked with writing a function that multiply each element in an array with 2.
// However, there's a catch: if the array contains consecutive duplicate elements, then only multiply one of them.
// input : [2, 2, 3, 3, 3, 4] -------> output : [4, 2, 6, 3, 3, 8]

let number = [2, 2, 3, 3, 3, 4]

//Solution : (1)
function multiplyWith2() {
    let tempNum = 0
    for (let i = 0; i < number.length; i++) {
        if (tempNum !== number[i]) {
            if (number[i] === number[(i+1)] || i == (number.length - 1)){
                tempNum = number[i]
                number[i] *= 2
            }
        }
    }
}

//Solution : (2)
function multiplyWithTwo() {
    let tempArray = []
    for (let i = 0; i < number.length; i++) {
        if (i>0 && number[i] === number[i-1]) {
            tempArray.push(number[i])
        }
        else{
            tempArray.push(number[i]*2)
        }
    }
    number = [] // clearing the Array[] to fill final values 
    number = number.concat(tempArray) // putting the new final values from tempArray[] to number[]
}

multiplyWithTwo()
console.log(number);

