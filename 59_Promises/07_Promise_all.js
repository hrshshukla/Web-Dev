
// Promise.all() return value if all the promises are resolved() and if anyone of the promise gives reject() then it wouldnt work 
// Promises returns array value ---> Promise.all([resolve, resolve, resolve])

let Order =  new Promise((resolve, reject) => {
    let pizzaOrdered = true
    pizzaOrdered ? resolve("🍕 Pizza is ordered") : reject("❌Not Ordered")
})

let Baked = new Promise((resolve, reject) => {
    let pizzaBaked = true
    pizzaBaked ? resolve("🔥 Pizza is baked") : reject("❌ Not Baked")
})

let Delivery = new Promise((resolve, reject) => {
    let pizzaDelivered = true
    pizzaDelivered? resolve("🚗 Pizza is delivered") : reject("❌ Not delivered")
})


let OrderFullfilled = Promise.all([Order,   Baked,   Delivery]) /* if all promises [Order] [Baked] [Delivery] return resolve()
let OrderFullfilled = Promise.all([resolve, resolve, resolve])                                             */

OrderFullfilled
    .then((arrayofAllResolve)=>{
    console.log(arrayofAllResolve); // Output : [ '🍕 Pizza is ordered', '🔥 Pizza is baked', '🚗 Pizza is delivered' ]
    console.log("Order Fullfilled Successfully ✅");
    })