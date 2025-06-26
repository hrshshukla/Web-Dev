# GET vs POST Request Comparison

| Feature             | GET Request                                                                 | POST Request                                                                 |
|---------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| **Purpose**         | Retrieve data from the server                                                | Submit data to the server                                                    |
| **Data Sending**    | Sent through the **URL** as query parameters                                 | Sent in the **body** of the request                                          |
| **Example**         | `https://example.com/search?query=harsh`                                     | Data sent hidden in the body, not in the URL                                 |
| **Visible in URL**  | ✅ Yes                                                                        | ❌ No                                                                         |
| **Security**        | Less secure (data visible, can be cached/bookmarked)                         | ✅More secure (data hidden from URL, use HTTPS for real security)             |
| **Size Limit**      | Limited (~2048 characters)                                                   |✅ Much larger size allowed (depends on server)                                 |
| **Idempotent**      | ✅ Yes (repeating same request doesn't change server state)                   | ❌ No (can make changes every time it's sent)                                |
| **Bookmarkable**    | ✅ Yes                                                                        | ❌ No                                                                         |
| **Caching**         | Can be cached by browsers or proxies                                         | Not usually cached                                                           |
| **Typical Use**     | Search queries, filters, loading pages                                       | Login forms, uploading files, saving data                                   |
