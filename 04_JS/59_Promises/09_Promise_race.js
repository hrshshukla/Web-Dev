// The first resolve which comes becomes the final output
// Application : I wanted to download same image form [Google] & [Bing] then,  one of them which download the image faster will be my priority 
// In this code we have only used resolve() and No reject() in the promise arguments : new Promise((resolve) 

let Bus = new Promise((resolve) => {
    let busArrived = false;
    if (busArrived) resolve("🚌 Bus arrived first")
});

let Train = new Promise((resolve) => {
    let trainArrived = true;
    if (trainArrived)  resolve("🚆 Train arrived first") 
});

let Cab = new Promise((resolve) => {
    let cabArrived = false;
    if (cabArrived)  resolve("🚖 Cab arrived first")
});

let FirstVehicle = Promise.race([Bus, Train, Cab])

FirstVehicle.then((winnerName)=>{
    console.log(winnerName); // output : 🚆 Train arrived first
})