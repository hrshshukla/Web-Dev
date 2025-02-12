// (+) try runs the code that may cause an error.
// (+) catch (error) runs if an error occurs.
// (+) Without try & catch, an error in [await] will break the program.
//     So, Instead of crashing the program, the error is caught and logged into the screen.

// Syntax :
try {
    // Code that may cause an error -------> Code inside this block is executed. If an error occurs, execution stops, and it moves to catch {}
} 
catch (errorMsg) {
    // Code to handle that error ----->  Handles the error without stopping the whole program.
}


// Program :
async function fetchData() {
    try {
        let data = await fetch("https://wrong-url.com")  // ❌ Error: Invalid URL
        console.log(await data.json());
    } 
    catch (errorMsg) {
        console.log("⚠️ Failed to fetch data:", errorMsg.message); // errorMsg.message ----> generates a logical error message
    }
}

fetchData() // ⚠️ Failed to fetch data: fetch failed