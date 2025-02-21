// fetch() requests : GET, POST, PUT, DELETE 

// 1️⃣ GET Request (Fetching Data)
fetch("https://jsonplaceholder.typicode.com/posts/1") // Fetch data from API
    .then(response => response.json()) // Convert response to JSON
        .then(data => console.log(data)) // Prints the JSON 
            .catch(error => console.log("Error:", error)); /* Handle errors 
 
{
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\n' + 'blah blah..'
}                                                                                                                                                                                                           */



// 2️⃣ POST Request (Sending Data)
fetch("https://jsonplaceholder.typicode.com/posts",{
    method : "POST",
    headers : {"Content-type" : "application/json"},
    body : JSON.stringify({ name: "Harsh", age: 20 })
    })

.then(response => response.json())
    .then(data => console.log("Post Created:", data))
        .catch(error => console.log("Error:", error))                                                                                                                                                                               /* 

Output : 
Post Created: { name: 'Harsh', age: 20, id: 101 }                                                                                                                        */
