/* 
-- Assume, (User : Harsh )        (Server :Facebook )
-- The [Content-Type] in an request tells the server what type of data is being sent by the User . 
-- means if I do "POST" ---> header : {"Content-Type" : "text/plain"} then server will understand that ---> "Ohh! so harsh has send me plain-text data" 

-- There are some common values you can use for Content-Type:
(+) JSON (Most Common) ------->    "Content-Type": "application/json"
(+) Form Data (URL Encoded) -->    "Content-Type": "application/x-www-form-urlencoded"
(+) Plain Text  -------------->    "Content-Type": "text/plain"
(+) HTML  -------------------->    "Content-Type": "text/html"
(+) JavaScript --------------->    "Content-Type": "application/javascript"
(+) CSV      ----------------->    "Content-Type": "text/csv"                                                                                                                                            */


// (+) JSON (Most Common) 
fetch("https://example.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ name: "Harsh", age: 20 }) // Sending JSON data in a request body.
});


// (+) Form Data (URL Encoded) 
fetch("https://example.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, //Encoded format : to send form data (like login credentials)
    body: "name=Harsh&age=20"  // format : key=value&key2=value2
});


// (+) Plain Text 
fetch("https://example.com/api", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "Hello, this is a text message!" // Sending simple text data without formatting.
});


// (+) HTML
fetch("https://example.com/api", {
    method: "POST",
    headers: { "Content-Type": "text/html" },
    body: "<h1>Hello World</h1>" // Sending raw HTML content.
});


// (+) JavaScript (Not Common)
fetch("https://example.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/javascript" },
    body: "console.log('Hello World');" // Sending JavaScript code (not common).
});


// (+) CSV                                                                                                                                                          */
fetch("https://example.com/upload", {
    method: "POST",
    headers: { "Content-Type": "text/csv" },
    body: "name,age\nHarsh,20\nPrateek,22" //  Sending CSV data, usually for spreadsheets.
});
