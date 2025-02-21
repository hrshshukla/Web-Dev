// 9. The Asynchronous Shopper:
//    Imagine you are building an online shopping application. 
//    Write an asynchronous function called placeOrder that simulates placing an order and returns a promise. 
//    The promise should resolve with an order confirmation message after a random delay.


async function placeOrder() {
    let randomTime = 1000 * (Math.random()*10) 
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("✅Order Confirmed!")
        }, randomTime) 
    })
}

placeOrder().then((message)=>console.log(message))