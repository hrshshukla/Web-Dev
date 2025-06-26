/*  Regex Pattern : 
(+) A regex pattern is a sequence of characters that defines a search pattern.
(+) It is used to find, match, or replace text in strings, 
(+) like searching for digits, words, or specific formats (e.g., dates or emails).
Syntax : stringName.match(/ [regexCode] /) 

"+" Matches one or more times 
"g" --> (Global Flag) : It searches the entire string instead of stopping after the first match.

Example :
(1) \d : matches digit
-- Output : '1'

(2) \d+ : Matches digit And "+" Matches  more than one times  
-- Output : '1000'

(3) \d+/g : matches digits, And "+" Matches one or more times, And "g" keeps searching after the first match and return Array[]
-- Output : [ '1000', '2000' ]                                                                                    */



let text = "Please give rs 1000 2000" ;

let numbers1 = text.match(/\d/);  // Extracts number once  = '1'
console.log("/d/",numbers1);  
// [
//   '1',
//   index: 15,
//   input: 'Please give rs 1000 4348374',
//   groups: undefined
// ]

let numbers2 = text.match(/\d+/);  // Extracts number one or more times = '1000'
console.log("/d+/", numbers2); 
// Output:
//  [
//     '1000',
//     index: 15,
//     input: 'Please give rs 1000 4348374',
//     groups: undefined
//   ]

let numbers3 = text.match(/\d+/g);  //  Extracts number one or more times and keeps searching = [ '1000', '2000' ]
console.log(numbers3); 
// Output : [ '1000', '2000' ]