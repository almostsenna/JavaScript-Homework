const form = document.getElementById("registration-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordButton = document.getElementById("password-button");
const aboutInput = document.getElementById("about");
const characterCount = document.getElementById("character-count");
const citySelect = document.getElementById("city");
const formatGroup = document.getElementById("format-group");
const formatInput = document.getElementById("format-online");
const photoInput = document.getElementById("photo");
const termsInput = document.getElementById("terms");
const successMessage = document.getElementById("success-message");

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;

function showError(field, errorId, message) {
    document.getElementById(errorId).textContent = message;
    field.setAttribute("aria-invalid", String(message !== ""));
}

function hideSuccess() {
    successMessage.hidden = true;
    successMessage.textContent = "";
}

function validateName() {
    const name = nameInput.value.trim();
    let message = "";

    if (name.length < 2 || name.length > 50) {
        message = "Ім’я має містити від 2 до 50 символів без крайніх пробілів.";
    }

    showError(nameInput, "name-error", message);
    return message === "";
}

function validateEmail() {
    emailInput.value = emailInput.value.trim();
    let message = "";

    if (emailInput.value === "") {
        message = "Введіть e-mail.";
    } else if (emailInput.value.length > 100) {
        message = "E-mail має містити не більше 100 символів.";
    } else if (emailInput.validity.typeMismatch) {
        message = "Введіть коректний e-mail, наприклад name@example.com.";
    }

    showError(emailInput, "email-error", message);
    return message === "";
}

function validatePassword() {
    let message = "";

    if (passwordInput.value.length < 8 || passwordInput.value.length > 30) {
        message = "Пароль має містити від 8 до 30 символів.";
    }

    showError(passwordInput, "password-error", message);
    return message === "";
}

function validateAbout() {
    let message = "";

    if (aboutInput.value.length > 300) {
        message = "Опис має містити не більше 300 символів.";
    }

    showError(aboutInput, "about-error", message);
    return message === "";
}

function validateCity() {
    let message = "";

    if (citySelect.value === "") {
        message = "Оберіть місто.";
    }

    showError(citySelect, "city-error", message);
    return message === "";
}

function validateFormat() {
    const selectedFormat = form.querySelector('input[name="format"]:checked');
    let message = "";

    if (!selectedFormat) {
        message = "Оберіть формат навчання.";
    }

    showError(formatInput, "format-error", message);
    return message === "";
}

function validatePhoto() {
    const file = photoInput.files[0];
    let message = "";

    if (file) {
        if (!file.type.startsWith("image/")) {
            message = "Оберіть файл зображення.";
        } else if (file.size > MAX_PHOTO_SIZE) {
            message = "Фото має бути не більше 2 МБ.";
        }
    }

    showError(photoInput, "photo-error", message);
    return message === "";
}

function validateTerms() {
    let message = "";

    if (!termsInput.checked) {
        message = "Потрібно погодитися з умовами навчання.";
    }

    showError(termsInput, "terms-error", message);
    return message === "";
}

// Прибираємо крайні пробіли після виходу з поля, а не під час набору
nameInput.addEventListener("blur", function () {
    nameInput.value = nameInput.value.trim();
    validateName();
});

nameInput.addEventListener("input", function () {
    if (nameInput.getAttribute("aria-invalid") === "true") {
        validateName();
    }
});

emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
aboutInput.addEventListener("blur", validateAbout);
citySelect.addEventListener("change", validateCity);
formatGroup.addEventListener("change", validateFormat);
photoInput.addEventListener("change", validatePhoto);
termsInput.addEventListener("change", validateTerms);

aboutInput.addEventListener("input", function () {
    characterCount.textContent = aboutInput.value.length;

    if (aboutInput.getAttribute("aria-invalid") === "true") {
        validateAbout();
    }
});

passwordButton.addEventListener("click", function () {
    const shouldShow = passwordInput.type === "password";

    if (shouldShow) {
        passwordInput.type = "text";
        passwordButton.textContent = "Приховати пароль";
    } else {
        passwordInput.type = "password";
        passwordButton.textContent = "Показати пароль";
    }

    passwordButton.setAttribute("aria-pressed", String(shouldShow));
});

form.addEventListener("input", hideSuccess);
form.addEventListener("change", hideSuccess);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideSuccess();
    nameInput.value = nameInput.value.trim();

    // Викликаємо всі перевірки, щоб одночасно показати всі помилки.
    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateAbout(),
        validateCity(),
        validateFormat(),
        validatePhoto(),
        validateTerms()
    ];

    if (results.includes(false)) {
        const firstInvalidField = form.querySelector('[aria-invalid="true"]');
        firstInvalidField.focus();
        return;
    }

    successMessage.textContent = "Форму заповнено правильно.";
    successMessage.hidden = false;
});

form.addEventListener("reset", function () {
    const errors = form.querySelectorAll(".error");
    const fields = form.querySelectorAll("[aria-invalid]");

    for (const error of errors) {
        error.textContent = "";
    }

    for (const field of fields) {
        field.setAttribute("aria-invalid", "false");
    }

    // Reset
    characterCount.textContent = "0";
    passwordInput.type = "password";
    passwordButton.textContent = "Показати пароль";
    passwordButton.setAttribute("aria-pressed", "false");
    hideSuccess();
});
