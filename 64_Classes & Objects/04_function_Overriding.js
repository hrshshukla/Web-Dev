// Function overriding means defining that same function inside [Derived class] that is already defined inside [Base class]


class Animal {
    makeSound(){
        console.log("I'm Animal... 🔊");
    }
}

class Lion extends Animal {
    makeSound(){ // this is alredy defined inside Animal() but we redefined it in Lion() = function overriding
        console.log("Roar... 🦁");
    }
}

const LionKing = new Lion()
LionKing.makeSound()
