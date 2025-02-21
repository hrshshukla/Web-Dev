// When a function is passed as an argument into another funtion then it is called as function callback
// when [ callbackFuntion ] is passed as an argument into another funtion (const loadScript) ---> [const loadScript = (LinkOfScript, callbackFuntion)] 

const callbackFuntion = (arg) => {
    console.log(arg)
}

const loadScript = (LinkOfScript, callbackFuntion) => {
    let scriptVar = document.createElement("script") // <script></script>
    scriptVar.src = LinkOfScript; // <script src="https://example.com/script.js"></script>
    scriptVar.onload = ()=> callbackFuntion("Harsh"); // when "script" get loaded then run ---> callback("Harsh")
    document.head.append(scriptVar) // means, 
    // <head> 
    //      <script src="https://example.com/script.js"></script> 
    // </head>
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", callbackFuntion)

// Difference between resolve and settle 