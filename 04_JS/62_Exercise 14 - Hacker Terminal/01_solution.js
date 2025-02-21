let textValues = ["Searching Files",
    "Reading your Files",
    "files password Detected",
    "Sending all passwords and personal files to server",
    "Cleaning up"]

let randomTime = () => {
    return new Promise((resolve) => {
        let timeout = Math.floor(1 + (Math.random() * 7)) // 1 sec + (Math.random() * 7 sec)
        
        setTimeout(() => {
            resolve() // will return resolve() between 0-7 and untill it didn't return resolve(),  addItem() will not run
        }, timeout * 1000); // timeout = numbers between 0-7 and (* 1000) --> to convert final value into thousands millisecond 
    })
}


async function main() {

    let intervalTime = setInterval(() => {

        let textContainer = document.querySelector(".textContainer")
        let lastDiv = textContainer.getElementsByTagName("div") // selects all <div> inside ------> [textContainer]
        lastDiv = lastDiv[lastDiv.length - 1] // <div class="textContainer">                ------->  textContainer.length = 1
        //                                           <div>Initializing Hacking</div>             --> textContainer.length[0] to get index zero do [-1]
        //                                       </div   

        if (lastDiv.innerHTML.endsWith("...")) {
            lastDiv.innerHTML = lastDiv.innerHTML.slice(0, -3) // Input : [Initializing Hacking...] ---> Output : [Initializing Hacking]  
        }
        else {
            lastDiv.innerHTML = lastDiv.innerHTML + "."
        }

    }, 200);





    let addItem = async (addElement) => {
        await randomTime() // wait for random time, once it returns resolve then run further code

        let textContainer = document.querySelector(".textContainer") // selects [.textContainer] element
        let addNewElement = document.createElement("div")// create a <div> element 
        addNewElement.textContent = addElement  //  insert the text value passed by [text] inside ---->  created <div></div>

        let lastDiv = textContainer.getElementsByTagName("div") // return of all divs inside [textContainer]---> textcontainer[div_index]
        lastDiv = lastDiv[lastDiv.length - 1] 

        // remove dots from "Searching Files..." before adding "Reading your Files"
        while (lastDiv.innerHTML.endsWith(".")) {   
            lastDiv.innerHTML = lastDiv.innerHTML.slice(0, -1); // keep removing 1 letter from last until there is a dot (.) in ending  
        }
        lastDiv.innerHTML = lastDiv.innerHTML + "✅" // after removing dots add ✅ in last 

        textContainer.appendChild(addNewElement) // Now adding that new <div> 
    }

    for (const item of textValues) {
        await addItem(item)
    }

    await randomTime()
    clearInterval(intervalTime)

}
main()