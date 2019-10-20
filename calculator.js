var runningTotal;
var finalTotal;
//var readline = require('readline-sync');
const addButton = document.querySelector('#add');


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

function equals(finalTotal) {

}
var operators = {
    ADD: add,
    SUBTRACT: sub,
    MULTIPLY: multiply,
    DIVIDE: divide,
}

addButton.addEventListener('click', (e) => {
    initalValue();
});


function initalValue(num1 = null){
    var total = 0;
    
    !num1 ? num1 = document.getElementById("num1").value : num1
    //oper = readline.question("enter operation: ")
    //num2 = readline.question("enter second value: ")
    num2 = document.getElementById("num2").value;

    runningTotal =  operators[oper](num1, num2);
    console.log("Running Total: " + runningTotal)

    checkForFinish(runningTotal);

}

function checkForFinish(runningTotal) {

    finish = readline.question("Continue? y/n" )
    if(finish === "y") {
        initalValue(runningTotal)
    }
    if(finish === "n") {
        finalTotal = runningTotal;
        console.log("Total: " + finalTotal);
        totalSpan = document.getElementById("total");
        totalSpan.innerHTML = finalTotal;
    }

}

