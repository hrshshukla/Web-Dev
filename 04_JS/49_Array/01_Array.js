
let arr = [1, 2, 3, 4, 9] 

console.log(arr); //---> [ 1, 2, 3, 4, 9 ]
console.log(arr.length); // ---> 5

// Arrays are muteable 
arr[0] = 899;
console.log(arr); // [ 899, 2, 3, 4, 9 ]

console.log(typeof(arr)); // Object


// .toString converts value of array into string
let str1 = arr; // wrong way ---> [ 899, 2, 3, 4, 9 ]
let str = (arr.toString()); // right way ---> 899,2,3,4,9
console.log(str);


// join 
 console.log(arr.join(" + ")); // Now arr will look like this : 899 + 2 + 3 + 4 + 9 <--- also converted into string 
 
 console.log(` ${eval(` ${arr.join(" + ")} `)} `);
//          (  ${eval(` 899 + 2 + 3 + 4 + 9 `)})
//          ( 917 )
 


// arr.pop() < --- delete the last element
console.log(arr.pop()); // Prints the last element which is deleted 
console.log(arr); // Now remaining arr = [ 899, 2, 3, 4 ]




// .shift() <--- delete the first element
arr.shift();
console.log(arr); // arr = [ 2, 3, 4 ]



//.unshift() <---- add element first place
arr.unshift(99) 
console.log(arr); // arr = [ 99, 2, 3, 4 ]


// .push <--- add element in last place
arr.push(100);
console.log(arr); // arr = [ 2, 3, 4, 100 ]


// delete <-- delete the element but didn't delete the space allocated in memory 
delete arr[0];
console.log(arr); // [ <1 empty item>, 2, 3, 4, 100 ]



// .concat
let array1 = [100, 200]
let array2 = [400, 600]
let array3 = [900, 1200]

let final_arr = array1.concat(array2, array3);
console.log(final_arr); // [ 100, 200, 400, 600, 900, 1200 ]


// sort 
let messy_arr = [20, 49, 2, 99, 81, 3]
console.log(messy_arr.sort()); // Output : [ 2, 20, 3, 49, 81, 99 ]

// "2" comes before "3".
// "3" comes before "4".
// "4" comes before "8".
// "8" comes before "9".


// Splice 
let numbers = [100, 200, 400, 500, 600, 700, 800]
// index :     [0]  [1]  [2]  [3]  [4]  [5]  [6]

 numbers.splice(1,4) //  means start from index [1] and remove 4 elements ----> from [200] to [600]
 numbers.splice(1,4, 1900, 2000) // means start from index [1] and remove 4 elements -- AND -- add [1900, 2000] in the array from index [1]

 console.log(numbers); // [ 100, 1900, 2000, 700, 800 ]
 
// numbers.splice( {start-index}, {no of element to remove}, {elemets to be added} )



// Slice
let num2 = [1, 2, 3, 4, 5, 6]
num2.slice(2); // ---> return values from index [2] i.e  [ 3, 4, 5, 6 ]

let num3 = [1,  2,  3,  4,  5,  6]
// index : [0] [1] [2] [3] [4] [5]

     // ---> return values from index [2] and before index [5] means ---> from index [2] to [4]
    console.log(num3.slice(2,5)); // [ 3, 4, 5 ]


    
// reverse 
let num4 = [1,2,3,4,5]
      console.log(num4.reverse()); // [ 5, 4, 3, 2, 1 ]
      