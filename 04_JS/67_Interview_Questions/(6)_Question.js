// 6. The Vowel Counter:
//    You need to create a function that counts the number of vowels in a given string. 
//    Consider both uppercase and lowercase vowels.

let string = "How are you sir?"

function vowelCounter(str) {
    let vowels = str.match(/[AEIOUaeiou]/g)
    return vowels ? vowels.length : 0
    
}

console.log(vowelCounter(string)); // Output : 6

