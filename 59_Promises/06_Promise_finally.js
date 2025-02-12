// .finally() is a method in Promises that runs after the Promise is [resolved or rejected], no matter what.

console.log("🔋 Phone is charging...");

let chargingStatus = new Promise((resolve, reject) => {
    let batteryFull = true

    batteryFull ? resolve("✅ Battery fully charged!") : reject("⚠️ Charger unplugged!")
})

chargingStatus
    .then((message)=>{
        console.log(message);
    })
    .catch((message)=>{
        console.log(message);
    })
    .finally(()=>console.log("🔌 Charging animation stopped.")) 
    // whether the battery is full (resolve) or the charger is unplugged (reject). -----> We always stop the charging animation, 
    // Without .finally(), you would need to repeat console.log("🔌 Charging animation stopped."); in both .then() and .catch().