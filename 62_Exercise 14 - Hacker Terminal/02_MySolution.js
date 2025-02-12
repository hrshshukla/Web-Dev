// In this code when we add "✅" this emoji, it appears larger then text 
// So we are going to solve it into [03_MySolution.js]

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
        dots = (dots + 1) % 4
        textElement.textContent = message + ".".repeat(dots)
    }, 200);
}

async function displayMessages() {
    for (let message of messages) {
        const textElement = document.createElement("div")
        textContainer.appendChild(textElement)

        const blinkingInterval = blinking(textElement, message)

        let random_time = 1+(Math.random() * 7)
        await new Promise((resolve) => setTimeout( resolve, random_time*1000))

        clearInterval(blinkingInterval)
        textElement.textContent = message + "✅" // This emoji appears bigger than text
    }
}
displayMessages()