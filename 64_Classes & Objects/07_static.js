// static variables and functions belongs to the class itself, not to any object.
// static variables share there common value to all the objects created by the class 
// We access it using the class name (MyClass.count)

class MyClass {
    static count = 0;  // Static Varable / data member
  
    constructor() {
      MyClass.count++;  // Everytime a new object is created using MyClass, count will increase to +1
    }
  
    static showCount() {  // Static function / method
      console.log("Count:", MyClass.count);
    }
  }
  
  const obj1 = new MyClass(); // count = +1
  const obj2 = new MyClass(); // count = +1
  
  MyClass.showCount();  // Output: Count: 2
  
  