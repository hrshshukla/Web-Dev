let script = document.createElement("script")
const callback = (arg) => console.log(arg)

// ❌ Incorrect: Executes immediately, doesn't wait for script to load
script.onload = callback("Harsh"); // here we are assinging value to [script.onload]  which doesnt make sense

// ✅ Correct: Executes only when the script finishes loading
script.onload = () => callback("Harsh"); // here we are saying that once script get loaded (script.onload) 
//                                           then perform a arrow function which calls ----> callback("Harsh")