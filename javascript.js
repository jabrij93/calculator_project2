class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined ; 
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand  = `${this.currentOperand} ${this.operation}`;
        this.currentOperand = this.previousOperand;
        this.currentOperand = '';
    }

    appendNumbers(number) {
        if( number === '.' && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString( ) + number.toString() ;
    }

    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+' :
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;
                
             case '*' :
                computation = prev * current;
                break;
             
            case '/' :
                computation = prev / current;
                break;
                
            default :
                return;  
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }

    deleteButton() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
        // if (this.operation != null) {
        //     this.previousOperandTextElement.innerText = `${this.currentOperand} ${this.operation}`;
        // } else {
        //     this.previousOperandTextElement.innerText = '';
        // }
    }    
}

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const clear = document.querySelector('[data-all-clear]');
// const period = document.querySelector('[data-period]');
const equal = document.querySelector('[data-equal]');
const backspace = document.querySelector('[data-delete]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumbers(button.innerText);
        calculator.updateDisplay();
    })
})

clear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

backspace.addEventListener('click', () => {
    calculator.deleteButton();
    calculator.updateDisplay();
})

equal.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})