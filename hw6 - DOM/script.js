const goalForm = document.getElementById("goal-form");
const goalInput = document.getElementById("goal-input");
const goalError = document.getElementById("goal-error");
const goalList = document.getElementById("goal-list");
const counter = document.getElementById("counter");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll(".filter-button");

let currentFilter = "all";

// Рахує всі цілі та застосовує поточний фільтр.
function updateGoals() {
    const goals = goalList.querySelectorAll(".goal-item");
    let completedCount = 0;
    let visibleCount = 0;

    for (const goal of goals) {
        const isCompleted = goal.classList.contains("completed");

        if (isCompleted) {
            completedCount++;
        }

        let shouldShow = true;

        if (currentFilter === "active") {
            shouldShow = !isCompleted;
        } else if (currentFilter === "completed") {
            shouldShow = isCompleted;
        }

        goal.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    }

    counter.textContent = "Усього: " + goals.length + ". Виконано: " + completedCount;

    // Порожній список і відсутність збігів під фільтром мають різні повідомлення.
    emptyMessage.hidden = visibleCount > 0;

    if (goals.length === 0) {
        emptyMessage.textContent = "Поки що цілей немає";
    } else {
        emptyMessage.textContent = "За цим фільтром цілей немає";
    }

    for (const button of filterButtons) {
        const isActive = button.dataset.filter === currentFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    }
}

function clearError() {
    goalError.textContent = "";
    goalInput.setAttribute("aria-invalid", "false");
}

// Усі елементи нової цілі створюються через createElement().
function addGoal(text) {
    const goalItem = document.createElement("li");
    goalItem.className = "goal-item";

    const label = document.createElement("label");
    label.className = "goal-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "goal-checkbox";

    const goalText = document.createElement("span");
    goalText.className = "goal-text";
    goalText.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Видалити";
    deleteButton.setAttribute("aria-label", "Видалити ціль: " + text);

    checkbox.addEventListener("change", function () {
        goalItem.classList.toggle("completed", checkbox.checked);
        updateGoals();
    });

    deleteButton.addEventListener("click", function () {
        goalItem.remove();
        updateGoals();
    });

    label.append(checkbox, goalText);
    goalItem.append(label, deleteButton);
    goalList.append(goalItem);
}

goalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = goalInput.value.trim();

    if (text.length < 3 || text.length > 100) {
        goalError.textContent = "Введіть ціль від 3 до 100 символів.";
        goalInput.setAttribute("aria-invalid", "true");
        goalInput.focus();
        return;
    }

    clearError();
    addGoal(text);
    updateGoals();

    goalInput.value = "";
    goalInput.focus();
});

goalInput.addEventListener("input", clearError);

for (const button of filterButtons) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;
        updateGoals();
    });
}

updateGoals();
