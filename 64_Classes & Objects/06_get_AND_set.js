// Getters() and Setters()
// when we wanted to access or get the [Person.name] then getter() is automatically called and return name 
// And when we wanted to modify or set the [Person.name] with a [newName] then setter is automatically called 

class Person {
  constructor(nameArgument) {
    this.name = nameArgument;   
  }

  // Getter
  get nameArgument() {
    return this.name;
  }

  // Setter
  set nameArgument(newName) {
    if(newName.length < 5) { // if name have less than 5 letters then print --> "Name too small "
      console.log("Name too small ");
    }
    else{
        this.name = newName;
    }
  }
}

const person = new Person("John");
console.log(person.name);  // Output : John ---> getter() is automatically called

person.name = "Harsh";     // setter() is automatically called to change the name
console.log(person.name);  // Output: Harsh
