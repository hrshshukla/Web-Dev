// (1) includes()   -- Checks if a string contains a specific substring.
// (2) startsWith() -- Checks if a string starts with a specific substring.
// (3) endsWith()   -- Checks if a string ends with a specific substring.



// (1) stringName.includes("substring")
let text = "Hello, World!";
console.log(text.includes("World"));   // Output: true
console.log(text.includes("world"));   // Output: false (case-sensitive)



// (2) stringName.startsWith("substring")
let MomName = "Pratima"
console.log(MomName.startsWith("Pra")); // true ----> becasue "Pratima" is starting with "Pra"
console.log(MomName.endsWith("bha")); // false ----> becasue "Pratima" do not ends with "bha"


// (3) string.endsWith("substring")
let text2 = "Hello, World!";
console.log(text2.endsWith("World!"));  // Output: true
console.log(text2.endsWith("Hello"));   // Output: false
