// this directly represents the object, not its address.
// Means "this" is the object itself 
// So, this = MyObject 

// Usage:
// It helps distinguish between instance variables and parameters or other variables with the same name.
// Helps in method chaining
// so if you say: (this.a)  -----> means MyObject.a 


class Complex {
    setData(a){
        // a = a; --------> WRONG : creates confusion
        this.a = a // (this.a) -----> MyObject.a
    }

    printData(){
        console.log(this.a);
    }
}

const MyObject = new Complex();
MyObject.setData(10)
MyObject.printData()


