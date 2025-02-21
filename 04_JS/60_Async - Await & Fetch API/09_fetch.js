/* (+) What is fetch() in JavaScript?
 -- fetch() is a built-in JavaScript function used to make HTTP requests (like getting data from a server). 
 -- It returns a Promise, making it an asynchronous function.

 (+) Why Use fetch()?
 -- Used to retrieve data from APIs (Application Programming Interfaces)
    Works with GET, POST, PUT, DELETE requests
    Uses Promises, so no need for complex XMLHttpRequest
    Can handle JSON data easily                                                                                            
 
 (+)Syntax:                                                                                                                                                                 */
    fetch(URL, options)                  // -----> makes a request to the API.
    .then(response => response.json())   // -----> response is the raw HTTP response (not yet usable as data) so Converting response to JSON
      .then(data => console.log(data))     // -----> Prints that JSON response
         .catch(error => console.log("Error:", error)); /* -----> Handle errors  
    
 (+) fetch() → response (raw HTTP) → .json() → data (usable JSON) → console.log(data)
    
 (+) Chaining of .then 
   -- Here, both .then() are connected to fetch(), but they work in a chained manner
   -- Means the second .then() depends on the first one. And takes data from first .then 
   -- So, response.json() = data = console.log(data);


    
 
    
    
*/

