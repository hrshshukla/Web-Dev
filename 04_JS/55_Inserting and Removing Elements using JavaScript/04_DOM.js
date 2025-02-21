// ------------ innerHTML ----------------------
document.querySelector(".box").innerHTML    
// 'I am box 1'

document.querySelector(".container").innerHTML
// '\n        <div class="box">I am box 1</div>\n        <div class="box">I am box 2</div>\n    '

document.querySelector(".box").innerText
// 'I am box 1'

document.querySelector(".container").innerText
// 'I am box 1\nI am box 2'



// ------------ outerHTML ----------------------
document.querySelector(".container").outerHTML
// '<div class="container">\n        <div class="box">I am box 1</div>\n        <div class="box">I am box 2</div>\n    </div>'

document.querySelector(".box").outerHTML
// '<div class="box">I am box 1</div>'


document.querySelector(".box").tagName
// 'DIV'
document.querySelector(".box").nodeName
// 'DIV'
document.querySelector(".container").hidden
// false
document.querySelector(".container").hidden = true
// true


document.querySelector(".box").innerHTML = "I'm changed"
// "I'm changed"
document.querySelector(".box").innerText = "I'm changed again"
// "I'm changed again"


document.querySelector(".box2").hasAttribute("style")
false

document.querySelector(".box1").hasAttribute("style")
true
document.querySelector(".box1").getAttribute("style")
'color: blue;'
document.querySelector(".box1").setAttribute("style", "color: red")

document.querySelector(".box1").attributes // to get all attributes of an element
// NamedNodeMap {0: class, 1: style, class: class, style: style, length: 2}



document.querySelector(".box1").removeAttribute("style")
// undefined
document.querySelector(".box1").hasAttribute("style")
// false



document.querySelector(".box3").dataset
// DOMStringMap {myname: 'Harsh'}