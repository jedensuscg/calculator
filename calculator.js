dividedByZero = false;
var runCalc = true;
var restartCheck = false;
var firstRun = true;
var newTotal = 0;
var currentOperation;
var currentOperationText;
const lowerDisplayField = document.querySelector('#lowerDisplay');
const upperDisplayField = document.querySelector('#upperDisplay');
/* const buttonAdd = document.querySelector('#add');
const buttonSub = document.querySelector('#sub');
const buttonMulti = document.querySelector('#multi');
const buttonDivide = document.querySelector('#divide'); */
const operatorKeys = document.querySelectorAll('#operator');
const numberKeys = document.querySelectorAll('.numberKey');
const decimalKey = document.querySelector('#keyDot');
const clearKey = document.querySelector('#keyClear');


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

var display = (function () {
    var upperDisplayText = '';
    var lowerDisplayText = "0";

    //#region Upper Display Functions
    function getUpperDisplayTextString() {
        return upperDisplayText;
    }
    function getUpperDisplayValue() {
        return parseFloat(UpperDisplayText);
    }

    function setUpperDisplayText(number) {
        let decimals = countDecimalPlaces(number);
        upperDisplayText = parseFloat(number).toFixed(decimals);
        upperDisplayField.value = upperDisplayText;
    }
    //#endregion

    //#region Lower Display Functions
    function getLowerDisplayTextString() {
        return lowerDisplayText;
    }
    function getLowerDisplayValue() {
        return parseFloat(lowerDisplayText);
    }

    function setLowerDisplayText(number) {
        if (lowerDisplayText === "0") {
            lowerDisplayText = number;
        }
        else {
            lowerDisplayText = lowerDisplayText + number;
        }
        lowerDisplayField.value = lowerDisplayText;
    }

    function updateLowerDisplay() {
        lowerDisplayText = '0';
        lowerDisplayField.value = lowerDisplayText;
    }
    //#endregion

    function clearDisplays() {
        lowerDisplayText = '';
        lowerDisplayField.value = lowerDisplayText;
        upperDisplayText = '';
        upperDisplayField.value = upperDisplayText;
        console.log(upperDisplayText)
        console.log(lowerDisplayText)
    }
    return {
        getLowerDisplayTextString,
        getLowerDisplayValue,
        setLowerDisplayText,
        setUpperDisplayText,
        getUpperDisplayTextString,
        getUpperDisplayValue,
        updateLowerDisplay,
        clearDisplays,
    }
})();

var value = (function () {
    var runningTotal = 0;
    var num1 = 0;
    var num2 = 0;
    
    function resetValues() {
        runningTotal = 0;
        num1 = 0;
        num2 = 0;
    }
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
        resetValues,
    }

})();
//#endregion

addOperatorListeners();
addKeyPadListeners();

function addKeyPadListeners() {
    numberKeys.forEach(key => {
        key.addEventListener('click', (e) => {
            if (!currentOperation) {
                display.setLowerDisplayText(e.target.getAttribute('key'))
            }
            else {
                display.setLowerDisplayText(e.target.getAttribute('key'))
                value.setNum2(display.getLowerDisplayValue());
                value.setRunningTotal(currentOperation(value.getNum1(), value.getNum2()));
                display.setUpperDisplayText(value.getRunningTotal())
                console.log(value.getNum1() + operatorShortText[currentOperationText] + value.getNum2() + " = " + value.getRunningTotal())
            }
        })
    });

    decimalKey.addEventListener('click', (e) => {
        decimalTrue = display.getLowerDisplayTextString().includes('.');
        console.log(decimalTrue)
        if(!decimalTrue) {
            display.setLowerDisplayText('.');
        }
    });


}

function addOperatorListeners() {
    operatorKeys.forEach(key => {
        key.addEventListener('click', (e) => {

            if (display.getUpperDisplayTextString() == '') {
                var number = display.getLowerDisplayTextString();
                display.setUpperDisplayText(number);
                display.updateLowerDisplay();
                value.setNum1(number);
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')
            }
            else {
                let number = display.getLowerDisplayTextString();
                display.setUpperDisplayText(value.getRunningTotal());
                display.updateLowerDisplay();
                value.setNum1(value.getRunningTotal());
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')
            }
        });
    });
    clearKey.addEventListener('click', (e) => {
        display.clearDisplays();
        value.resetValues();
        number = ''
        currentOperation = undefined;
        console.log(value.getNum1())
    });
}

function countDecimalPlaces(number) {
    let numberString = number + '';
    if (numberString.includes('.')) {
        var split = numberString.split('.')
        var decimals = split[1].length
        console.log("Decimals" + decimals)
        if (decimals > 10) {
            decimals = 10;
        }
        return decimals;
    }
    else {
        return 0;
    }

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