// Method chaining is a way to call methods(functions) by chaining them in one 
// Without [Method Chaining] : Calling greet() and play()
// -- MyObject.greet()
// -- MyObject.play()

// With [Method Chaining] : Calling greet() and play()
// -- MyObject.greet().play()

// To enable Method Chaining we need to return "this" from the method 

class Complex {
    greet(){
        console.log("Good Morning🌞");
        return this // ------> returning "this" = returning "MyObject"
    }

    play(){
        console.log("Playing football.. ⚽");
    }
}

const MyObject = new Complex();
MyObject.greet().play() // Now as greet() returns ---> "this" = MyObject, this line will become MyObject.MyObject.play()
//                         And final line will be = MyObject.play()




