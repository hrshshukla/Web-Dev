// In this code when we add "✅" this emoji, it appears larger then text 
// So we are going to solve it into [03_MySolution.js]

// Solution : we will add a <span> inside [textElement] 
//            And we will adjust the size of that span using CSS


const messages = [
    "Initializing Hacking",
    "Reading your Files",
    "Password files Detected",
    "Sending all passwords and personal files to server",
    "Cleaning up"
]

const textContainer = document.querySelector(".textContainer")

function blinking(textElement, message) {
    let dots = 0
    return setInterval(() => {
        dots = (dots+1) % 4
        textElement.textContent = message + ".".repeat(dots)
    }, 200);
}

async function displayMessages() {
    for (let message of messages) {
        const textElement = document.createElement("div")
        textContainer.appendChild(textElement)

        const textTick = document.createElement("span")
        textTick.textContent = "✅"
        textTick.classList.add("emoji") // will add class into this span --> class="emoji"

        const blinkingInterval = blinking(textElement, message)
        
        let random_time = 1+(Math.random() * 7)
        await new Promise((resolve) => setTimeout( resolve, random_time * 1000))

        clearInterval(blinkingInterval)

        textElement.textContent = message + " "
        textElement.appendChild(textTick)
    }
}

displayMessages()