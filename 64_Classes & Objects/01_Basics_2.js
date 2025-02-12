// Wya to set default value 

// ---------------------------- Number (1) -----------------------------
class User {
    constructor(name) {
      this.name = name || "Unknown";  // if no name provided then --> this.name = "Unknown"
      console.log(this.name);
    }
}

const user1 = new User(); // Ouput : Unknown
const user2 = new User("john"); // Ouput : john


// ----------------------------- Number (2) ---------------------------
class Customer {
    constructor(name="Harsh") {
      this.name = name  // if no name provided then --> this.name = "Harsh"
      console.log(this.name);
    }
}

const Customer1 = new Customer(); // Ouput : Harsh
const Customer2 = new Customer("john"); // Ouput : john