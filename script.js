const numList = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");

const operatorList= document.querySelectorAll(".operators");

const calculate = document.querySelector(".calculate");

const clear = document.querySelector(".clear");

let expr = "";

let oprlist = [];


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

            if(oprlist.includes(lastInserted)){
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
        if(oprlist.includes(lastInserted)){

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


    let valid = false; 

    let operatorsIn = [];

    oprlist.forEach(
        (element)=>  {
            if(expr.includes(element)){

                valid = true;
                operatorsIn.push(element);
            }
        }
    );
    if(valid == false || operatorsIn.length > 1){

        display.textContent = "Invalid Syntax"; 
        

    }

    else{

        let index = expr.indexOf(operatorsIn[0]); 

    

        let num1 = Number(expr.substring(0 , index));

     
        console.log(num1);
        let num2 = Number(expr.substring(index + 1,));
        console.log(num2);

        operate(num1 , num2 , operatorsIn[0]);





    }
    expr = "";


    

}

clear.addEventListener("click" , ()=> 
    {expr = "" , display.textContent = 0}
);




