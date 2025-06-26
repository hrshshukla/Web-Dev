// (STEP 1) 
// Create a [package.json] file using -> npm intit 
// Answer the questions then finally enter "yes"

// This will create a [package.json] which will contain important thing {dependencies}

// ___________________________________________________

// (STEP 2) 
// Now install the packages you want 
// To install : npm install [package_name]
// Short-Cut  : npm i [package_name]

// Example : npm i date-and-time

// ___________________________________________________

// (STEP 3)
// After installing the package a [node_modules] will be created and inside that you can see that package
// Now your (STEP 1) [package.json] file which have {dependencies} will look like this :
// "dependencies": {
//     "date-and-time": "^3.6.0"
// }
// ___________________________________________________

// (STEP 4)
// Now, even if you delete [date-and-time] from the [node_modules] 
// then you can recover it by just typing  : npm i
// this [npm i] will go to your [package.json] --> "dependencies": {               
//                                                     "date-and-time": "^3.6.0"
//                                                   }
// And install all those packages which are written inside {dependencies} section 
// In this case [date-and-time] will be installed 

// ___________________________________________________

// Quick Tip : 
// One way to download multiple packages : npm i [package1] [package2] [package3]

// Another way : go to [package.json] --> "dependencies" : {}, And  
// "dependencies" : {
//     "package1" : "version"
//     "package2" : "version"
//     "package3" : "version"
// }

// then run : npm i 
// this will read the package.json and install all the dependencies written inside it.
