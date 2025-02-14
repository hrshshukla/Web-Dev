/* JavaScript only Hoist declaration (var a;) not initialization (a = 6)
-- the value of variable will remain [undefined] until the line where it's value is intialized is reached 


 
-- (+) Working : 
function tempFunction() {
    console.log(a);  ----> var a = undefined;   ---> the value of variable will remain [undefined] until
    var a = 6;       ----> var a = 6
    console.log(a);  ----> var a = 6            ---> the line where it's value is intialized is reached 
}                                                                                                                                                               */


// Here, even though "var a = 6" is declared in "line 6" still in "line 5" we can access "var a"
function tempFunction() {
    // var a           step (2) ---> automatically declaration moved to the "top"  by the JS interpreter 
    console.log(a) 
    var a = 6;      // step (1)
    console.log(a)
}

tempFunction()                                                                                                                                   /*
Output : 
 undefined
 6                                                                                                                                                  */