function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) {
        return "Error, cannot divide by 0.";
    }

    return a / b;
}

function operate(a, b, operator) {
    if(operator === "+") {
        return add(a, b);
    }

    if(operator === "-") {
        return subtract(a, b);
    }

    if(operator === "*") {
        return multiply(a, b);
    }

    if(operator === "/") {
        return divide(a, b);
    }
}

const screen = document.querySelector('.screen');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

let previousNumber = "";
let currentNumber = "";
let currentOperation = "";
let lastClicked = "";
let expression = "";

equalsButton.addEventListener('click', () => {
    if(previousNumber === "" || currentNumber === "" || currentOperation === "") {
        return;
    }
    let result = operate(parseFloat(previousNumber), parseFloat(currentNumber), currentOperation);
    screen.textContent = Math.round(result * 100) / 100;
    previousNumber = result;
    currentNumber = "";
    lastClicked = "operation";
});

clearButton.addEventListener('click', () => {
    previousNumber = "";
    currentNumber = "";
    currentOperation = "";
    lastClicked = "";
    screen.textContent = "";
});

for(let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        //calulator functionality
        if(currentOperation === "") {
            previousNumber += numberButtons[i].textContent;
        } else {
            if(lastClicked === "operation") {
                screen.textContent = "";
            }
            currentNumber += numberButtons[i].textContent;
        }
        appendNumber(numberButtons[i].textContent);
        lastClicked = "number";
        
        //highliting on click
        numberButtons[i].backgroundColor = 'red';
    });
}

for(let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if(currentOperation === "") {
            currentOperation = operatorButtons[i].textContent;
            lastClicked = "operation";
        } else {
            if(lastClicked === "operation") {
                currentOperation = operatorButtons[i].textContent;
                return;
            }
            let result = operate(parseFloat(previousNumber), parseFloat(currentNumber), currentOperation);
            screen.textContent = Math.round(result * 100) / 100;
            previousNumber = result;
            currentNumber = "";
            currentOperation = operatorButtons[i].textContent;
            lastClicked = "operation";
        }
    });
}

function appendNumber(value) {
    screen.textContent += value;
}
