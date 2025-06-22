const numList = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");

const operatorList= document.querySelectorAll(".operators");

const calculate = document.querySelector(".calculate");

const clear = document.querySelector(".clear");

let expr = "";

let oprlist = [];


function isOperator(el){
    return oprlist.includes(el); 
}


const add = function(a , b){
    return a + b; 
}

const subtr = function(a , b){
    return a - b ; 
}

const mul = function (a , b){
    return a * b; 
}

const divide = function (a , b){
    if(b === 0){
        return "Not here. "
    }
    return Math.floor(a/b); 
}


function operate(num1 , num2 , operator){

    switch (operator) {
        case "+":
            display.textContent = add(num1 , num2);
            break;
        case "-":
            display.textContent = subtr(num1 , num2);
            break;
        case "*":
            display.textContent = mul(num1 , num2); 
            break;
        case "/":
            display.textContent = divide(num1 , num2); 
            break; 
        default:
            break;
    }

}



numList.forEach(
    (element) => {

        element.addEventListener("click", (e)=>{


            let lastInserted = expr[expr.length - 1]; 

            if(isOperator(lastInserted)){
                display.textContent ="";
            }
            display.textContent += e.target.textContent;

            expr += e.target.textContent;

            console.log(expr);




        }
        
    )
        
    }


);

operatorList.forEach((element)=>
{
    oprlist.push(element.textContent);

    element.addEventListener("click", (e) => 
    {
        display.textContent = ""; 
        display.textContent += e.target.textContent;
        let lastInserted = expr[expr.length - 1]; 
        if(isOperator(lastInserted)){

            expr = expr.replace(lastInserted , e.target.textContent);
            

        }
        else{

            expr += e.target.textContent;



        }

        console.log(expr);
    }
)
}


);

calculate.addEventListener("click" , calcuateExpr);



function calcuateExpr(){

    let num1 = "";
    let num2 = ""; 
    let operator = "";

    let i = 0 ; 
    if(expr[i] === "-"){
        num1 += expr[i++];
    }
    while(i < expr.length && !isOperator(expr[i])){

        num1 += expr[i++];

    }
    if( i < expr.length){

        operator = expr[i++]; 
    }



    while(i < expr.length && !isOperator(expr[i])){

        num2 += expr[i++]; 
    }

    // Check validity. 

/*     if(num1.length === 0 || num2.length === 0 || !isOperator(operator)){

        

    } */
    

        num1 = Number(num1);
        num2 = Number(num2); 

        operate(num1 , num2 , operator); 

        expr = expr.substring(i); 

        expr = display.textContent + expr; 









  



    

}

clear.addEventListener("click" , ()=> 
    {expr = "" , display.textContent = 0}
);




