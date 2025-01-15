document.addEventListener("DOMContentLoaded", function () {
   const display = document.getElementById("display");
   const buttons = document.querySelectorAll(".btn");
   let currentInput = "";
   let operator = "";
   let firstOperand = "";

   buttons.forEach((button) => {
      button.addEventListener("click", function () {
         const value = this.getAttribute("data-value");
         console.log(value);

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
            }
         } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput && !firstOperand) {
               firstOperand = parseFloat(currentInput);
               operator = value;
               currentInput = "";
            } else if ((firstOperand && operator && !currentInput) || (!currentInput && firstOperand)) {
               operator = value;
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
            }
         } else {
            if (currentInput === "0" && value === "0") {
               currentInput = "0";
               display.value = currentInput;
            } else if (value === "0" && operator === "/") {
               display.value = "Error";
               currentInput = "";
               firstOperand = "";
               operator = "";
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
