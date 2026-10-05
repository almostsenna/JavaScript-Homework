// 1. Привітання
const name = prompt("Як вас звати?");
alert(`Привіт, ${name}!`);

// 2. Вік
const CURRENT_YEAR = 2026;
const birthYear = Number(prompt("В якому році ви народилися?"));
const age = CURRENT_YEAR - birthYear;
alert(`Вам ${age} років`);

// 3. Периметр квадрата
const side = Number(prompt("Введіть довжину сторони квадрата:"));
const perimeter = side * 4;
alert(`Периметр квадрата: ${perimeter}`);

// 4. Площа кола
const radius = Number(prompt("Введіть радіус кола:"));
const circleArea = Math.PI * radius ** 2;
alert(`Площа кола: ${circleArea.toFixed(2)}`);

// 5. Необхідна швидкість
const distance = Number(prompt("Введіть відстань між містами в кілометрах:"));
const time = Number(prompt("За скільки годин хочете дістатися?"));

if (time <= 0) {
  alert("Час повинен бути більше нуля!");
} else {
  const speed = distance / time;
  alert(`Потрібна швидкість: ${speed.toFixed(2)} км/год`);
}

// 6. Конвертор валют
const USD_TO_EUR = 0.90; // Умовний курс для завдання
const dollars = Number(prompt("Введіть суму в доларах:"));
const euros = dollars * USD_TO_EUR;
alert(`${dollars} доларів = ${euros.toFixed(2)} євро`);

// 7. Файли на флешці
const MB_PER_GB = 1024;
const FILE_SIZE_MB = 820;
const storageGB = Number(prompt("Введіть обсяг флешки в ГБ:"));
const fileCount = Math.floor(storageGB * MB_PER_GB / FILE_SIZE_MB);
alert(`На флешку вміститься ${fileCount} файлів`);

// 8. Шоколадки та здача
const money = Number(prompt("Скільки грошей у вашому гаманці?"));
const chocolatePrice = Number(prompt("Скільки коштує одна шоколадка?"));

if (chocolatePrice <= 0) {
  alert("Ціна шоколадки повинна бути більше нуля!");
} else {
  const chocolateCount = Math.floor(money / chocolatePrice);
  const change = money - chocolateCount * chocolatePrice;
  alert(`Ви можете купити ${chocolateCount} шоколадок. Залишиться ${change.toFixed(2)} грн`);
}

// 9. Число-перевертень
const threeDigitNumber = Number(prompt("Введіть тризначне число:"));
const hundreds = Math.floor(threeDigitNumber / 100);
const tens = Math.floor(threeDigitNumber / 10) % 10;
const units = threeDigitNumber % 10;
const reversedNumber = `${units}${tens}${hundreds}`;
alert(`Число-перевертень: ${reversedNumber}`);

// 10. Парне чи непарне
const integer = Number(prompt("Введіть ціле число:"));
const parity = (integer % 2 === 0 && "парне") || "непарне";
alert(`Число ${integer} — ${parity}`);