// 8. Async Array Mapping:
//    -- Write an asynchronous function that takes an array of numbers and 
//    -- Returns a new array of Promises where each number is multiplied by 2 after a delay of 500 milliseconds.

let arrNum = [1,2,3]

async function Multi2() {
    let Promises = arrNum.map(num=>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num*2) // this will pe passed to [.then]
            }, 500);
        })
    })

    let finalPromise = await Promise.all(Promises)
    return finalPromise
}

Multi2(arrNum).then(multipliedNum => console.log(multipliedNum))
