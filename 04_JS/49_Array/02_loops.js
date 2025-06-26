// for each loop : automatic increment 
let arr = [100, 200, 300, 400, 500, 600]

arr.forEach((value, index, arr) => {
    console.log(value, index, arr);
})

// 100 0 [ 100, 200, 300, 400, 500, 600 ]
// 200 1 [ 100, 200, 300, 400, 500, 600 ]
// 300 2 [ 100, 200, 300, 400, 500, 600 ]
// 400 3 [ 100, 200, 300, 400, 500, 600 ]
// 500 4 [ 100, 200, 300, 400, 500, 600 ]
// 600 5 [ 100, 200, 300, 400, 500, 600 ]

// for-in loop
let obj = {
    a : 1,
    b : 2, 
    c : 3
}

for (const key in obj) {
        const element = obj[key];
        console.log(element); // 1 2 3 
}

// for-of
for (const element of arr) { // here element is a iterator which points to each index value of array
  console.log(element); // And it prints the value of element
}

