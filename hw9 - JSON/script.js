// Тут потрібне вставлення ключа OMDb API, інакше пошук не працюватиме, API ключ прикріпив у api.txt в завданні
const OMDB_API_KEY = "YOUR_API_KEY";
const OMDB_URL = "https://www.omdbapi.com/";

$(function () {
  const $form = $("#search-form");
  const $title = $("#movie-title");
  const $type = $("#movie-type");
  const $formError = $("#form-error");
  const $results = $("#results");
  const $searchStatus = $("#search-status");
  const $summary = $("#results-summary");
  const $list = $("#movie-list");
  const $pagination = $("#pagination");
  const $details = $("#film-info");
  const $detailsStatus = $("#details-status");
  const $detailsContent = $("#details-content");

  let savedTitle = "";
  let savedType = "movie";
  let currentPage = 1;
  let totalPages = 1;
  let searchRequest = null;
  let detailsRequest = null;
  let searchNumber = 0;
  let detailsNumber = 0;

  function showMessage($element, text, isError) {
    $element.text(text).toggleClass("error", isError).prop("hidden", false);
  }

  function apiError(data) {
    const error = data && typeof data.Error === "string" ? data.Error : "";

    if (/not found/i.test(error)) {
      return "Movie not found!";
    }
    if (/api key/i.test(error)) {
      return "Check your OMDb API key in script.js.";
    }
    if (/request limit/i.test(error)) {
      return "OMDb request limit reached. Try again later.";
    }
    if (/too many results/i.test(error)) {
      return "Too many results. Enter a more specific title.";
    }
    return error || "OMDb returned an unexpected response. Try again.";
  }

  function requestError(xhr, status) {
    if (xhr.responseJSON && xhr.responseJSON.Error) {
      return apiError(xhr.responseJSON);
    }
    if (status === "timeout") {
      return "The request timed out. Try again.";
    }
    if (status === "parsererror") {
      return "OMDb returned invalid JSON. Try again later.";
    }
    return "Could not load data. Check your connection and try again.";
  }

  function displayValue(value) {
    return typeof value === "string" && value !== "N/A" && value.trim()
      ? value
      : "Not specified";
  }

  function createPoster(url, title) {
    const $poster = $("<div>").addClass("poster");
    $("<span>").addClass("poster-placeholder").text("No poster").appendTo($poster);

    if (typeof url === "string" && /^https:\/\//i.test(url)) {
      const $image = $("<img>").attr("src", url).attr("alt", displayValue(title));
      $image.on("error", function () {
        $(this).remove();
      });
      $poster.append($image);
    }

    return $poster;
  }

  function renderMovies(movies) {
    $list.empty();

    movies.forEach(function (movie) {
      const $card = $("<li>").addClass("movie-card");
      const $description = $("<div>").addClass("movie-description");

      $("<p>").text(displayValue(movie.Type)).appendTo($description);
      $("<h3>").text(displayValue(movie.Title)).appendTo($description);
      $("<p>").text(displayValue(movie.Year)).appendTo($description);
      $("<button>")
        .attr("type", "button")
        .attr("data-imdb-id", movie.imdbID)
        .addClass("details-button")
        .text("Details")
        .appendTo($description);

      $card.append(createPoster(movie.Poster, movie.Title), $description);
      $list.append($card);
    });
  }

  function addPageButton(label, page, disabled, active) {
    const $button = $("<button>")
      .attr("type", "button")
      .attr("data-page", page)
      .addClass("page-button")
      .text(label)
      .prop("disabled", disabled);

    if (active) {
      $button.addClass("active").attr("aria-current", "page");
    }
    $pagination.append($button);
  }

  function renderPagination() {
    $pagination.empty().prop("hidden", totalPages <= 1);
    if (totalPages <= 1) {
      return;
    }

    addPageButton("Previous", currentPage - 1, currentPage === 1, false);

    for (let page = 1; page <= totalPages; page++) {
      if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
        addPageButton(String(page), page, page === currentPage, page === currentPage);
      } else if (page === currentPage - 3 || page === currentPage + 3) {
        $("<span>").addClass("page-gap").text("…").appendTo($pagination);
      }
    }

    addPageButton("Next", currentPage + 1, currentPage === totalPages, false);
  }

  function clearDetails() {
    detailsNumber++;
    if (detailsRequest) {
      detailsRequest.abort();
      detailsRequest = null;
    }
    $details.prop("hidden", true).removeAttr("aria-busy");
    $detailsStatus.prop("hidden", true);
    $detailsContent.empty().prop("hidden", true);
  }

  function searchMovies(page) {
    // Номер запиту захищає від застарілої відповіді після нового пошуку
    const requestNumber = ++searchNumber;
    if (searchRequest) {
      searchRequest.abort();
    }
    clearDetails();

    currentPage = page;
    $results.prop("hidden", false).attr("aria-busy", "true");
    $list.empty();
    $pagination.empty().prop("hidden", true);
    $summary.prop("hidden", true);
    showMessage($searchStatus, "Searching…", false);

    searchRequest = $.ajax({
      url: OMDB_URL,
      method: "GET",
      dataType: "json",
      jsonp: false,
      timeout: 12000,
      data: {
        apikey: OMDB_API_KEY.trim(),
        s: savedTitle,
        type: savedType,
        page: page,
        r: "json"
      }
    })
      .done(function (data) {
        if (requestNumber !== searchNumber) {
          return;
        }
        if (!data || data.Response !== "True") {
          showMessage($searchStatus, apiError(data), true);
          return;
        }
        if (!Array.isArray(data.Search) || data.Search.length === 0) {
          showMessage($searchStatus, "Movie not found!", true);
          return;
        }

        const total = Number(data.totalResults) || data.Search.length;
        // OMDb приймає page лише від 1 до 100.
        totalPages = Math.min(100, Math.ceil(total / 10));
        renderMovies(data.Search);
        renderPagination();
        $searchStatus.prop("hidden", true);

        let summary = "Found: " + total + ". Page " + currentPage + " of " + totalPages + ".";
        if (total > 1000) {
          summary += " OMDb allows only the first 100 pages. Refine the title for more results.";
        }
        $summary.text(summary).prop("hidden", false);
      })
      .fail(function (xhr, status) {
        if (status !== "abort" && requestNumber === searchNumber) {
          showMessage($searchStatus, requestError(xhr, status), true);
        }
      })
      .always(function () {
        if (requestNumber === searchNumber) {
          searchRequest = null;
          $results.removeAttr("aria-busy");
        }
      });
  }

  function addDetail($fields, label, value) {
    $("<dt>").text(label + ":").appendTo($fields);
    $("<dd>").text(displayValue(value)).appendTo($fields);
  }

  function renderDetails(movie) {
    const $fields = $("<dl>").addClass("film-fields");
    addDetail($fields, "Title", movie.Title);
    addDetail($fields, "Released", movie.Released);
    addDetail($fields, "Genre", movie.Genre);
    addDetail($fields, "Country", movie.Country);
    addDetail($fields, "Director", movie.Director);
    addDetail($fields, "Writer", movie.Writer);
    addDetail($fields, "Actors", movie.Actors);
    addDetail($fields, "Awards", movie.Awards);
    addDetail($fields, "Runtime", movie.Runtime);
    addDetail($fields, "IMDb rating", movie.imdbRating);
    addDetail($fields, "Plot", movie.Plot);

    $detailsContent.empty().append(createPoster(movie.Poster, movie.Title), $fields);
    $detailsContent.prop("hidden", false);
  }

  function loadDetails(id) {
    clearDetails();
    const requestNumber = detailsNumber;
    $details.prop("hidden", false).attr("aria-busy", "true");
    showMessage($detailsStatus, "Loading film info…", false);
    $details[0].scrollIntoView({ behavior: "smooth", block: "start" });

    detailsRequest = $.ajax({
      url: OMDB_URL,
      method: "GET",
      dataType: "json",
      jsonp: false,
      timeout: 12000,
      data: {
        apikey: OMDB_API_KEY.trim(),
        i: id,
        plot: "full",
        r: "json"
      }
    })
      .done(function (data) {
        if (requestNumber !== detailsNumber) {
          return;
        }
        if (!data || data.Response !== "True") {
          showMessage($detailsStatus, apiError(data), true);
          return;
        }
        renderDetails(data);
        $detailsStatus.prop("hidden", true);
      })
      .fail(function (xhr, status) {
        if (status !== "abort" && requestNumber === detailsNumber) {
          showMessage($detailsStatus, requestError(xhr, status), true);
        }
      })
      .always(function () {
        if (requestNumber === detailsNumber) {
          detailsRequest = null;
          $details.removeAttr("aria-busy");
        }
      });
  }

  $form.on("submit", function (event) {
    event.preventDefault();
    const title = $title.val().trim();

    if (!title) {
      showMessage($formError, "Enter a movie title.", true);
      $title.attr("aria-invalid", "true").trigger("focus");
      return;
    }
    $title.removeAttr("aria-invalid");
    if (!OMDB_API_KEY.trim() || OMDB_API_KEY === "YOUR_API_KEY") {
      showMessage($formError, "Add your OMDb API key in script.js.", true);
      return;
    }

    $formError.prop("hidden", true);
    savedTitle = title;
    savedType = $type.val();
    searchMovies(1);
  });

  $title.on("input", function () {
    $title.removeAttr("aria-invalid");
    $formError.prop("hidden", true);
  });

  $pagination.on("click", ".page-button", function () {
    const page = Number($(this).attr("data-page"));
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      searchMovies(page);
    }
  });

  $list.on("click", ".details-button", function () {
    loadDetails($(this).attr("data-imdb-id"));
  });
});
