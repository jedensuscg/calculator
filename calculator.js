var runningTotal;
var finalTotal;
var runCalc = true;
var test = 0;
var readline = require('readline-sync');
var operators = {
    ADD: add,
    SUBTRACT: sub,
    MULTIPLY: multiply,
    DIVIDE: divide,
}


initalValue();



function initalValue(num1 = null){

    
    while(runCalc) {
        !num1 ? num1 = readline.question("Enter the first number: ") : num1
        oper = readline.question("enter operation: ")
        num2 = readline.question("enter second value: ")
        console.log(`num1: ${num1}  num2: ${num2}`)
        runningTotal =  operators[oper](num1, num2);
        num1 = runningTotal;
        console.log("Running Total: " + runningTotal)
        checkForFinish(runningTotal);
    }




}

function checkForFinish(runningTotal) {

    var finalTotal = runningTotal;
    

    finish = readline.question("Continue? y/n? " )
    if(finish === "y") {
        return;
    }
    if(finish === "n") {
        equals(finalTotal);
        runCalc = false;

    }

}

function equals(finalTotal) {
    test++;
    console.log(test)

    console.log("Total: " + finalTotal);

}

function add(num1 = 0, num2 = 0) {
    return parseFloat(num1) + parseFloat(num2);
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
