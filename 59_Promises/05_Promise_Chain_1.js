// Promise Chaining using varibales
// Try changing the value from  true (✅) to  false (❌)
// So technically, 
// if Order = ❌ then [Baked] & [Delivery] function would not be called, Hence Ouput = ❌ Not Ordered
// And if Order = ✅ && Baked = ❌ then [Delivery] function would not be called, Hence Ouput = [🍕 Pizza is ordered] [❌ Not Baked]
// And if Order = ✅ && Baked = ✅ but Delivery = ❌ then [🍕 Pizza is ordered] [🔥 Pizza is baked] [❌ Not delivered]
// And if Order = ✅ && Baked = ✅ but Delivery = ✅ then [🍕 Pizza is ordered] [🔥 Pizza is baked] [🚗 Pizza is delivered]


let Order =  new Promise((resolve, reject) => {
        let pizzaOrdered = true
        pizzaOrdered ? resolve("🍕 Pizza is ordered") : reject("❌Not Ordered")
})

let Baked = new Promise((resolve, reject) => {
        let pizzaBaked = false
        pizzaBaked ? resolve("🔥 Pizza is baked") : reject("❌ Not Baked")
})

let Delivery = new Promise((resolve, reject) => {
        let pizzaDelivered = true
        pizzaDelivered? resolve("🚗 Pizza is delivered") : reject("❌ Not delivered")
})

Order
    .then((message)=>{ // This one will trigger for [pizzaOrdered]
        console.log(message); // Ouput : "🍕 Pizza is ordered"
        return Baked
    })
    .then((message)=>{ // This one will trigger for [pizzaBaked]
        console.log(message); // Output : "🔥 Pizza is baked"
        return Delivery
    })
    .then((message)=>{ // This one will trigger for [pizzaDelivered]
        console.log(message); // Output : "🚗 Pizza is delivered"
    })
    .catch((errorMessage)=>{
        console.log(errorMessage); // if anything goes wrong this will trigger 
    })

