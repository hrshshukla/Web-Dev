// use of [await] in fetch() and json() takes time So you should wait until they are completed

// Without (await)
let data1 = fetch("https://jsonplaceholder.typicode.com/todos/1") // Not waiting for fetch() process to complete. Hence data1 = undefined ❌ERROR 
let final1 = data1.json()  // Here as well, we didn't given the time to convert [data1] into JSON. Hence final1 = Undefined  ❌ERROR
console.log(final1); // ❌ERROR

// With (await)
let data2 = await fetch("https://jsonplaceholder.typicode.com/todos/1") // program will wait until fetch() is not completed and then await returns resolve ✅NO ERROR
let final2 = await data2.json() // program will wait until json() onversion is not completed and then await returns resolve ✅NO ERROR

console.log(final2); // Output : { userId: 1, id: 1, title: 'delectus aut autem', completed: false }




