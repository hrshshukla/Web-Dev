// Reason to use Await :
// --> Makes the code more readable & understandable 




// __________________________(Without await)__________________________

function fetchData1() {
    return new Promise((resolve) =>{ setTimeout(() => { resolve("📦 Data Loaded!")}, 2000)  })
}

fetchData1().then(console.log)
console.log("⏳ Waiting...");

//Ouput:
// ⏳ Waiting...
// 📦 Data Loaded! (after 2 sec)




// __________________________(With await & async)__________________________

async function fetchData2() {
    let result = await new Promise((resolve) =>{ setTimeout(() => { resolve("📦 Data Loaded!")}, 2000)  })
    console.log(result); 
}

console.log("⏳ Waiting...");
fetchData2()

//Output: (Same Ouput as fetchData1 but, more readable code)
// ⏳ Waiting...
// 📦 Data Loaded! (after 2 sec)

