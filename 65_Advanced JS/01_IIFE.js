// IIFE means Immidiately Invoked Function Expression
// (+) IIFE are those Functions which runs immediately as it’s created 
// (+) It’s wrapped in parentheses to make it an expression, not a declaration.
// (+) The last --> () invokes the function immediately.
// (+) It creates a local scope, preventing variables (const message) from polluting the global scope.


(   function() {
     const message = "Hello, I'm IIFE!";
     console.log(message);
    }
)();

// -------- Real Use -----------
const result = (function() {
    const num = 10; // Local Scope __OR__ private scope
    return num * num;
  })();
  
console.log(result);  // Output: 100
console.log(result.num); // Undefined cannot access the [const num] as it is local & private variable 
 
  
  