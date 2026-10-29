const INITIAL_COLORS = [
    { name: "YellowGreen", type: "RGB", code: "154, 205, 50" },
    { name: "DarkCyan", type: "RGBA", code: "0, 139, 139, 1" },
    { name: "OrangeRed", type: "HEX", code: "#FF4500" }
];

const COOKIE_NAME = "hwColorPalette";
const COOKIE_MAX_AGE = 3 * 60 * 60;
const MAX_COOKIE_LENGTH = 4000;

const form = document.getElementById("color-form");
const nameInput = document.getElementById("color-name");
const typeSelect = document.getElementById("color-type");
const codeInput = document.getElementById("color-code");
const cookieError = document.getElementById("cookie-error");
const palette = document.getElementById("palette");
const emptyMessage = document.getElementById("empty-message");

// Повертає код у єдиному форматі або null, якщо код некоректний.
function normalizeCode(type, code) {
    code = code.trim();

    if (type === "HEX") {
        if (/^#[0-9a-f]{6}$/i.test(code)) {
            return code.toUpperCase();
        }

        return null;
    }

    if (type !== "RGB" && type !== "RGBA") {
        return null;
    }

    const parts = code.split(",");
    const expectedCount = type === "RGBA" ? 4 : 3;

    if (parts.length !== expectedCount) {
        return null;
    }

    const numbers = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();

        // Додатне десяткове число або нуль, зокрема 0.5 та .5.
        if (!/^(\d+(\.\d+)?|\.\d+)$/.test(part)) {
            return null;
        }

        const number = Number(part);
        const maximum = i === 3 ? 1 : 255;

        if (!Number.isFinite(number) || number < 0 || number > maximum) {
            return null;
        }

        numbers.push(number);
    }

    return numbers.join(", ");
}

// Cookie читаються як рядок: name=value; otherName=otherValue.
function getCookie(name) {
    let cookies;

    try {
        cookies = document.cookie.split(";");
    } catch {
        return null;
    }

    const prefix = name + "=";

    for (const cookie of cookies) {
        const part = cookie.trim();

        if (part.startsWith(prefix)) {
            return part.slice(prefix.length);
        }
    }

    return null;
}

function loadColors() {
    const savedValue = getCookie(COOKIE_NAME);

    if (savedValue === null) {
        return INITIAL_COLORS.slice();
    }

    try {
        const savedColors = JSON.parse(decodeURIComponent(savedValue));

        if (!Array.isArray(savedColors)) {
            throw new Error("Invalid collection");
        }

        const checkedColors = [];

        for (const color of savedColors) {
            if (!color || typeof color.name !== "string" || typeof color.code !== "string") {
                throw new Error("Invalid color");
            }

            const name = color.name.trim();
            const code = normalizeCode(color.type, color.code);
            const duplicate = checkedColors.some(function (item) {
                return item.name.toLowerCase() === name.toLowerCase();
            });

            if (!/^\p{L}+$/u.test(name) || code === null || duplicate) {
                throw new Error("Invalid color");
            }

            checkedColors.push({ name: name, type: color.type, code: code });
        }

        return checkedColors;
    } catch {
        cookieError.textContent = "Не вдалося прочитати збережені кольори. Показано початкову палітру.";
        return INITIAL_COLORS.slice();
    }
}

function saveColors(collection) {
    if (location.protocol !== "http:" && location.protocol !== "https:") {
        cookieError.textContent = "Для збереження Cookie відкрийте сторінку через локальний сервер, наприклад Live Server.";
        return false;
    }

    const value = encodeURIComponent(JSON.stringify(collection));
    const cookie = COOKIE_NAME + "=" + value + "; max-age=" + COOKIE_MAX_AGE + "; path=/; SameSite=Lax";

    // Розмір Cookie обмежений, тому не втрачаємо старі дані при переповненні.
    if (cookie.length > MAX_COOKIE_LENGTH) {
        cookieError.textContent = "У Cookie не вистачає місця для ще одного кольору.";
        return false;
    }

    try {
        document.cookie = cookie;

        if (getCookie(COOKIE_NAME) !== value) {
            throw new Error("Cookie was not saved");
        }
    } catch {
        cookieError.textContent = "Не вдалося зберегти палітру. Перевірте, чи дозволені Cookie для цієї сторінки.";
        return false;
    }

    cookieError.textContent = "";
    return true;
}

function renderColors() {
    palette.textContent = "";
    emptyMessage.hidden = colors.length > 0;

    for (const color of colors) {
        const card = document.createElement("article");
        card.className = "color-card";

        if (color.type === "HEX") {
            card.style.backgroundColor = color.code;
        } else {
            card.style.backgroundColor = color.type.toLowerCase() + "(" + color.code + ")";
        }

        const info = document.createElement("div");
        info.className = "color-info";

        const name = document.createElement("h3");
        name.className = "color-name";
        name.textContent = color.name;

        const type = document.createElement("p");
        type.className = "color-type";
        type.textContent = color.type;

        const code = document.createElement("p");
        code.className = "color-code";
        code.textContent = color.code;

        info.append(name, type, code);
        card.append(info);
        palette.append(card);
    }
}

function showError(field, errorId, message) {
    document.getElementById(errorId).textContent = message;
    field.setAttribute("aria-invalid", String(message !== ""));
}

function updateExample() {
    const examples = {
        RGB: "154, 205, 50",
        RGBA: "0, 139, 139, 0.5",
        HEX: "#FF4500"
    };

    codeInput.placeholder = examples[typeSelect.value] || "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    cookieError.textContent = "";

    const name = nameInput.value.trim();
    const type = typeSelect.value;
    const code = normalizeCode(type, codeInput.value);
    let nameMessage = "";
    let codeMessage = "";

    if (name === "") {
        nameMessage = "Введіть назву кольору.";
    } else if (!/^\p{L}+$/u.test(name)) {
        nameMessage = "Назва має містити лише літери, без пробілів, цифр і дефісів.";
    } else if (colors.some(function (color) {
        return color.name.toLowerCase() === name.toLowerCase();
    })) {
        nameMessage = "Колір із такою назвою вже існує.";
    }

    if (code === null) {
        if (type === "HEX") {
            codeMessage = "Введіть # і рівно 6 символів: цифри 0–9 або літери A–F.";
        } else if (type === "RGBA") {
            codeMessage = "Введіть 4 числа через кому: перші три 0–255, останнє 0–1.";
        } else {
            codeMessage = "Введіть 3 числа через кому, кожне від 0 до 255.";
        }
    }

    showError(nameInput, "name-error", nameMessage);
    showError(codeInput, "code-error", codeMessage);

    if (nameMessage !== "" || codeMessage !== "") {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
    }

    // Картка з’явиться лише після успішного запису колекції в Cookie.
    const updatedColors = colors.slice();
    updatedColors.push({ name: name, type: type, code: code });

    if (!saveColors(updatedColors)) {
        return;
    }

    colors = updatedColors;
    renderColors();
    form.reset();
    updateExample();
    nameInput.focus();
});

nameInput.addEventListener("input", function () {
    showError(nameInput, "name-error", "");
});

codeInput.addEventListener("input", function () {
    showError(codeInput, "code-error", "");
});

typeSelect.addEventListener("change", function () {
    showError(codeInput, "code-error", "");
    updateExample();
});

let colors = loadColors();
renderColors();
updateExample();

// При оновленні вже наявна Cookie не перезаписується і не продовжується.
if (getCookie(COOKIE_NAME) === null) {
    saveColors(colors);
}
