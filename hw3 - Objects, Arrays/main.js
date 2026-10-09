// // Objects. Task 1: Car

// let car = {
//     manufacturer: "McLaren",
//     model: "Artura",
//     year: 2022,
//     averageSpeed: 270
// };

// function showCar(car) {
//     console.log("Виробник: " + car.manufacturer);
//     console.log("Модель: " + car.model);
//     console.log("Рік випуску: " + car.year);
//     console.log("Середня швидкість: " + car.averageSpeed + " км/год");
// }

// function getTravelTime(car, distance) {
//     if (car.averageSpeed <= 0 || distance < 0) {
//         throw new Error("Перевірте швидкість і відстань.");
//     }

//     let drivingTime = distance / car.averageSpeed;
//     let remainingTime = drivingTime;
//     let breaks = 0;

//     while (remainingTime > 4) {
//         breaks++;
//         remainingTime -= 4;
//     }

//     return drivingTime + breaks;
// }

// showCar(car);
// console.log(getTravelTime(car, 400)); 
// console.log(getTravelTime(car, 800)); 
// console.log(getTravelTime(car, 900));


// // Objects. Task 2: Fractions

// let fraction1 = { numerator: 1, denominator: 2 };
// let fraction2 = { numerator: 1, denominator: 3 };

// function reduceFraction(fraction) {
//     if (fraction.denominator === 0) {
//         throw new Error("Знаменник не може дорівнювати нулю.");
//     }

//     let a = Math.abs(fraction.numerator);
//     let b = Math.abs(fraction.denominator);

//     // Знаходимо найбільший спільний дільник.
//     while (b !== 0) {
//         let remainder = a % b;
//         a = b;
//         b = remainder;
//     }

//     let numerator = fraction.numerator / a;
//     let denominator = fraction.denominator / a;

//     if (denominator < 0) {
//         numerator = -numerator;
//         denominator = -denominator;
//     }

//     return {
//         numerator: numerator,
//         denominator: denominator
//     };
// }

// function addFractions(first, second) {
//     let result = {
//         numerator: first.numerator * second.denominator
//             + second.numerator * first.denominator,
//         denominator: first.denominator * second.denominator
//     };

//     return reduceFraction(result);
// }

// function subtractFractions(first, second) {
//     let result = {
//         numerator: first.numerator * second.denominator
//             - second.numerator * first.denominator,
//         denominator: first.denominator * second.denominator
//     };

//     return reduceFraction(result);
// }

// function multiplyFractions(first, second) {
//     let result = {
//         numerator: first.numerator * second.numerator,
//         denominator: first.denominator * second.denominator
//     };

//     return reduceFraction(result);
// }

// function divideFractions(first, second) {
//     if (first.denominator === 0 || second.denominator === 0) {
//         throw new Error("Знаменник не може дорівнювати нулю.");
//     }

//     if (second.numerator === 0) {
//         throw new Error("Не можна ділити на нульовий дріб.");
//     }

//     let result = {
//         numerator: first.numerator * second.denominator,
//         denominator: first.denominator * second.numerator
//     };

//     return reduceFraction(result);
// }

// console.log(addFractions(fraction1, fraction2));      // 5/6
// console.log(subtractFractions(fraction1, fraction2)); // 1/6
// console.log(multiplyFractions(fraction1, fraction2)); // 1/6
// console.log(divideFractions(fraction1, fraction2));   // 3/2

// console.log(reduceFraction({
//     numerator: 6,
//     denominator: 8
// })); // 3/4


// // Objects. Task 3: Time

// let time = {
//     hours: 23,
//     minutes: 59,
//     seconds: 50
// };

// function showTime(time) {
//     let hours = time.hours;
//     let minutes = time.minutes;
//     let seconds = time.seconds;

//     if (hours < 10) {
//         hours = "0" + hours;
//     }

//     if (minutes < 10) {
//         minutes = "0" + minutes;
//     }

//     if (seconds < 10) {
//         seconds = "0" + seconds;
//     }

//     console.log(hours + ":" + minutes + ":" + seconds);
// }

// function addSeconds(time, seconds) {
//     let totalSeconds = time.hours * 3600
//         + time.minutes * 60
//         + time.seconds
//         + seconds;

//     // У добі 86400 секунд.
//     totalSeconds = totalSeconds % 86400;

//     if (totalSeconds < 0) {
//         totalSeconds += 86400;
//     }

//     time.hours = Math.floor(totalSeconds / 3600);
//     time.minutes = Math.floor((totalSeconds % 3600) / 60);
//     time.seconds = totalSeconds % 60;
// }

// function addMinutes(time, minutes) {
//     addSeconds(time, minutes * 60);
// }

// function addHours(time, hours) {
//     addSeconds(time, hours * 3600);
// }

// showTime(time); // 23:59:50

// addSeconds(time, 20);
// showTime(time); // 00:00:10

// addMinutes(time, 125);
// showTime(time); // 02:05:10

// addHours(time, 25);
// showTime(time); // 03:05:10


// // Arrays. Task 1: Shopping List

// let shoppingList = [
//     { name: "Хліб", quantity: 1, isBought: true },
//     { name: "Молоко", quantity: 2, isBought: false },
//     { name: "Яблука", quantity: 5, isBought: false }
// ];

// function showShoppingList(list) {
//     for (let i = 0; i < list.length; i++) {
//         if (!list[i].isBought) {
//             console.log(
//                 list[i].name + ": " + list[i].quantity + ", не куплено"
//             );
//         }
//     }

//     for (let i = 0; i < list.length; i++) {
//         if (list[i].isBought) {
//             console.log(
//                 list[i].name + ": " + list[i].quantity + ", куплено"
//             );
//         }
//     }
// }

// function addPurchase(list, name, quantity) {
//     if (quantity <= 0) {
//         throw new Error("Кількість товару має бути додатною.");
//     }

//     for (let i = 0; i < list.length; i++) {
//         if (list[i].name === name) {
//             list[i].quantity += quantity;
//             return;
//         }
//     }

//     list.push({
//         name: name,
//         quantity: quantity,
//         isBought: false
//     });
// }

// function buyProduct(list, name) {
//     for (let i = 0; i < list.length; i++) {
//         if (list[i].name === name) {
//             list[i].isBought = true;
//             return true;
//         }
//     }

//     return false;
// }

// showShoppingList(shoppingList);

// addPurchase(shoppingList, "Молоко", 1);
// addPurchase(shoppingList, "Сир", 1);
// buyProduct(shoppingList, "Молоко");

// console.log("Оновлений список:");
// showShoppingList(shoppingList);


// // Arrays. Task 2: Receipt

// let receipt = [
//     { name: "Молоко", quantity: 2, price: 45 },
//     { name: "Яблука", quantity: 5, price: 20 },
//     { name: "Хліб", quantity: 1, price: 30 }
// ];

// function showReceipt(receipt) {
//     for (let i = 0; i < receipt.length; i++) {
//         let item = receipt[i];

//         console.log(
//             item.name + ": "
//             + item.quantity + " × " + item.price
//             + " = " + item.quantity * item.price + " грн"
//         );
//     }

//     console.log("Разом: " + getTotal(receipt) + " грн");
// }

// function getTotal(receipt) {
//     let total = 0;

//     for (let i = 0; i < receipt.length; i++) {
//         total += receipt[i].quantity * receipt[i].price;
//     }

//     return total;
// }

// function getMostExpensivePurchase(receipt) {
//     if (receipt.length === 0) {
//         return null;
//     }

//     let mostExpensive = receipt[0];

//     for (let i = 1; i < receipt.length; i++) {
//         let currentCost = receipt[i].quantity * receipt[i].price;
//         let highestCost = mostExpensive.quantity * mostExpensive.price;

//         if (currentCost > highestCost) {
//             mostExpensive = receipt[i];
//         }
//     }

//     return mostExpensive;
// }

// function getAveragePrice(receipt) {
//     let totalQuantity = 0;

//     for (let i = 0; i < receipt.length; i++) {
//         totalQuantity += receipt[i].quantity;
//     }

//     if (totalQuantity === 0) {
//         return 0;
//     }

//     return getTotal(receipt) / totalQuantity;
// }

// showReceipt(receipt);
// console.log(getTotal(receipt));                 // 220
// console.log(getMostExpensivePurchase(receipt)); // Яблука
// console.log(getAveragePrice(receipt));          // 27.5


// // Arrays. Task 3: CSS Styles

// let styles = [
//     { name: "color", value: "blue" },
//     { name: "font-size", value: "24px" },
//     { name: "text-align", value: "center" },
//     { name: "text-decoration", value: "underline" }
// ];

// function printStyledText(styles, text) {
//     let styleText = "";

//     for (let i = 0; i < styles.length; i++) {
//         styleText += styles[i].name + ":" + styles[i].value + ";";
//     }

//     document.write('<p style="' + styleText + '">' + text + '</p>');
// }


// if (typeof document !== "undefined") {
//     printStyledText(styles, "Цей текст оформлено стилями з масиву.");
// } else {
//     console.log("CSS-приклад потрібно запускати в браузері.");
// }


// // Arrays. Task 4: Classrooms

// let classrooms = [
//     { name: "В-301", seats: 16, department: "Веб-програмування" },
//     { name: "А-101", seats: 12, department: "Дизайн" },
//     { name: "Д-202", seats: 20, department: "Веб-програмування" },
//     { name: "Б-201", seats: 10, department: "Мережі" },
//     { name: "Г-102", seats: 18, department: "Дизайн" }
// ];

// let group = {
//     name: "ПВ-511",
//     studentCount: 25,
//     department: "Веб-програмування"
// };

// function showClassrooms(classrooms) {
//     for (let i = 0; i < classrooms.length; i++) {
//         let room = classrooms[i];

//         console.log(
//             room.name + ": " + room.seats + " місць, " + room.department
//         );
//     }
// }

// function showDepartmentClassrooms(classrooms, department) {
//     for (let i = 0; i < classrooms.length; i++) {
//         if (classrooms[i].department === department) {
//             let room = classrooms[i];

//             console.log(
//                 room.name + ": " + room.seats + " місць, " + room.department
//             );
//         }
//     }
// }

// function showClassroomsForGroup(classrooms, group) {
//     for (let i = 0; i < classrooms.length; i++) {
//         if (
//             classrooms[i].department === group.department
//             && classrooms[i].seats >= group.studentCount
//         ) {
//             let room = classrooms[i];

//             console.log(
//                 room.name + ": " + room.seats + " місць, " + room.department
//             );
//         }
//     }
// }

// function sortClassroomsBySeats(classrooms) {
//     return classrooms.sort(function (first, second) {
//         return first.seats - second.seats;
//     });
// }

// function sortClassroomsByName(classrooms) {
//     return classrooms.sort(function (first, second) {
//         return first.name.localeCompare(second.name, "uk");
//     });
// }

// showClassrooms(classrooms);

// console.log("Аудиторії кафедри дизайну:");
// showDepartmentClassrooms(classrooms, "Дизайн");

// console.log("Аудиторії для групи:");
// showClassroomsForGroup(classrooms, group);

// console.log("За кількістю місць:");
// sortClassroomsBySeats(classrooms);
// showClassrooms(classrooms);

// console.log("За назвою:");
// sortClassroomsByName(classrooms);
// showClassrooms(classrooms);