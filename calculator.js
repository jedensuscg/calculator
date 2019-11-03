dividedByZero = false;
var runCalc = true;
var restartCheck = false;
var firstRun = true;
var newTotal = 0;
const numberField = document.querySelector('#inputNumber');
const buttonAdd = document.querySelector('.add')
const numberKeys = document.querySelectorAll('.numberKey')


//#region =====ENUMS AND MODULES====

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

var display = (function() {
    var displayText = "0";

    function getDisplayTextString() {
        return displayText;
    }
    function getDisplayTextNumber() {
        return parseFloat(displayText);
    }

    function setDisplayText(number) {
        if (displayText === "0") {
            displayText = number;
        }
        else {
            displayText = displayText + number;

        }
        console.log(displayText)
        numberField.value = displayText;

    }

    return {
        getDisplayTextString,
        getDisplayTextNumber,
        setDisplayText,
    }
})();

var value = (function () {
    var runningTotal = 0;
    var num1 = 0;
    var num2 = 0;
    function setRunningTotal(newNumber) {
        runningTotal = newNumber;
    }
    function getRunningTotal() {
        return runningTotal;
    }
    function getNum1() {
        return num1;
    }
    function setNum1(number) {
        num1 = number;
    }
    function getNum2() {
        return num2;
    }
    function setNum2(number) {
        num2 = number;
    }
    return {
        getRunningTotal,
        setRunningTotal,
        getNum1,
        setNum1,
        getNum2,
        setNum2,
    }

})();
//#endregion

main();

function main() {
    numberKeys.forEach(key => {
        key.addEventListener('click', (e) => {
            display.setDisplayText(e.target.getAttribute('key'))
        })
    });
}


/* 
function runCalculator(number, operation) {

    mathHistory.push(number);
    mathHistory.push(operatorShortText[operation]);
    value.setNum1(number);

    firstRun = false;
    let tempTotal = operators[operation](num1, num2);
    value.setRunningTotal(tempTotal);
    console.log(`***** YOU DID: ${num1}${operatorShortText[operation]}${num2} = ${value.getRunningTotal()} *****`)
    let historyTotal = "= " + value.getRunningTotal();
    mathHistory.push(operatorShortText[operation], num2, historyTotal);
    num1 = value.getRunningTotal();
    updateHistory(value.getRunningTotal());
    askContinueWithValue();
} */

/* function restartCalc(isRestartable) {
    if (isRestartable) {
        restart = readline.question("Restart calculator? y/n: ");
        if (restart == "y") {
            firstRun = true;
            runCalc = true;
            mathHistory = [];
            return;
        }
        else if (restart == "n") {
            console.log("Good-Bye")
            runCalc = false;
            firstRun = false;
            return;
        }
    }
}
 */
//#region =====VALIDATION AND NUMBER ASSIGNMENT=====
function getFirstNumber() {
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
function getOperation(number) {
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
                    break;
                }
                else if (choice == "n") {
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

function getSecondNumber(operation) {
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
//#endregion

function updateHistory(historyTotal) {
    historyTotal = "= " + historyTotal;
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

function askContinueWithValue() {
    /*     if (dividedByZero) {
            console.log("DIVISION BY ZERO ERROR!!!!!!!! BROKEN")
            runCalc = false;
            return;
        } */
    continueMath = readline.question(`??? Continue doing math with this value |${value.getRunningTotal()}|? y/n: `)
    if (continueMath === "y") {
        console.log(`**** First number is ${value.getRunningTotal()}`)
        isRestartable = false;
        return;
    }
    if (continueMath === "n") {
        equals(value.getRunningTotal());
        isRestartable = true;
        runCalc = false;

        return;
    }


}

function equals(finalTotal) {
    console.log(`Your final total for this session is : ||${finalTotal}||`);
    updateHistory(finalTotal);

}

//#region =====FORMULAS=====
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
//#endregion