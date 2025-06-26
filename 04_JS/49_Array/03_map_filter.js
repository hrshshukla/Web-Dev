

let old_arr = [1, 2, 3, 4, 5, 6]
let new_arr = []

// Inserting Element using For loop : Usual Way
for (let i = 0; i < old_arr.length; i++) {
    const element = old_arr[i];
    new_arr.push(element) // ---->  every element of [old_arr] will insert into [new_arr]
}

console.log(new_arr); // [1, 2, 3, 4, 5, 6]


// Inserting Element using Arrow function
let new_arrY = old_arr.map(element => {
    return element
})
console.log(new_arrY); // [1, 2, 3, 4, 5, 6]


// Some thing Interesting 
const greaterThanSeven = (element => { // here greaterThanSeven is a variable whose value is assigned by the function inside it 
    if(element>7){
        return true
    }
    return false
})
console.log(old_arr.filter(greaterThanSeven));


// reduce 
let array2 = [1,2,3,4,5,6]
const temp_var = (arg1 , arg2) =>{
    return arg1 + arg2; // every time return the sum of index[n] + index[n+1]
}
console.log(array2.reduce(temp_var)); // 1+2+3+4+5+6 = 21


// .from 
let array4 = Array.from("Harsh")
console.log(array4); // [ 'H', 'a', 'r', 's', 'h' ]