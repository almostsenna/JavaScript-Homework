const form = document.querySelector("#sort-form");
const formFields = document.querySelector("#form-fields");
const arrayInput = document.querySelector("#array-input");
const sortButton = document.querySelector("#sort-button");
const resultMessage = document.querySelector("#result");

let isLoading = false;

function sortArrayAsync(array) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (!Array.isArray(array)) {
        reject(new Error("Очікується масив"));
        return;
      }

      if (array.length === 0) {
        reject(new Error("Масив порожній"));
        return;
      }

      if (!array.every(Number.isFinite)) {
        reject(new Error("Масив повинен містити лише числа"));
        return;
      }

      // Сортуємо копію, щоб не змінювати початковий масив.
      const sortedArray = array.slice().sort(function (a, b) {
        return a - b;
      });

      resolve(sortedArray);
    }, 2000);
  });
}

function readArray(text) {
  const value = text.trim();

  if (value === "") {
    return [];
  }

  return value.split(",").map(function (item) {
    const numberText = item.trim();

    return numberText === "" ? NaN : Number(numberText);
  });
}

async function main() {
  if (isLoading) {
    return;
  }

  const array = readArray(arrayInput.value);

  isLoading = true;
  formFields.disabled = true;
  sortButton.textContent = "Loading...";

  resultMessage.textContent = "Сортуємо масив...";
  resultMessage.className = "result result--loading";

  try {
    const sortedArray = await sortArrayAsync(array);

    resultMessage.textContent =
      "Відсортований масив: [" + sortedArray.join(", ") + "]";

    resultMessage.className = "result result--success";

    console.log("Початковий масив:", array);
    console.log("Відсортований масив:", sortedArray);
  } catch (error) {
    resultMessage.textContent = error.message;
    resultMessage.className = "result result--error";

    console.error(error.message);
  } finally {
    isLoading = false;
    formFields.disabled = false;
    sortButton.textContent = "Відсортувати";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  main();
});

main();