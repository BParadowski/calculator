let numLeft = "";
let numRight = "";
let currentNumber = "0";
let currentOperand = "";
// let upperDisplayContent = "";
// let lowerDisplayContent = "";

const upDisplay = document.getElementById("upperDisplay");
const lowDisplay = document.getElementById("lowerDisplay");
const equals = document.getElementById("equals");

equals.addEventListener('click', evaluate);

const numbers = document.querySelectorAll("#number");
numbers.forEach(number => number.addEventListener('click', numPress));

const operands = document.querySelectorAll("#operand");
operands.forEach(operand => operand.addEventListener('click', operandPress));

updateLower();

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
function evaluate(){
    if (numLeft && currentOperand && currentNumber){
        numRight = currentNumber;
        currentNumber = operate(Number(numLeft), Number(numRight), currentOperand)
        updateUpper();
        numRight = "";
        numLeft = "";
        currentOperand = "";
        updateLower();
    }

}
function updateUpper(){
    upDisplay.textContent = numLeft + " " + currentOperand + " " + numRight + " = ";   
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
    return a*b;
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
            return add(a,b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return times(a, b);
            break;
        case "/":
            return divide(a,b);
            break;
    }
}
