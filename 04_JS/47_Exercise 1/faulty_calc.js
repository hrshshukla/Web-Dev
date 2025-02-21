// 1. It takes two numbers as input from the user
// 2. It returns right answer 90% of times and wrong answer 10% 
// 3. It perfoms wrong operations as follows:
// +   ---> (-)
// *   ---> +
// (-) ---> /
// /   ---> **


function faulty_calc(a,b,oprtr) {

    let random_num = Math.random();

    if (random_num < 0.1 ) 
    {
        switch (oprtr) {
            case "+":
                 console.log(a-b);
                break;
        
            case "*":
                 console.log(a+b);
                break;
        
            case "-":
                 console.log(a/b);
                break;
        
            case "/":
                console.log(a ** b);
                break;

            default:
                console.log("Enter valid oprtr");
                break;
        }
    }
    
    else{
        console.log("Right operation ka code bada hojayega");
        
    }
}

var a = 10;
var b = 20;
var oprtr = "*";

faulty_calc(a,b,oprtr);

