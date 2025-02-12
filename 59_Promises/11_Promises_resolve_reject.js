// Promise.resolve() and Promise.reject() works same as : Promise(resolve, reject)
// this is used just because it is cleaner and immediate 

let PaymentSuccessful = Promise.resolve("✅ Payment completed successfully");
let PaymentFailed = Promise.reject("❌ Payment failed due to insufficient balance");

PaymentSuccessful.then((SuccessMsg) => {
    console.log(SuccessMsg);
});

PaymentFailed.catch((error) => {
    console.log(error);
});
