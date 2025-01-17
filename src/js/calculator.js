document.addEventListener("DOMContentLoaded", function () {
   const display = document.getElementById("display");
   const buttons = document.querySelectorAll(".btn");
   let currentInput = "";
   let operator = "";
   let firstOperand = "";
   let activeOperatorButton = null;

   buttons.forEach((button) => {
      button.addEventListener("click", function () {
         const value = this.getAttribute("data-value");

         if (value === "C") {
            currentInput = "";
            display.value = "";
         } else if (value === "AC") {
            currentInput = "";
            operator = "";
            firstOperand = "";
            display.value = "";
         } else if (value === "+/-") {
            if (currentInput) {
               currentInput = (parseFloat(currentInput) * -1).toString();
               display.value = currentInput;
            }
         } else if (value === "=") {
            if (firstOperand && operator && currentInput) {
               const secondOperand = parseFloat(currentInput);
               let result;
               switch (operator) {
                  case "+":
                     result = firstOperand + secondOperand;
                     break;
                  case "-":
                     result = firstOperand - secondOperand;
                     break;
                  case "*":
                     result = firstOperand * secondOperand;
                     break;
                  case "/":
                     result = firstOperand / secondOperand;
                     break;
               }
               display.value = result;
               firstOperand = result;
               currentInput = "";
               operator = "";
               if (activeOperatorButton) {
                  activeOperatorButton.classList.remove("active");
                  activeOperatorButton = null;
               }
            }
         } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput && !firstOperand) {
               firstOperand = parseFloat(currentInput);
               operator = value;
               currentInput = "";
               if (activeOperatorButton) {
                  activeOperatorButton.classList.remove("active");
               }
               this.classList.add("active");
               activeOperatorButton = this;
            } else if ((firstOperand && operator && !currentInput) || (!currentInput && firstOperand)) {
               operator = value;
               if (activeOperatorButton) {
                  activeOperatorButton.classList.remove("active");
               }
               this.classList.add("active");
               activeOperatorButton = this;
            } else if (currentInput && firstOperand) {
               const secondOperand = parseFloat(currentInput);
               let result;
               switch (operator) {
                  case "+":
                     result = firstOperand + secondOperand;
                     break;
                  case "-":
                     result = firstOperand - secondOperand;
                     break;
                  case "*":
                     result = firstOperand * secondOperand;
                     break;
                  case "/":
                     result = firstOperand / secondOperand;
                     break;
               }
               firstOperand = result;
               operator = value;
               currentInput = "";
               display.value = result;
               if (activeOperatorButton) {
                  activeOperatorButton.classList.remove("active");
               }
               this.classList.add("active");
               activeOperatorButton = this;
            }
         } else {
            if (activeOperatorButton) {
               activeOperatorButton.classList.remove("active");
               activeOperatorButton = null;
            }
            if (currentInput === "0" && value === "0") {
               currentInput = "0";
               display.value = currentInput;
            } else if (value === "0" && operator === "/") {
               display.value = "Error";
               currentInput = "";
               firstOperand = "";
               operator = "";
            } else if (firstOperand && !operator && !currentInput) {
               firstOperand = "";
               currentInput = value;
               display.value = currentInput;
            } else {
               if (currentInput === "0") {
                  currentInput = value;
               } else {
                  currentInput += value;
               }
               display.value = currentInput;
            }
         }
      });
   });
});
