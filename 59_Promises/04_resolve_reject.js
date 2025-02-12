// Concept (1) : Assigning Custom name to [resolve] and [reject]
// Concept (2) : Handling ERROR message with [.then] instead of [.catch] -----> .then(resolve, reject)

// ------------ Concept (1) -------------
let MyPromise = new Promise((success, failure) => {
    let goalAchived = true

    goalAchived ? success("Task successfull ✅") : failure("Task Failed ❌")
})

MyPromise
    .then((successMsg)=>{
        console.log(successMsg);
    })
    .catch((failureMsg)=>{
        console.log(failureMsg);
    })

// ------------ Concept (2) -------------

let AnotherPromise = new Promise((resolve, reject) => {
    let taskCompleted = false

    taskCompleted ? resolve("Ya Completed!!") : reject("No! We failed")
})

AnotherPromise
    .then(
        (goodMsg) => {console.log(goodMsg);}, // this will handle .resolve() value
        (badMsg) => {console.log(badMsg);}   // this will handle .catch() value
    )