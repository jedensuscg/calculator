dividedByZero = false;
var runCalc = true;
var restartCheck = false;
var firstRun = true;
var newTotal = 0;
var currentOperation;
var currentOperationText;
const lowerDisplayField = document.querySelector('#lowerDisplay');
const upperDisplayField = document.querySelector('#upperDisplay');
const operatorTextDisplay = document.querySelector('#operatorText');
const operatorKeys = document.querySelectorAll('#operator');
const numberKeys = document.querySelectorAll('.numberKey');
const decimalKey = document.querySelector('#keyDot');
const clearKey = document.querySelector('#keyClear');
const equalKey = document.querySelector('#keyEqual');
const historySpan = document.querySelector('#historySpan');
const errorTextField = document.querySelector('#errorText');


//#region =====ENUMS AND MODULES====

var operators = {
    1: add,
    2: sub,
    3: multiply,
    4: divide,
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
    var errorText = '';
    operatorTextDisplay.textContent = '  '

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
        upperDisplayField.textContent = upperDisplayText;
    }
    //#endregion

    //#region Lower Display Functions
    function setLowerOperatorText(operation) {
        operatorTextDisplay.textContent = operatorShortText[operation];
    }
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
        lowerDisplayField.textContent = lowerDisplayText;

    }

    function setErrorText(error) {
        errorText = error;
        errorTextField.textContent = errorText;
    }

    function updateLowerDisplay() {
        lowerDisplayText = '0';
        lowerDisplayField.textContent = lowerDisplayText;
    }
    //#endregion

    function clearDisplays() {
        lowerDisplayText = '';
        lowerDisplayField.textContent = lowerDisplayText;
        upperDisplayText = '';
        upperDisplayField.textContent = upperDisplayText;
        operatorTextDisplay.textContent = '  '
        console.log(upperDisplayText)
        console.log(lowerDisplayText)
    }

    function equalDisplay() {
        upperDisplayField.textContent = '';
        lowerDisplayField.textContent = value.getRunningTotal();
        operatorTextDisplay.textContent = ' ';
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
        setLowerOperatorText,
        equalDisplay,
        setErrorText,
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
                display.setUpperDisplayText(value.getRunningTotal());


            }
        })
    });

    decimalKey.addEventListener('click', (e) => {
        decimalTrue = display.getLowerDisplayTextString().includes('.');
        console.log(decimalTrue)
        if (!decimalTrue) {
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
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')
                mathHistory.push(display.getLowerDisplayTextString(),' ', operatorShortText[currentOperationText],' ');
                display.updateLowerDisplay();
                value.setNum1(number);
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')
                display.setLowerOperatorText(currentOperationText); 
                historySpan.textContent = updateHistory();
            }
            else {
                display.setUpperDisplayText(value.getRunningTotal());
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')
                mathHistory.push(display.getLowerDisplayTextString(),' ', operatorShortText[currentOperationText],' ');
                display.updateLowerDisplay(currentOperationText);
                value.setNum1(value.getRunningTotal());
                display.setLowerOperatorText(currentOperationText);

                historySpan.textContent = updateHistory();
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
    equalKey.addEventListener('click', (e) => {
        mathHistory.push(display.getLowerDisplayTextString(), ' = ', value.getRunningTotal());
        historySpan.textContent = updateHistory(true);
        display.equalDisplay();

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

function updateHistory(finished = false) {
    let firstComma = mathHistory.toString().lastIndexOf(',');
    console.log("first comma" + firstComma)
    let historyFull = mathHistory.join('')
    let historyPartial = mathHistory.slice();
   if(!finished) {
    historyPartial.pop();
    historyPartial.pop();
    historyPartial.push(' = ');
   }

    console.log(historyFull)
    console.log(historyPartial);
    return historyPartial.join('');
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