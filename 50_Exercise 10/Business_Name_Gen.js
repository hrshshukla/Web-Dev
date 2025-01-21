// Crazy
// Amazing
// Fire

// Shop Name:
// Engine
// Foods
// Garments

// Another Word:
// Bros
// Limited
// Hub

// Learning : Ternary else-if ladder 

var first = Math.random()<0.33 ? first = "Crazy" :
            Math.random()>0.33 && Math.random()<0.66 ? first = "Amazing" : 
            Math.random()>0.66 ? first = "Fire" : first = "Crazy";

var second =Math.random()<0.33 ? second = "Garments" :
            Math.random()>0.33 && Math.random()<0.66 ? second = "Engine" : 
            Math.random()>0.66 ? second = "Foods" : second = "Garments";

var third =  Math.random()<0.33 ? third = "Hub" : 
             Math.random()>0.33 && Math.random()<0.66 ? third = "Bros" : 
             Math.random()>0.66 ? third = "Limited" : third = "Hub";


console.log(` ${first} ${second} ${third} `);
