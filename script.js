const numList = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");

const operatorList= document.querySelectorAll(".operators");

const calculate = document.querySelector(".calculate");

const clear = document.querySelector(".clear");

const dlt = document.querySelector(".delete");

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
    return (a/b).toPrecision(4);
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

function numberProcessing(e){
    let lastInserted = expr[expr.length - 1]; 

            if(isOperator(lastInserted) || expr.length === 0){
                display.textContent ="";
            }
            display.textContent += e.target.textContent;

            expr += e.target.textContent;

            console.log(expr);



}

numList.forEach(
    (element) => {

        element.addEventListener("click", numberProcessing)
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
    if(expr[i] === "+"){
        i++; 
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
    
    if(num1.length != 0 && num2.length != 0 && isOperator(operator)){
        
        num1 = Number(num1);
        num2 = Number(num2); 

        operate(num1 , num2 , operator); 

        expr = expr.substring(i); 

        expr = display.textContent + expr; 

        let onlyResult = true; 

        oprlist.forEach((el) => {

            if(expr.includes(el)){

                onlyResult = false; 

            }

        })

        if(onlyResult){
            expr = ""; 
        }
    }








  



    

}

function backClear(){
       expr = expr.substring(0 , expr.length - 1); 

    display.textContent = display.textContent.slice(0 ,- 1); 
}

clear.addEventListener("click" , ()=> 
    {expr = "" , display.textContent = 0}
);

dlt.addEventListener("click" , backClear);

/// Keyboard Input
document.addEventListener("keydown" , (e)=>{

    console.log(e); 


    let nums = "0123456789";



    if(nums.includes(e.key)){

        let lastInserted = expr[expr.length - 1]; 

            if(isOperator(lastInserted) || expr.length === 0){
                display.textContent ="";
            }
            display.textContent += e.key;

            expr += e.key;

            console.log(expr);

        

    }
    if(oprlist.includes(e.key)){

        display.textContent = ""; 
        display.textContent += e.key;
        let lastInserted = expr[expr.length - 1]; 
        if(isOperator(lastInserted)){

            expr = expr.replace(lastInserted , e.key);
            

        }
        else{

            expr += e.key; 



        }



    }
    if(e.key === "Enter"){
        calcuateExpr();
    }

    if(e.key === "Backspace"){

        backClear();




    }





})


