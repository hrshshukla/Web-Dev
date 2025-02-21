// _____________________then()_________________________________|____________________catch()________________________________
// .then() only works with resolve()                           | .catch() only works with reject()
// When a promise resolves successfully, .then() is triggered. | If a promise fails (rejects), .catch() is triggered.  
// It receives the value passed inside  resolve().             | .catch() receives the error message passed inside reject().


let orderPizza = new Promise((resolve, reject) => {
    let pizzaReady = true

    if (pizzaReady) {
        resolve("🍕 Pizza is ready!");
    } else {
        reject("❌ Sorry, we ran out of ingredients!");
    }
})

orderPizza
    .then((message) => { 
        console.log("success", message); // Runs if the promise is resolved
    })
    .catch((errorMessage) => {
        console.log("fail", errorMessage); // Runs if the promise is rejected
    })
    
// Que: who is passing the value to [.then] and [.catch] ?
// Ans:  resolve("🍕 Pizza is ready!"); ---->  .then(("🍕 Pizza is ready!") -----> { console.log("success", "🍕 Pizza is ready!"); }) 