let WakeUp = new Promise((resolve, reject) => {
    let wokeUpOnTime = true;
    wokeUpOnTime ? resolve("⏰ Woke up on time") : reject("❌ Overslept");
});

let Breakfast = new Promise((resolve, reject) => {
    let hadBreakfast = false;
    hadBreakfast ? resolve("🍞 Had breakfast") : reject("❌ Skipped breakfast");
});

let ReachedOffice = new Promise((resolve, reject) => {
    let reachedOnTime = true;
    reachedOnTime ? resolve("🏢 Reached College on time") : reject("❌ Got late to College");
});


let DailyRoutine = Promise.allSettled([WakeUp,   Breakfast,   ReachedOffice]) /* returns [Result] Doesn't matter if it is resolve() or reject()
let DailyRoutine = Promise.allSettled([resolve,   reject,       resolve   ])                                                                                     */

DailyRoutine
    .then((arrayofAllResults)=>{
    console.log(arrayofAllResults); 
    })

// 
//     { status: 'fulfilled', value: '⏰ Woke up on time' },        
//     { status: 'rejected', reason: '❌ Skipped breakfast' },      
//     { status: 'fulfilled', value: '🏢 Reached College on time' }
// 