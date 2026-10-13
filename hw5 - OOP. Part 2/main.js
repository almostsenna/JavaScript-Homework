// Task 1
class Marker {
    constructor(color, inkLevel) {
        this.color = color;
        this.inkLevel = inkLevel;
    }

    print(text) {
        let result = "";

        for (let symbol of text) {
            if (this.inkLevel < 0.5) {
                break;
            }

            result += symbol;

            if (symbol.trim() !== "") {
                this.inkLevel -= 0.5;
            }
        }

        let paragraph = document.createElement("p");
        paragraph.style.color = this.color;
        paragraph.textContent = result;
        document.body.append(paragraph);
    }
}

class RefillableMarker extends Marker {

    refill(amount) {
        if (amount <= 0) {
            return;
        }
        this.inkLevel += amount;

        if (this.inkLevel > 100) {
            this.inkLevel = 100;
        }
    }
}

let marker = new Marker("red", 100);

console.log(marker.color); // red
console.log(marker.inkLevel); // 100

let refillableMarker = new RefillableMarker("blue", 50);

console.log(refillableMarker.color); // blue
console.log(refillableMarker.inkLevel); // 50

marker.print("Привіт світ");
console.log(marker.inkLevel); // 95: десять літер × 0.5%

refillableMarker.print("АБ ВГ");
console.log(refillableMarker.inkLevel); // 48

refillableMarker.refill(20);
console.log(refillableMarker.inkLevel); // 68

refillableMarker.refill(50);
console.log(refillableMarker.inkLevel); // 100: спрацювало обмеження

let almostEmptyMarker = new Marker("green", 1.5);

almostEmptyMarker.print("А Б В Г"); // Надрукує А Б В
console.log(almostEmptyMarker.inkLevel); // 0

// Task 2

class ExtendedDate extends Date {

    getTextDate() {
        let days = [
            "перше", "друге", "третє", "четверте", "п'яте",
            "шосте", "сьоме", "восьме", "дев'яте", "десяте",
            "одинадцяте", "дванадцяте", "тринадцяте",
            "чотирнадцяте", "п'ятнадцяте", "шістнадцяте",
            "сімнадцяте", "вісімнадцяте", "дев'ятнадцяте",
            "двадцяте", "двадцять перше", "двадцять друге",
            "двадцять третє", "двадцять четверте",
            "двадцять п'яте", "двадцять шосте",
            "двадцять сьоме", "двадцять восьме",
            "двадцять дев'яте", "тридцяте", "тридцять перше"
        ];

        let months = [
            "січня", "лютого", "березня", "квітня",
            "травня", "червня", "липня", "серпня",
            "вересня", "жовтня", "листопада", "грудня"
        ];

        return days[this.getDate() - 1] + " " + months[this.getMonth()];
    }
    isCurrentOrFuture() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let date = new Date(this);
        date.setHours(0, 0, 0, 0);

        return date >= today;
    }
    isLeapYear() {
        let year = this.getFullYear();

        return year % 400 === 0 ||
            (year % 4 === 0 && year % 100 !== 0);
    }
    getNextDate() {
        let nextDate = new ExtendedDate(this);

        nextDate.setDate(nextDate.getDate() + 1);

        return nextDate;
    }
}
// 15 січня 2023 року
let date = new ExtendedDate(2023, 0, 15);
let nextDate = date.getNextDate();

let output = document.createElement("pre");

output.textContent =
    "Дата: " + date.getTextDate() + "\n" +
    "Поточна або майбутня: " + date.isCurrentOrFuture() + "\n" +
    "Високосний рік: " + date.isLeapYear() + "\n" +
    "Наступна дата: " + nextDate.getTextDate();

document.body.append(output);

// Task 3
class Employee {
    constructor(name, position, department, salary) {
        this.name = name;
        this.position = position;
        this.department = department;
        this.salary = salary;
    }
}

let employees = [
    new Employee("Іван Петренко", "Менеджер", "Кредитний відділ", 28000),
    new Employee("Олена Коваль", "Касир", "Касовий відділ", 22000),
    new Employee("Андрій Мельник", "Аналітик", "Фінансовий відділ", 35000)
];

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        let html = `
            <table class="emp-table">
                <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Посада</th>
                        <th>Відділ</th>
                        <th>Зарплата, грн</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let employee of this.employees) {
            html += `
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.position}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                </tr>
            `;
        }

        html += "</tbody></table>";

        return html;
    }
}

let empTable = new EmpTable(employees);

let simpleTableBlock = document.createElement("section");
simpleTableBlock.innerHTML = "<h2>Завдання 3</h2>" + empTable.getHtml();
document.body.append(simpleTableBlock);

// Task 4
class StyledEmpTable extends EmpTable {
    getStyles() {
        return `
            <style>
                .styled-emp-table .emp-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: Arial, sans-serif;
                }

                .styled-emp-table th,
                .styled-emp-table td {
                    border: 1px solid #b8c4d0;
                    padding: 10px;
                    text-align: left;
                }

                .styled-emp-table th {
                    background-color: #245a81;
                    color: white;
                }

                .styled-emp-table tbody tr:nth-child(even) {
                    background-color: #edf3f8;
                }

                .styled-emp-table tbody tr:hover {
                    background-color: #dceaf5;
                }
            </style>
        `;
    }

    getHtml() {
        return this.getStyles() +
            '<div class="styled-emp-table">' +
            super.getHtml() +
            "</div>";
    }
}

let styledEmpTable = new StyledEmpTable(employees);

let styledTableBlock = document.createElement("section");
styledTableBlock.innerHTML = "<h2>Завдання 4</h2>" + styledEmpTable.getHtml();
document.body.append(styledTableBlock);