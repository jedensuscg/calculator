var dividedByZero = false;
var equalHit = false;
var memoryMode = false;
var mathHistory = [];
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
const memoryButtons = document.querySelectorAll('.memoryButton');
const memoryIndicators = document.querySelectorAll('.memoryIndicator');


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
    3: "\xD7",
    4: "\xF7",
}

var memory = (function () {
    // use \u25BE for arrow
    var memory1 = '';
    var memory2 = '';
    var memory3 = '';
    var memoryPosition = '';

    function setMemory(value, memoryPosition) {
        switch (memoryPosition) {
            case '1':
                memory1 = value;
                break;
            case '2':
                memory2 = value;
                break;
            case '3':
                memory3 = value;
                break;
            default:
        }
    }

    function setMemoryPosition(position) {
        memoryPosition = position;
    }

    function getMemoryPosition() {
        return memoryPosition;
    }
    function getMemory(memoryPosition) {
        switch (memoryPosition) {
            case '1':
                return memory1;
            case '2':
                return memory2
            case '3':
                return memory3
            default:
        }
    }

    return {
        getMemory,
        setMemory,
        setMemoryPosition,
        getMemoryPosition,
    }

})();


var display = (function () { // Contains all functions and variables for the Display
    var upperDisplayText = '';
    var lowerDisplayText = "0";
    var errorText = '';
    var decimals;

    operatorTextDisplay.textContent = '  '

    //#region ---Upper Display Functions---
    function getUpperDisplayTextString() {
        return upperDisplayText;
    }
    function getUpperDisplayValue() {
        return parseFloat(UpperDisplayText);
    }

    function setUpperDisplayText(number) {
        decimals = countDecimalPlaces(number);
        upperDisplayText = parseFloat(number).toFixed(decimals);
        upperDisplayField.textContent = upperDisplayText;
    }
    //#endregion

    //#region ---Lower Display Functions---
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
        console.log(errorText)
    }

    function updateLowerDisplay() {
        lowerDisplayText = '';
        lowerDisplayField.textContent = lowerDisplayText;
    }
    //#endregion

    //#region ---Misc Display Functions---
    function clearDisplays() {
        mathHistory = [];
        lowerDisplayText = '';
        lowerDisplayField.textContent = lowerDisplayText;
        upperDisplayText = '';
        upperDisplayField.textContent = upperDisplayText;
        operatorTextDisplay.textContent = '';
        historySpan.textContent = ''
        equalHit = false;
        errorText = '';
        errorTextField.textContent = errorText;
    }

    function equalDisplay() {
        equalHit = true;
        upperDisplayField.textContent = '';
        console.log(mathHistory)
        lowerDisplayField.textContent = value.getRunningTotal().toFixed(decimals);
        operatorTextDisplay.textContent = '';
        let newHistory = updateHistory(true) + '=' + value.getRunningTotal().toFixed(decimals);
        console.log(mathHistory)
        console.log(newHistory)
        historySpan.textContent = newHistory
    }
    //#endregion

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
var value = (function () { // Contains all the functions and variables for number input/output
    var runningTotal = 0;
    var num1 = 0;
    var num2 = 0;
    var userResponseKey = '';

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

    function setUserResponseKey(input) {
        userResponseKey = input;
    }

    function getUserReponseKey() {
        return userResponseKey;
    }

    return {
        getRunningTotal,
        setRunningTotal,
        getNum1,
        setNum1,
        getNum2,
        setNum2,
        getUserReponseKey,
        setUserResponseKey,
        resetValues,
    }

})();
//#endregion

addOperatorListeners();
addKeyPadListeners();
addMemoryButtonListeners();

function addKeyPadListeners() {
    numberKeys.forEach(key => {
        key.addEventListener('click', (e) => {
            if (!memoryMode) {
                if (display.getUpperDisplayTextString() == '' && e.target.getAttribute('key') == "0" && display.getLowerDisplayTextString() == "") {
                    display.setErrorText("Can't Start with 0");
                }
                else if (currentOperationText == "4" && e.target.getAttribute('key') == "0" && display.getLowerDisplayTextString() == '') {
                    display.setErrorText("Can't Divide By Zero!")
                    console.log(display.getLowerDisplayTextString())
                }
                else {
                    if (!currentOperation) {
                        if (e.target.getAttribute('key') == "0") {
                            display.setErrorText("Can't Start with 0");
                        }

                        else {
                            display.setLowerDisplayText(e.target.getAttribute('key'));
                            display.setErrorText('');
                        }

                    }
                    else {
                        display.setErrorText('');
                        display.setLowerDisplayText(e.target.getAttribute('key'))
                        value.setNum2(display.getLowerDisplayValue());
                        value.setRunningTotal(currentOperation(value.getNum1(), value.getNum2()));
                        display.setUpperDisplayText(value.getRunningTotal());
                    }
                }
            }
            else {
                if (e.target.getAttribute('key') == '1') {
                    storeToMemory(value.getRunningTotal(), memory.getMemoryPosition())

                }
                else if (e.target.getAttribute('key') == '2') {
                    memoryMode = false;

                }
            }
        })

    });
}

function addOperatorListeners() {
    operatorKeys.forEach(key => {
        key.addEventListener('click', (e) => {

            var number = (display.getUpperDisplayTextString() == '') ? display.getLowerDisplayTextString() : value.getRunningTotal()

            if (display.getUpperDisplayTextString().includes("NaN")) {
                display.setErrorText("Divide by");
            }
            else if (number != '0' || equalHit) {
                display.setUpperDisplayText(number);
                value.setNum1(number);

                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')

                if (!equalHit) {
                    mathHistory.push(display.getLowerDisplayTextString(), operatorShortText[currentOperationText]);
                }
                else {
                    mathHistory.push('', operatorShortText[currentOperationText]);
                    equalHit = false;
                }
                currentOperation = operators[e.target.getAttribute('data')];
                currentOperationText = e.target.getAttribute('data')

                display.updateLowerDisplay();
                display.setLowerOperatorText(currentOperationText);
                historySpan.textContent = updateHistory();
            }
            console.log(mathHistory)
            console.log(updateHistory().toString())

            // display.updateLowerDisplay(currentOperationText);
        });
    });
    clearKey.addEventListener('click', (e) => {
        display.clearDisplays();
        value.resetValues();
        number = ''
        currentOperation = undefined;
        console.log(mathHistory)

    });
    equalKey.addEventListener('click', (e) => {
        if (display.getLowerDisplayTextString() != '0') {
            mathHistory.push(display.getLowerDisplayTextString());
            historySpan.textContent = updateHistory(true);
            display.equalDisplay();
        }
    });

    decimalKey.addEventListener('click', (e) => {
        decimalTrue = display.getLowerDisplayTextString().includes('.');
        if (!decimalTrue) {
            display.setLowerDisplayText('.');
        }
    });
}

function addMemoryButtonListeners() {
    memoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            memoryMode = true;
            let buttonClicked = e.target.getAttribute('data')
            let valueToStore = value.getRunningTotal();
            memory.setMemoryPosition(buttonClicked);
            validateMemory(buttonClicked, valueToStore);
        })
    })
}
function countDecimalPlaces(number) {
    if (number.toString().includes('.')) {
        var split = number.toString().split('.')
        var decimals = split[1].length

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
    let historyFull = mathHistory.join('')
    let historyPartial = mathHistory.slice();
    if (!finished) {
        historyPartial.pop();
        historyPartial.push('=');
    }
    return historyPartial.join('');
}

function validateMemory(position, number) {
    numberKeys[0].value = 'STORE';
    numberKeys[0].classList.remove('memOff')
    numberKeys[0].classList.add('memoryMode')
    if (number) {
        if (memory.getMemory(position)) {
            console.log("Memory Position Filled: Select Use, Overwrite Cancel")
        }

        else {
            storeToMemory(number, position)
        }
    }
}

function storeToMemory(number, position) {
    console.log("memory value " + number)
    console.log("memory position " + position)
    memory.setMemory(number, position)
    console.log("Setting Memory")
    memoryMode = false;

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