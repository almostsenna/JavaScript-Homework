const adviceForm = document.querySelector("#advice-form");
const adviceFields = document.querySelector("#advice-fields");
const adviceInput = document.querySelector("#advice-input");
const adviceButton = document.querySelector("#advice-button");
const adviceStatus = document.querySelector("#advice-status");
const adviceList = document.querySelector("#advice-list");

const dogFields = document.querySelector("#dog-fields");
const dogButton = document.querySelector("#dog-button");
const dogStatus = document.querySelector("#dog-status");
const breedList = document.querySelector("#breed-list");

const quoteForm = document.querySelector("#quote-form");
const quoteFields = document.querySelector("#quote-fields");
const quoteKeyInput = document.querySelector("#quote-key");
const quoteButton = document.querySelector("#quote-button");
const quoteStatus = document.querySelector("#quote-status");
const quoteContainer = document.querySelector("#quote-container");

const countryForm = document.querySelector("#country-form");
const countryFields = document.querySelector("#country-fields");
const countryInput = document.querySelector("#country-input");
const countryKeyInput = document.querySelector("#country-key");
const countryButton = document.querySelector("#country-button");
const countryStatus = document.querySelector("#country-status");
const countryInfo = document.querySelector("#country-info");

// 1. Допоміжні функції.

function setStatus(element, message, isError = false) {
  element.textContent = message;
  element.className = isError ? "status status--error" : "status";
}

function showError(element, error) {
  setStatus(element, "Помилка: " + error.message, true);
  console.error(error.message);
}

function setLoading(fields, button, loading, text) {
  fields.disabled = loading;
  button.textContent = loading ? "Loading..." : text;
}

function makeElement(tag, text = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

// 2. Пошук порад через XMLHttpRequest.

function fetchAdviceByKeyword(keyword) {
  if (adviceFields.disabled) return;

  adviceList.replaceChildren();

  if (typeof keyword !== "string" || keyword.trim() === "") {
    setStatus(adviceStatus, "Введи слово для пошуку.", true);
    return;
  }

  const url = "https://api.adviceslip.com/advice/search/"
    + encodeURIComponent(keyword.trim());

  setLoading(adviceFields, adviceButton, true, "Знайти поради");
  setStatus(adviceStatus, "Шукаємо поради...");

  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.timeout = 15000;

  xhr.onload = function () {
    try {
      if (xhr.status < 200 || xhr.status >= 300) {
        throw new Error("HTTP " + xhr.status);
      }

      const data = JSON.parse(xhr.responseText);

      if (data && data.message) {
        if (data.message.type === "notice") {
          setStatus(adviceStatus, "Порад не знайдено.");
          return;
        }

        throw new Error(
          data.message.text || "Не вдалося отримати поради."
        );
      }

      if (
        !data
        || !Array.isArray(data.slips)
        || !data.slips.every(function (slip) {
          return slip !== null && typeof slip.advice === "string";
        })
      ) {
        throw new Error("Некоректна відповідь сервера.");
      }

      data.slips.forEach(function (slip) {
        adviceList.append(makeElement("li", slip.advice));
      });

      setStatus(
        adviceStatus,
        "Знайдено порад: " + data.slips.length
      );
    } catch (error) {
      showError(adviceStatus, error);
    }
  };

  xhr.onerror = function () {
    showError(
      adviceStatus,
      new Error("Не вдалося з’єднатися із сервером.")
    );
  };

  xhr.ontimeout = function () {
    showError(
      adviceStatus,
      new Error("Час очікування запиту минув.")
    );
  };

  xhr.onloadend = function () {
    setLoading(adviceFields, adviceButton, false, "Знайти поради");
  };

  xhr.send();
}

// 3. Список порід через XMLHttpRequest.

function fetchDogBreeds() {
  if (dogFields.disabled) return;

  breedList.replaceChildren();

  setLoading(dogFields, dogButton, true, "Завантажити породи");
  setStatus(dogStatus, "Завантажуємо породи...");

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
  xhr.timeout = 15000;

  xhr.onload = function () {
    try {
      if (xhr.status < 200 || xhr.status >= 300) {
        throw new Error("HTTP " + xhr.status);
      }

      const data = JSON.parse(xhr.responseText);

      if (
        !data
        || data.status !== "success"
        || !data.message
        || typeof data.message !== "object"
        || Array.isArray(data.message)
      ) {
        throw new Error("Некоректна відповідь сервера.");
      }

      const breeds = Object.keys(data.message).sort();

      const valid = breeds.every(function (breed) {
        return Array.isArray(data.message[breed])
          && data.message[breed].every(function (subBreed) {
            return typeof subBreed === "string";
          });
      });

      if (!valid) {
        throw new Error("Некоректний список порід.");
      }

      breeds.forEach(function (breed) {
        const subBreeds = data.message[breed];
        let text = breed;

        if (subBreeds.length > 0) {
          text += " (" + subBreeds.join(", ") + ")";
        }

        breedList.append(makeElement("li", text));
      });

      setStatus(
        dogStatus,
        "Завантажено основних порід: " + breeds.length
      );
    } catch (error) {
      showError(dogStatus, error);
    }
  };

  xhr.onerror = function () {
    showError(
      dogStatus,
      new Error("Не вдалося завантажити породи.")
    );
  };

  xhr.ontimeout = function () {
    showError(
      dogStatus,
      new Error("Час очікування запиту минув.")
    );
  };

  xhr.onloadend = function () {
    setLoading(dogFields, dogButton, false, "Завантажити породи");
  };

  xhr.send();
}

// 4. Випадкова цитата через fetch.

async function fetchRandomQuote() {
  if (quoteFields.disabled) return;

  const apiKey = quoteKeyInput.value.trim();

  quoteContainer.replaceChildren();

  if (apiKey === "") {
    setStatus(quoteStatus, "Введи API-ключ API Ninjas.", true);
    return;
  }

  setLoading(quoteFields, quoteButton, true, "Отримати цитату");
  setStatus(quoteStatus, "Завантажуємо цитату...");

  try {
    const options = {
      method: "GET",

      headers: {
        "X-Api-Key": apiKey
      }
    };

    let response = await fetch(
      "https://api.api-ninjas.com/v1/quotes",
      options
    );

    // Якщо стара адреса недоступна, пробуємо актуальну.
    if ([403, 404, 410].includes(response.status)) {
      response = await fetch(
        "https://api.api-ninjas.com/v2/randomquotes",
        options
      );
    }

    if (!response.ok) {
      throw new Error(
        "HTTP " + response.status
        + ". Перевір API-ключ і доступ до API."
      );
    }

    const data = await response.json();

    if (
      !Array.isArray(data)
      || data.length === 0
      || !data[0]
      || typeof data[0].quote !== "string"
      || typeof data[0].author !== "string"
    ) {
      throw new Error("Сервер не повернув цитату з автором.");
    }

    const quote = makeElement("blockquote", data[0].quote);
    const author = makeElement("p", data[0].author);

    author.className = "quote-author";

    quoteContainer.append(quote, author);

    setStatus(quoteStatus, "Цитату завантажено.");
  } catch (error) {
    showError(quoteStatus, error);
  } finally {
    setLoading(quoteFields, quoteButton, false, "Отримати цитату");
  }
}

// 5. Пошук країни через fetch.

async function fetchCountryByName(countryName) {
  if (countryFields.disabled) return;

  countryInfo.replaceChildren();

  if (typeof countryName !== "string" || countryName.trim() === "") {
    setStatus(countryStatus, "Введи назву країни.", true);
    return;
  }

  const name = countryName.trim();
  const apiKey = countryKeyInput.value.trim();
  const useV5 = apiKey !== "";

  let url = "https://restcountries.com/v3.1/name/"
    + encodeURIComponent(name);

  const options = {
    method: "GET"
  };

  // Без ключа використовуємо адресу з умови, з ключем — v5.
  if (useV5) {
    url = "https://api.restcountries.com/countries/v5?names.common="
      + encodeURIComponent(name);

    options.headers = {
      "Authorization": "Bearer " + apiKey
    };
  }

  setLoading(countryFields, countryButton, true, "Знайти країну");
  setStatus(countryStatus, "Шукаємо країну...");

  try {
    const response = await fetch(url, options);

    if (response.status === 404) {
      countryInfo.textContent = "Країна не знайдена";
      setStatus(countryStatus, "");
      return;
    }

    if (!response.ok) {
      if (!useV5 && [401, 403, 410].includes(response.status)) {
        throw new Error(
          "v3.1 недоступна. Введи ключ REST Countries "
          + "для використання v5."
        );
      }

      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();

    const countries = useV5
      ? data && data.data && data.data.objects
      : data;

    if (!Array.isArray(countries)) {
      throw new Error("Некоректна відповідь сервера.");
    }

    if (countries.length === 0) {
      countryInfo.textContent = "Країна не знайдена";
      setStatus(countryStatus, "");
      return;
    }

    countries.forEach(function (country) {
      const names = useV5 ? country.names : country.name;

      if (!names || typeof names.common !== "string") {
        throw new Error("Відсутня назва країни у відповіді.");
      }

      let capital = "Немає даних";

      const capitals = useV5
        ? country.capitals
        : country.capital;

      if (Array.isArray(capitals) && capitals.length > 0) {
        capital = useV5
          ? capitals.map(function (item) {
              return item.name;
            }).join(", ")
          : capitals.join(", ");
      }

      const card = makeElement("article");

      card.className = "country-card";
      card.append(makeElement("h3", names.common));

      const flag = useV5 ? country.flag : country.flags;

      const flagURL = flag && (
        useV5
          ? flag.url_png || flag.url_svg
          : flag.png || flag.svg
      );

      if (typeof flagURL === "string") {
        const image = document.createElement("img");

        image.src = flagURL;
        image.alt = "Прапор: " + names.common;
        image.className = "flag";
        image.loading = "lazy";

        card.append(image);
      }

      const population = Number.isFinite(country.population)
        ? country.population.toLocaleString("uk-UA")
        : "Немає даних";

      card.append(
        makeElement("p", "Столиця: " + capital),
        makeElement(
          "p",
          "Регіон: " + (country.region || "Немає даних")
        ),
        makeElement("p", "Населення: " + population)
      );

      countryInfo.append(card);
    });

    setStatus(
      countryStatus,
      "Знайдено країн: " + countries.length
    );
  } catch (error) {
    countryInfo.replaceChildren();
    showError(countryStatus, error);
  } finally {
    setLoading(countryFields, countryButton, false, "Знайти країну");
  }
}

// 6. Обробники подій.

adviceForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchAdviceByKeyword(adviceInput.value);
});

dogButton.addEventListener("click", fetchDogBreeds);

quoteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchRandomQuote();
});

countryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchCountryByName(countryInput.value);
});

// Породи завантажуються при відкритті сторінки.
fetchDogBreeds();