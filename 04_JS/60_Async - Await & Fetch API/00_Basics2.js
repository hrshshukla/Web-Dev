/*
"falsy" value = 0 or false
-- [false]  [0]  [""]  [null] [undefined] [NaN] = 0 or false 

(1) false
(2) 0
(3) "" (empty string)
(4) null
(5) undefined
(6) NaN                                                                                                                     */

function orderPizza(pizza) {
        
        // Check All falsy value in Once
        if (!pizza)  // if (!null) ---> if (!false) ----> if (true)
        {  
          console.log("❌ Order Failed : falsy value ")
        }
        else {
        console.log(" ✅ Successfully Ordered: ") }
}

orderPizza("Cheese Pizza"); // ✅ Order placed for: Cheese Pizza
orderPizza("");         // ❌ Pizza name is empty
orderPizza();           // ❌ No pizza selected
orderPizza(false);      // ❌ Pizza order is false
orderPizza(0);          // ❌ Pizza order is zero
orderPizza(null);       // ❌ Pizza is null
orderPizza(NaN);        // ❌ Pizza order is NaN
