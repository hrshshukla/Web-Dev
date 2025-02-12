// LEARNING : response.ok ---> when fetching is successfull it returns true value = response.ok 
//            !response.ok ---> when fetching was unsuccessfull it means opposite of [response.ok] = !response.ok
// If the API returns a bad response (404, 500, etc.), fetch() throw an error.


fetch("https://jsonplaceholder.typicode.com/invalid-url") // ❌ invalid URL
    .then( response => {
            if (response.ok) { // If API returns the data, means fetch is successfull = response.ok
                return response.json() // then, return the response in json format 
            }
            else { throw new Error("Failed to fetch Data❗"); }
    })
        .then( data => console.log(data))
            .catch(errorMsg => console.log(errorMsg.message))