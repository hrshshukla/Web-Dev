// By using super keyword we can call any function of super class 

class Human {
    #name = "harsh"
    Intro(){
        console.log("I'm Human");
    }
}

class Student extends Human {
    Intro(){
        super.Intro() // this will call Intro() of Human Class
        console.log("I'm a student also");
    }
}

const student1 = new Student()
student1.Intro() // I'm Human
//                  I'm a student also

 