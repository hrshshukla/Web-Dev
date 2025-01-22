// DOM is a tree represents like structure. So if want to select a [ID] or [Class] in the [html]
//  then you have to start from root element all the way upto the last element you want to select 


// *** RUN IN Browser*** 
document.title = "Harsh"
console.log(document.body);

document.body.style.backgroundColor = "black" // adds inline css

document.body.childNodes[1] // it includes : #comment #text and elements

document.body.firstElementChild // Only includes : element
//<div class=​"container">​…​</div>​

document.body.firstElementChild.children // to get all childrens 

document.body.firstElementChild.children[1].previousElementSibling
//<div class=​"box" style=​"background-color:​ green;​">​1​</div>​

document.body.firstElementChild.children[1].nextElementSibling
//<div class=​"box">​3​</div>​

document.body.firstElementChild.children[1].parentElement
//<div class=​"container">​…​</div>​




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