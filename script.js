let numLeft = "";
let numRight = "";
let currentNumber = "0";
let currentOperand = "";

const upDisplay = document.getElementById("upperDisplay");
const lowDisplay = document.getElementById("lowerDisplay");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const point = document.getElementById("point");

clear.addEventListener('click', wipeOut);
equals.addEventListener('click', evaluate);
backspace.addEventListener('click', erase);
point.addEventListener("click", appendPoint);

const numbers = document.querySelectorAll("#number");
numbers.forEach(number => number.addEventListener('click', numPress));

const operands = document.querySelectorAll("#operand");
operands.forEach(operand => operand.addEventListener('click', operandPress));

updateLower();

function appendPoint(){
    if (currentNumber && !currentNumber.includes('.')){
    currentNumber += "."; 
    }
    updateLower();
}
function erase(){
    if (currentNumber && currentNumber !== "0"){
    currentNumber = currentNumber.substring(0, currentNumber.length-1);
    if ((currentNumber === "" || currentNumber ==="-") && currentOperand === ""){
        currentNumber = "0";
    }
    updateLower();
    }
}
function numPress(e){
    if (currentNumber && currentNumber !== "0"){
        currentNumber += this.textContent;
    }
    else{
        currentNumber = this.textContent;
    }
    updateLower();
}
function operandPress(e){
    if (currentOperand && currentNumber){
        evaluate();
        currentOperand = this.textContent;
        numLeft = currentNumber;
        currentNumber = ""
        updateLower();
    }
    else{
        currentOperand = this.textContent;
        if (!numLeft){
            numLeft = currentNumber;
        }
        currentNumber = "";
        updateLower();
    }
}
function wipeOut(){
    numLeft = "";
    currentOperand = "";
    currentNumber = "0";
    updateUpper();
    updateLower();
}
function evaluate(){
    if (numLeft && currentOperand && currentNumber){
        numRight = currentNumber;
        currentNumber = operate(Number(numLeft), Number(numRight), currentOperand);
        if (currentNumber > 10000000 || currentNumber < -10000000){
            currentNumber = Number(currentNumber).toExponential(5);
        }
        else{
            currentNumber = String(+Number(currentNumber).toFixed(10));
        }
        updateUpper();
        numRight = "";
        numLeft = "";
        currentOperand = "";
        updateLower();
    }
}
function updateUpper(){
    if (numLeft && currentOperand && numRight){
        upDisplay.textContent = numLeft + " " + currentOperand + " " + numRight + " = ";   
    }
    else{
        upDisplay.textContent = "";
    }
}
function updateLower(){
    if (currentOperand){
        lowDisplay.textContent = numLeft + " " + currentOperand + " " + currentNumber;
    }
    else{
        lowDisplay.textContent = currentNumber;
    }
}
function add(a, b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function times(a, b){
    return (a*b);
}
function divide(a, b){
    if (b){
    return a/b;
    }
    else return "error";
}
function operate(a,b, operand){
    switch(operand){
        case "+":
            return String(add(a,b));
            break;
        case "-":
            return String(subtract(a, b));
            break;
        case "*":
            return String(times(a, b));
            break;
        case "/":
            return String(divide(a,b));
            break;
    }
}
