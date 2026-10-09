// Task 1
// let start  = Number(prompt("Enter the starting number:"));
// let end = Number(prompt("Enter the ending number:"));
// let sum = 0;
// for (let i = start; i <= end; i++) {
//     sum += i;
// }
// alert(`Sum: ${sum}`);
// // Task 2


// let a  = Number(prompt("Enter the first number:"));
// let b = Number(prompt("Enter the second number:"));

// while (b !== 0) {
//     let remainder = a % b;
//     a = b;
//     b = remainder;
// }
// alert(`GCD: ${a}`);

// // Task 3
// let number  = Number(prompt("Enter the first number:"));

// for (let i = 1; i <= number; i++) {
//     if (number % i === 0) {
//         console.log(i);
//     }
// }
// // Task 4
// let num  = Number(prompt("Enter a number:"));
// num = Math.abs(num);
// let count = 0;
// if (num === 0) {
//     count = 1;
// } else {
//     while (num >= 1) {
//         num = Math.floor(num / 10);
//         count++;
//     } 
//  }
// alert(`Number of digits: ${count}`);
// // Task 5
// let pos = 0;
// let neg = 0;
// let zero = 0;
// let even = 0;
// let odd = 0;

// for (let i = 1; i <= 10; i++) {
//     let num1 = Number(prompt(`Enter number ${i}:`));

//     if (num1 > 0) {
//         pos++;
//     } else if (num1 < 0) {
//         neg++;
//     } else {
//         zero++;
//     }

//     if (num1 % 2 === 0) {
//         even++;
//     } else {
//         odd++;
//     }
// }

// alert(`
// Positive: ${pos}
// Negative: ${neg}
// Zero: ${zero}
// Even: ${even}
// Odd: ${odd}
// `);
// Task 6
// let again;

// do {
//     let number1 = Number(prompt("Enter the first number:"));
//     let number2 = Number(prompt("Enter the second number:"));
//     let operator = prompt("Enter the operator: +, -, *, /");

//     let result;

//     if (operator === "+") {
//         result = number1 + number2;
//     } else if (operator === "-") {
//         result = number1 - number2;
//     } else if (operator === "*") {
//         result = number1 * number2;
//     } else if (operator === "/") {
//         if (number2 !== 0) {
//             result = number1 / number2;
//         } else {
//             result = "Cannot divide by zero";
//         }
//     } else {
//         result = "Unknown operation";
//     }

//     alert(`Result: ${result}`);

//     again = confirm("Do you want to solve another example?");

// } while (again);

// Task 7
// let number = prompt("Enter a number:");
// let shift = Number(prompt("How many digits to shift?"));

// shift = shift % number.length;

// let result = "";

// for (let i = shift; i < number.length; i++) {
//     result += number[i];
// }

// for (let i = 0; i < shift; i++) {
//     result += number[i];
// }

// alert(result);

// Task 8
// const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday"
// ];

// let index = 0;
// let next;

// do {
//     next = confirm(
//         `${days[index]}. Do you want to see the name of the next day of the week?`
//     );

//     if (next) {
//         index++;

//         if (index === days.length) {
//             index = 0;
//         }
//     }

// } while (next);

//Task 9
// for (let i = 2; i <= 9; i++) {

//     for (let j = 1; j <= 10; j++) {
//         console.log(`${i} × ${j} = ${i * j}`);
//     }

// }


//Task 10

// let min = 0;
// let max = 100;

// let guessed = false;

// while (!guessed) {

//     let n = Math.floor((min + max) / 2);

//     let answer = prompt(
//         `Is your number > ${n}, < ${n} or == ${n}?`
//     );

//     if (answer === ">") {

//         min = n + 1;

//     } else if (answer === "<") {

//         max = n - 1;

//     } else if (answer === "==") {

//         alert(`Your number: ${n}`);
//         guessed = true;

//     }
// }

//Recursion
//Task 1
// function power(number, degree) {
//     if (degree === 0) {
//         return 1;
//     }

//     return number * power(number, degree - 1);
// }

// console.log(power(2, 3));
//Task 2
// function gcd(a, b) {
//     if (b === 0) {
//         return a;
//     }

//     return gcd(b, a % b);
// }

// console.log(gcd(48, 18));
//Task 3
// function maxDigit(number) {
//     number = Math.abs(number);

//     if (number < 10) {
//         return number;
//     }

//     let lastDigit = number % 10;
//     let maxFromRest = maxDigit(Math.floor(number / 10));

//     if (lastDigit > maxFromRest) {
//         return lastDigit;
//     } else {
//         return maxFromRest;
//     }
// }

// console.log(maxDigit(58329));
// Task 4
// function isPrime(number, divisor = 2) {
//     if (number < 2) {
//         return false;
//     }

//     if (divisor === number) {
//         return true;
//     }

//     if (number % divisor === 0) {
//         return false;
//     }

//     return isPrime(number, divisor + 1);
// }

// console.log(isPrime(7));
// console.log(isPrime(8));

//Task 5
// function factors(number, divisor = 2) {
//     if (number === 1) {
//         return;
//     }

//     if (number % divisor === 0) {
//         console.log(divisor);
//         factors(number / divisor, divisor);
//     } else {
//         factors(number, divisor + 1);
//     }
// }

// factors(18);

// Task 6
// function fibonacci(n) {
//     if (n === 1 || n === 2) {
//         return 1;
//     }

//     return fibonacci(n - 1) + fibonacci(n - 2);
// }

// console.log(fibonacci(6));

//Functions
//Task 1
// function compare(a, b) {
//     if (a < b) {
//         return -1;
//     }

//     if (a > b) {
//         return 1;
//     }

//     return 0;
// }

// console.log(compare(5, 10));
//Task 2
//  function factorial(number) {
//      if (number === 0 || number === 1) {
//          return 1;
//     }

//      return number * factorial(number - 1);
// }
// console.log(factorial(5)); // 120
// }
// Task 3
// function createNumber(a, b, c) {
//     return a * 100 + b * 10 + c;
// }

// console.log(createNumber(1, 4, 9));
//Task 4
// function area(length, width) {
//     if (width === undefined) {
//         return length * length;
//     }

//     return length * width;
// }
// console.log(area(5, 10)); // 50
// console.log(area(5)); // 25 бо ширина в нас не задана, тому вважаємо що це квадрат і ширина = довжині
// Task 5
// function isPerfect(number) {
//     let sum = 0;

//     for (let i = 1; i < number; i++) {
//         if (number % i === 0) {
//             sum += i;
//         }
//     }

//     return sum === number;
// }
// console.log(isPerfect(6)); // true
// console.log(isPerfect(10)); // false
// //Task 6
// function showPerfectNumbers(min, max) {
//     for (let i = min; i <= max; i++) {
//         if (isPerfect(i)) {
//             console.log(i);
//         }
//     }
// }

// showPerfectNumbers(1, 1000);

// Task 5 i Task 6 бажано розкоментувати разом, оскільки Task 6 використовує функцію з Task 5.