// nested calling of function is called as callback-hell OR Pyramid of Doom 

function CallBack1(callbackFunction) {
    console.log("CallBack1 Executed!!");
    callbackFunction()
}

function CallBack2(callbackFunction) {
    console.log("CallBack2 Executed!!");
    callbackFunction()
}

function CallBack3(callbackFunction) {
    console.log("CallBack3 Executed!!");
    callbackFunction()
}

function CallBack4(callbackFunction) {
    console.log("CallBack4 Executed!!");
}

// 
// ❌ Bad Practice : This nested calling makes the code more difficult to understand and maintain
// ✅ To solve this this we use Promises
CallBack1(()=>{
    CallBack2(()=>{ 
        CallBack3(()=>{
            CallBack4();
        })
    })
})

