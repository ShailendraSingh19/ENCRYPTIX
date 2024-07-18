document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            handleInput(value);
        });
    });

    function handleInput(value) {
        if (isNumber(value)) {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === 'C') {
            handleClear();
        } else if (value === '=') {
            handleEquals();
        } else if (value === '.') {
            handleDecimal();
        }
        updateDisplay();
    }

    function handleNumber(value) {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    function handleOperator(value) {
        if (operator !== null) {
            handleEquals();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = value;
    }

    function handleEquals() {
        if (operator === null || previousInput === null) {
            return;
        }
        currentInput = operate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
        operator = null;
        previousInput = null;
    }

    function handleClear() {
        currentInput = '0';
        operator = null;
        previousInput = null;
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function isNumber(value) {
        return !isNaN(value);
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function operate(a, b, operator) {
        // if(operator=='+') return a+b;
        // console.log(a+b+operator);
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});
