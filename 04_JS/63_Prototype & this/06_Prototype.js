//(1) Prototype Diagram : In End
//(2) Prototype working :
//  -- JavaScript looks for sayHello() in [Myobj]
//  -- if it's not found in [Myobj], so it looks up [Myobj].__proto__ (which points to X.prototype).
//  -- Since X.prototype contains sayHello, that's why sayHello() will be executed successfully.

function X(name) {
    this.name = name; // Property inside instance
}

// X.prototype is created separately, outside of X.
X.prototype.sayHello = function() {
    console.log("Hello, I am " + this.name);
};

// Creating an instance
const Myobj = new X("Harsh");
Myobj.sayHello(); // "Hello, I am Harsh"


/* Prototype Diagram :

  ┌────────────┐
  │     X()    │  <-- Function constructor (Not a class)
  └────────────┘
        │
        ▼
┌───────────────────────┐
│  X.prototype          │  <-- Created outside X
│  { sayHello() }       │  <-- this will be Shared by all objects created using X()
└───────────────────────┘
        ▲
        │  (Internal link: Myobj.__proto__ ---> X.prototype)
        ▼
┌─────────────────────────┐
│ Myobj = new X("Harsh")  │  <-- New instance
│ { name: "Harsh" }       │
└─────────────────────────┘
*/