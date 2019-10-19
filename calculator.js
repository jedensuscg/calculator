var runningTotal;
var finalTotal;
var readline = require('readline-sync');
var operators = {
    1: add,
    2: sub,
    3: multiply,
    4: divide,
}
initalValue()


function initalValue(){
   num1 = readline.question("enter first number ")
   oper = readline.question("enter operation: ")
   num2 = readline.question("enter second value: ")

   console.log("Total: " + operators[oper](num1, num2))


}

function add(num1 = 0, num2 = 0) {
    return num1 + num2;
}

function sub(num1 = 0, num2 = 0) {
    return num1 - num2;
}

function multiply(num1 = 1, num2 = 1) {
    return num1 * num2;

}

function divide(num1 = 1, num2 = 1){
    return (!num1 || !num2) ? "cant divide by 0" : num1 / num2
}
