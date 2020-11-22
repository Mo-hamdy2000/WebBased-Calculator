const app = Vue.createApp({
    data() {
        return {
            result: '0',
            premium: true,
            firstOperand: 0,
            secondOperand: 0,
            pointIsActive:false,
            lastOperation: '',
            expression:'',
            positive: true,
            finishedOperation: false,
            blockOperation: false,
            unaryOperation: false,
            tempSymbol: ''
        }
    },
    methods: {
        percent() {
            if (this.result == "E") {
                return
            }
            axios.get('http://localhost:8080/percent', {
                params: {
                    operand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
            })
            .catch(error => console.error(error));
        },
        inverse() {
            if (this.result == "E") {
                return
            }
            axios.get('http://localhost:8080/inverse', {
                params: {
                    operand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
            })
            .catch(error => console.error(error));
        },
        square() {
            if (this.result == "E") {
                return
            }
            axios.get('http://localhost:8080/square', {
                params: {
                    operand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
            })
            .catch(error => console.error(error));
        },
        squareRoot() {
            if (this.result == "E") {
                return
            }
            axios.get('http://localhost:8080/squareRoot', {
                params: {
                    operand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
            })
            .catch(error => console.error(error));
        },
        addNumber(number) {
            if (this.blockOperation || this.result == "E") {
                this.blockOperation = false
                this.clearEntry()
            }
            
            if (this.finishedOperation) {
                this.clear()
            }
            if (Number(this.result) != 0) {
                this.result = this.result+(number+"")
            } else {
                this.result = number+""
            }
        },
        binaryOperation(symbol) {
            if (this.blockOperation) {
                this.lastOperation = symbol
                this.expression = this.expression.substring(0, this.expression.length - 2) + symbol + " ";
                return
            }
            if (this.result == "E") {
                return;
            }
            if (this.finishedOperation) {
                this.expression = ""
                this.finishedOperation = false
                this.lastOperation = ''
            }
            if (this.lastOperation != '') {
                this.tempSymbol = symbol
                this.equals(false)
                this.blockOperation = true
            } else {
                this.firstOperand = Number(this.result)
                this.lastOperation = symbol
                this.expression += " " + this.firstOperand + " " +symbol + " "
                this.blockOperation = true
                this.clearEntry()
            }
        },
        addPoint() {
            if (this.blockOperation || this.result == "E") {
                this.blockOperation = false
                this.clearEntry()
            }

            if (this.finishedOperation) {
                this.clear()
            }
            if (!this.pointIsActive) {
                this.result = this.result+(".")
                this.pointIsActive = true
            }
        },
        clearEntry() {
            this.result = 0
            this.pointIsActive = false
        },
        clear() {
            this.firstOperand = 0
            this.secondOperand = 0
            this.lastOperation = ''
            this.expression = ""
            this.finishedOperation = false
            this.clearEntry()
        },
        invertSign() {
            if (Number(this.result) != 0) {
                if (this.positive) {
                    this.result = "-" + this.result
                    this.positive = false
                } else {
                    this.result = this.result.substring(1, this.result.length);
                    this.positive = true
                }
            }
        },
        backSpace() {
            if (this.result.length != 1) {
                this.result = this.result.substring(0, this.result.length - 1);
            } else {
                this.result = '0'
            }
        },
        addition(flag){
            axios.get('http://localhost:8080/addition', {
                params: {
                    firstOperand: this.firstOperand,
                    secondOperand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
                this.updateExpression(flag)
            })
            .catch(error => console.error(error));
        },
        subtraction(flag){
            axios.get('http://localhost:8080/subtraction', {
                params: {
                    firstOperand: this.firstOperand,
                    secondOperand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
                this.updateExpression(flag)
            })
            .catch(error => console.error(error));
        },
        multiply(flag){
            axios.get('http://localhost:8080/multiply', {
                params: {
                    firstOperand: this.firstOperand,
                    secondOperand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
                this.updateExpression(flag)
            })
            .catch(error => console.error(error));
        },
        divide(flag){
            axios.get('http://localhost:8080/divide', {
                params: {
                    firstOperand: this.firstOperand,
                    secondOperand: Number(this.result)
              }
            })
            .then(response => {
                this.result = response.data;
                this.updateExpression(flag)
            })
            .catch(error => console.error(error));
        },
        equals(flag) {
            if (this.result == "E") {
                return
            }
            this.secondOperand = Number(this.result)
            console.log(this.firstOperand)
            console.log(this.secondOperand)
            if (this.lastOperation == '') {
                return
            } else if (this.lastOperation == '+') {
                this.addition(flag)
            } else if (this.lastOperation == '-') {
                this.subtraction(flag)
            } else if (this.lastOperation == '*') {
                this.multiply(flag)
            } else if (this.lastOperation == '÷') {
                this.divide(flag)
            }
        },
        updateExpression(flag) {
            if (flag) {
                this.expression += this.secondOperand + " = " + this.result
                if (this.finishedOperation) {
                    this.expression = this.secondOperand + this.lastOperation + this.firstOperand + " = " + this.result
                } else {
                    this.firstOperand = this.secondOperand
                }
                this.finishedOperation = true
            } else {
                this.firstOperand = Number(this.result)
                this.lastOperation = this.tempSymbol
                this.expression += this.secondOperand + " " + this.lastOperation  + " "
            }
            if (this.result == "E") {
                this.expression = ""
            }
        }
    }
})