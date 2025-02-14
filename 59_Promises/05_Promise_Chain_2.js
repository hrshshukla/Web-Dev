// Promise changing using function
// Try changing the value from  true (✅) to  false (❌)
// So technically, 
// if pizzaOrdered = ❌ then [pizzaBaked] & [pizzaDelivered] function would not be called, Hence Output = ❌ Not Ordered
// And if pizzaOrdered = ✅ && pizzaBaked = ❌ then [pizzaDelivered] function would not be called, Hence Output = [🍕 Pizza is ordered] [❌ Not Baked]
// And if pizzaOrdered = ✅ && pizzaBaked = ✅ but pizzaDelivered = ❌ then [🍕 Pizza is ordered] [🔥 Pizza is baked] [❌ Not delivered]
// And if pizzaOrdered = ✅ && pizzaBaked = ✅ but pizzaDelivered = ✅ then [🍕 Pizza is ordered] [🔥 Pizza is baked] [🚗 Pizza is delivered]

function orderPizza() {
    let pizzaOrdered = true
    return new Promise((resolve, reject) => {
        pizzaOrdered ? resolve("🍕 Pizza is ordered") : reject("❌Not Ordered")
    })
}

function pizzaBaked() {
    let pizzaBaked = true
    return new Promise((resolve, reject) => {
        pizzaBaked ? resolve("🔥 Pizza is baked") : reject("❌ Not Baked")
    })
}

function pizzaDelivered() {
    let pizzaDelivered = true
    return new Promise((resolve, reject) => {
        pizzaDelivered? resolve("🚗 Pizza is delivered") : reject("❌ Not delivered")
    })
}

orderPizza()
    .then((message)=>{ // This one will trigger for [pizzaOrdered]
        console.log(message); // Output : "🍕 Pizza is ordered"
        return pizzaBaked()
    })
    .then((message)=>{ // This one will trigger for [pizzaBaked]
        console.log(message); // Output : "🔥 Pizza is baked"
        return pizzaDelivered()
    })
    .then((message)=>{ // This one will trigger for [pizzaDelivered]
        console.log(message); // Output : "🚗 Pizza is delivered"
    })
    .catch((errorMessage)=>{
        console.log(errorMessage); // if anything goes wrong this will trigger 
    })

