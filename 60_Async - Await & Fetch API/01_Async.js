// async makes any function return a promise automatically.
// 🔹 Without async, you must explicitly return a promise.
// 🔹 With async, JavaScript automatically wraps it inside a promise.




// normal function = return value as given
function fetchData1() {
    return "I'm Normal Function ✅ Data Fetched!" 
}
console.log(fetchData1()); // Ouput: I'm Normal Function


// Async + normal function = return Promise 
async function fetchData2() {
    return "I'm Async function returning Promise ✅ Data Fetched!";
}

// Possible way to Print : 
// Number : (1)
console.log(fetchData2()); // Output : Promise { "I'm Async function returning Promise ✅ Data Fetched!" }

// Number : (2)
// As we know [.then] was used with Promise
//  and because Async also made [fetchData2] to return a Promise. So now, we can use [.then] with [fetchData2] also
fetchData2().then(); // Ouput : I'm Async function returning Promise ✅ Data Fetched!