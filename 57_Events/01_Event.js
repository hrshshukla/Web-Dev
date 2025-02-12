let button = document.querySelector(".btn")
button.addEventListener("click", ()=>{
    alert("I got clicked!!") 
})

// Click
let box = document.querySelector(".box") // When clicked on [.box] ---> [I am a Box] changed to [I noticed something] 
box.addEventListener("click", ()=>{
    document.getElementsByClassName("box")[0].innerHTML = "<b> I noticed something </b>" 
})

// Double Click
let btn2 = document.querySelector(".btn2") // When clicked on [.box] ---> [I am a Box] changed to [I noticed something] 
btn2.addEventListener("dblclick", ()=>{
    btn2.innerText = " You clicked me two times"
})

// Right Click 
document.addEventListener("contextmenu", ()=>{
    alert("Don't try to do right click")
})

//  KEYBOARD : keydown
document.addEventListener("keydown", (eventObject)=>{
    console.log(eventObject.key, eventObject.code);
})