// Avoids .then() chaining → Code looks cleaner. 

async function fetchData() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts/1") // Fetch the data 
        let data = await response.json() // Convert the data into JSON
        console.log(data); // Print the data 
        
    } catch (errorMsg) {
        console.log(errorMsg.message);
    }
}