// DOM is a tree represents like structure. So if want to select a [ID] or [Class] in the [html]
//  then you have to start from root element all the way upto the last element you want to select 


// *** RUN IN Browser*** 
document.title = "Harsh"
console.log(document.body);

document.body.style.backgroundColor = "black" // adds inline css

document.body.childNodes[1]

let container = document.body.childNodes[1]
// undefined

container.firstChild
// #text

container.lastChild
// #text

container.childNodes[3]
// <div class=​"box">​1​</div>​

container.firstElementChild // ----> to get only element childs. means No [#comment, #text] childs
// <div class=​"box">​1​</div>​

container.firstElementChild.style.backgroundColor= "green";
// 'green'

