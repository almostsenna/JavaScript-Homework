const form = document.querySelector("#multiply-form");
const formFields = document.querySelector("#form-fields");
const numberAInput = document.querySelector("#number-a");
const numberBInput = document.querySelector("#number-b");
const calculateButton = document.querySelector("#calculate-button");
const resultMessage = document.querySelector("#result");

let isLoading = false;

function multiplyAsync(a, b) {
  return new Promise(function (resolve, reject) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      reject(new Error("Некоректні значення"));
      return;
    }

    setTimeout(function () {
      resolve(a * b);
    }, 2000);
  });
}

function readNumber(input) {
  const value = input.value.trim();

  // Порожнє поле не повинно перетворюватися на 0.
  return value === "" ? NaN : Number(value);
}

async function main() {
  if (isLoading) {
    return;
  }

  const a = readNumber(numberAInput);
  const b = readNumber(numberBInput);

  isLoading = true;
  formFields.disabled = true;
  calculateButton.textContent = "Loading...";

  resultMessage.textContent = "Чекаємо 2 секунди...";
  resultMessage.className = "result result--loading";

  try {
    const result = await multiplyAsync(a, b);

    resultMessage.textContent = a + " × " + b + " = " + result;
    resultMessage.className = "result result--success";

    console.log(result);
  } catch (error) {
    resultMessage.textContent = error.message;
    resultMessage.className = "result result--error";

    console.error(error.message);
  } finally {
    isLoading = false;
    formFields.disabled = false;
    calculateButton.textContent = "Помножити";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  main();
});

main();