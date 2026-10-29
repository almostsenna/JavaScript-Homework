// Завдання 1

function processArray(array, callback) {
  const result = [];

  for (const element of array) {
    result.push(callback(element));
  }

  return result;
}

function doubleElement(element) {
  return element * 2;
}

function reverseElement(element) {
  return String(element).split("").reverse().join("");
}

// Завдання 2

function filterArray(array, callback) {
  const result = [];

  for (const element of array) {
    if (callback(element)) {
      result.push(element);
    }
  }

  return result;
}

function isEven(number) {
  return number % 2 === 0;
}

function isShortWord(word) {
  return word.length <= 4;
}

// Завдання 3

function washDishes() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Посуд вимито");
    }, 2000);
  });
}

function cleanRoom() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Кімнату прибрано");
    }, 4000);
  });
}

function makeDinner() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Вечеря приготована");
    }, 7000);
  });
}

// Завдання 4

function sortArray(array) {
  return new Promise(function (resolve, reject) {
    if (array.length === 0) {
      reject(new Error("Масив порожній"));
      return;
    }

    setTimeout(function () {
      const sortedArray = array.slice().sort(function (a, b) {
        return a - b;
      });

      resolve(sortedArray);
    }, 2000);
  });
}

// Інтерфейс

function readArray(input, elementType) {
  let array;

  try {
    array = JSON.parse(input.value.trim());
  } catch (error) {
    throw new Error('Введіть масив у форматі JSON, наприклад [1, 2, 3].');
  }

  if (!Array.isArray(array)) {
    throw new Error('Потрібен масив у квадратних дужках.');
  }

  for (const element of array) {
    if (elementType === 'number' && (typeof element !== 'number' || !Number.isFinite(element))) {
      throw new Error('Масив має містити тільки числа.');
    }
    if (elementType === 'string' && typeof element !== 'string') {
      throw new Error('Масив має містити тільки рядки в подвійних лапках.');
    }
  }

  return array;
}

function clearError(form) {
  const input = form.querySelector('textarea');
  const error = form.querySelector('.error');
  error.textContent = '';
  error.hidden = true;
  input.removeAttribute('aria-invalid');
}

function showError(form, message) {
  const input = form.querySelector('textarea');
  const error = form.querySelector('.error');
  error.textContent = message;
  error.hidden = false;
  input.setAttribute('aria-invalid', 'true');
}

function connectArrayForm(formId, operation, elementType) {
  const form = document.getElementById(formId);
  const input = form.querySelector('textarea');
  const result = form.querySelector('.result');

  input.addEventListener('input', function () {
    clearError(form);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearError(form);

    try {
      const array = readArray(input, elementType);
      result.textContent = JSON.stringify(operation(array));
    } catch (error) {
      result.textContent = '';
      showError(form, error.message);
      input.focus();
    }
  });
}

connectArrayForm('double-form', function (array) {
  return processArray(array, doubleElement);
}, 'number');

connectArrayForm('reverse-form', function (array) {
  return processArray(array, reverseElement);
});

connectArrayForm('even-form', function (array) {
  return filterArray(array, isEven);
}, 'number');

connectArrayForm('short-form', function (array) {
  return filterArray(array, isShortWord);
}, 'string');

const choresButton = document.getElementById('start-chores');
const choreItems = document.querySelectorAll('#chores-list li');
const choresLog = document.getElementById('chores-log');
const choresTime = document.getElementById('chores-time');

function setTaskState(index, state, text) {
  choreItems[index].className = state;
  choreItems[index].querySelector('.task-state').textContent = text;
}

choresButton.addEventListener('click', function () {
  if (choresButton.disabled) {
    return;
  }

  choresButton.disabled = true;
  choresButton.textContent = 'Виконується…';
  choresLog.textContent = '';

  for (let index = 0; index < choreItems.length; index++) {
    setTaskState(index, '', 'Очікує');
  }
  setTaskState(0, 'working', 'Виконується…');

  const startTime = Date.now();

  function updateTime() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    choresTime.textContent = 'Минуло: ' + seconds + ' с';
  }

  function addMessage(message) {
    const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
    choresLog.textContent += seconds + ' с: ' + message + '\n';
  }

  updateTime();
  const timer = setInterval(updateTime, 1000);

  washDishes()
    .then(function (message) {
      setTaskState(0, 'done', message);
      addMessage(message);
      setTaskState(1, 'working', 'Виконується…');
      return cleanRoom();
    })
    .then(function (message) {
      setTaskState(1, 'done', message);
      addMessage(message);
      setTaskState(2, 'working', 'Виконується…');
      return makeDinner();
    })
    .then(function (message) {
      setTaskState(2, 'done', message);
      addMessage(message);
    })
    .catch(function (error) {
      addMessage(error.message);
    })
    .finally(function () {
      clearInterval(timer);
      updateTime();
      choresButton.disabled = false;
      choresButton.textContent = 'Запустити послідовно';
    });
});

const sortForm = document.getElementById('sort-form');
const sortInput = document.getElementById('sort-input');
const sortButton = sortForm.querySelector('button');
const sortResult = sortForm.querySelector('.result');

sortInput.addEventListener('input', function () {
  clearError(sortForm);
});

// У четвертому завданні очікуємо Promise через async/await.
sortForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  if (sortButton.disabled) {
    return;
  }

  clearError(sortForm);

  try {
    const array = readArray(sortInput, 'number');
    sortButton.disabled = true;
    sortInput.disabled = true;
    sortButton.textContent = 'Сортування…';
    sortResult.textContent = 'Очікування результату: 2 секунди…';
    sortResult.setAttribute('aria-busy', 'true');

    const result = await sortArray(array);
    sortResult.textContent = JSON.stringify(result);
  } catch (error) {
    sortResult.textContent = '';
    showError(sortForm, error.message);
  } finally {
    sortButton.disabled = false;
    sortInput.disabled = false;
    sortButton.textContent = 'Відсортувати';
    sortResult.removeAttribute('aria-busy');
    if (!sortForm.querySelector('.error').hidden) {
      sortInput.focus();
    }
  }
});
