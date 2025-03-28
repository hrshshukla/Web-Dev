// async makes any function return a promise automatically.
// 🔹 Without async, you must need return a promise by ourself.
// 🔹 With async, JavaScript automatically returns promise.




// normal function = return value as given
function fetchData1() {
    return "I'm Normal Function ✅ Data Fetched!" 
}
console.log(fetchData1()); // Output: I'm Normal Function


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
fetchData2().then(); // Output : I'm Async function returning Promise ✅ Data Fetched!