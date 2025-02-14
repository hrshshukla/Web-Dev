// A dictionary on 5 words and its meaning 

const dictionary = {
    apple: "Apple : A fruit that is typically red, green, or yellow and is sweet and crisp.",
    car: "Cra : A vehicle with four wheels used for transportation.",
    computer: "Computer : An electronic device for processing data and performing tasks.",
    book: "Book : A set of written or printed pages, usually bound with a cover.",
    football: "Football : A sport played with a ball on a field by two teams trying to score goals."
}


const input = require('readline-sync');
let UserInput = input.question("Type word : (apple, car, computer, book, football ) \n --> ")
UserInput = UserInput.toLowerCase()


// console.log(dictionary.UserInput) -----> ❌Wrong : JS will directly search for [UserInput] inside [dictionary] which does not exist 
console.log(dictionary[UserInput]); // ---> ✅ Correct : First access the value stored in [UserInput] then
//                                                       If UserInput = "apple" then finally ---> (dictionary[UserInput]) becomes (dictionary.apple)