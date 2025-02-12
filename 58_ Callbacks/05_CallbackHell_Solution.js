// nested calling of function is called as callback-hell OR Pyramid of Doom 

function CallBack1(){
    console.log("CallBack1 Executed!!");
    return new Promise((resolve) => resolve() )
}

function CallBack2(){
    console.log("CallBack2 Executed!!");
    return new Promise((resolve) => resolve() )
}

function CallBack3(){
    console.log("CallBack3 Executed!!");
    return new Promise((resolve) => resolve() )
}

function CallBackEnd(){
    console.log("CallBack End!!");
    return new Promise((resolve) => resolve() )
}

// ✅ Promise made the code more understandable and maintainable
CallBack1()
    .then(CallBack2) // Now it becomes easier to change that which function we should call next after CallBack1()
    .then(CallBack3)
    .then(CallBackEnd)
    .catch(()=> console.log("error"))

