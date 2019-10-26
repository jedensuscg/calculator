dividedByZero = false;
var finalTotal;
var runCalc = true;

var test = 0;
var readline = require('readline-sync');
var operators = {
    1: add,
    2: sub,
    3: multiply,
    4: divide,
}
var operatorText = {
    1: "Enter the number to ADD: ",
    2: "Enter the number to SUBTRACT: ",
    3: "Enter the number to MULTIPLY by: ",
    4: "Enter the number to DIVIDE by: ",
}
var operatorShortText = {
    1: "+",
    2: "-",
    3: "*",
    4: "/",
}

var mathHistory = [];


runCalculator();



function runCalculator(num1 = null) {


    while (runCalc) {
        if (num1 === null) {
            num1 = validateFirstNumber()
            mathHistory.push(num1)
        }
        let operation = validateOperation(num1);
        let num2 = validateSecondNumber(operation);

        let runningTotal = operators[operation](num1, num2);
        console.log(`***** YOU DID: ${num1}${operatorShortText[operation]}${num2} = ${runningTotal} *****`)
        let historyTotal = "= " + runningTotal;
        mathHistory.push(operatorShortText[operation], num2, historyTotal);
        num1 = runningTotal;
        checkForHistory(runningTotal);
        checkForcontinueMath(runningTotal);
    }
}

function validateOperation(number) {
    while (true) {
        operation = readline.question(`enter operation: \n 1: ADD \n 2: SUBTRACT \n 3: MULTIPLY \n 4: DIVIDE \n   `)
        if (operation == 1 || operation == 2 || operation == 3) {
            return operation;
        }
        else if (operation == 4 && number == 0) {
            console.log("You are trying to divide by zero!!!");
            while (true) {
                let choice = readline.question("Would you like to select a different operation?: y/n");

                if (choice == "y") {
                    operation = readline.question(`enter operation: \n 1: ADD \n 2: SUBTRACT \n 3: MULTIPLY \n 4: DIVIDE \n   `);
                    return operation;
                }
                else if(choice == "n") {
                    console.log("TOO BAD, I am not going to puncture a hole in space-time just for your amusement.");
                    readline.question("Press enter to continue selecting a different operation....outlaw!");
                    break;
                }
                else {
                    console.log("Invalid Selection!");
                }
            }
        }
        else if (operation == 4) {
            return operation;
        }
        else {
            console.log("Please select a valid number/operation");
        }
    }
}

function validateFirstNumber() {
    while (true) {
        number = parseFloat(readline.question("*** Enter the first number you wish to do math on: "));
        if (isNaN(number)) {
            console.log("!!! You entered an invalid number. !!!");
        }

        else {
            return number;
        }
    }
}

function validateSecondNumber(operation) {
    while (true) {
        number = parseFloat(readline.question(operatorText[operation]));
        if (isNaN(number)) {
            console.log("!!! You entered an invalid number. !!!");
        }
        else if (number == 0 && operation == 4) {
            console.log("!!! You are trying to divide by zero!!!!!! SERIOUSLY? ARE YOU TRYI...I mean, 'Please try again' !!!")
        }
        else {
            return number;
        }
    }
}

function checkForHistory(total) {
    total = "= " + total;
    showHistory = readline.question("??? Do you wish to see a history of operations leading to this value? (y/n): ")
    if (showHistory === "y") {
        for (var i = 0; i < mathHistory.length; i++) {
            console.log(mathHistory[i]);
        }
        return;
    }
    if (showHistory === "n") {
        console.log("\n")
        return;
    }

}

function checkForcontinueMath(runningTotal) {
    if (dividedByZero) {
        console.log("DIVISION BY ZERO ERROR!!!!!!!! BROKEN")
        runCalc = false;
        return;
    }
    continueMath = readline.question(`??? Continue doing math with this value |${runningTotal}|? y/n: `)
    if (continueMath === "y") {
        console.log(`**** First number is ${runningTotal}`)
        return;
    }
    if (continueMath === "n") {
        equals(runningTotal);
        runCalc = false;
        return;
    }


}

function equals(finalTotal) {
    console.log(`Your final total for this session is : ||${finalTotal}||`);
    checkForHistory(finalTotal);

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

function divide(num1 = 1, num2 = 1) {
    if (!num1 || !num2) {
        dividedByZero = true;
    }
    return (!num1 || !num2) ? "cant divide by 0" : num1 / num2

}
