// await pauses execution until the promise resolves.

async function getData() {
    let promise = new Promise((resolve)=> setTimeout(() => { resolve("📦 Data Ready!")}, 2000))
    let data = await promise // Waits until promise resolves
    console.log(data);
}

getData()
console.log("⏳ Fetching...");  

// Output:
// ⏳ Fetching...
// 📦 Data Ready! (after 2 seconds)