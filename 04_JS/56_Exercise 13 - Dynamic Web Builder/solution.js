// there could be another version of this answer :
// -- like we can target the elements by there class and chnge the [innerText] inside them  

let count = 1
let container = document.querySelector(".container")

// Helper function
function getViews(views) {
    if (views < 1000) {
        return views
    }
    else if (views < 1000000) {
        return views/1000 + "K"
    }
    else if(views >= 1000000){
        return views/1000000 + "M"
    }
}

// Main Function
function createCard (title, cName, views, monthsold, duration, thumbnail){
    const Views = getViews(views)
    
    container.innerHTML += `<div class="card">
            <div class="number">${count}</div>
            <div class="thumbnail">
                <img src=${thumbnail} alt="oops!">
                <span class="duration">${duration}</span>
            </div>
            <div class="details">
                <div class="title">${title}</div>
                <div class="meta"> ${cName} • ${Views} views • ${monthsold} months age</div>
            </div>
        </div>`

    count++
}

createCard("Introduction to Backend | Sigma Web Dev video #2", "CodeWithHarry",
5600000, 7, "31:22", "thumbnail.png")
