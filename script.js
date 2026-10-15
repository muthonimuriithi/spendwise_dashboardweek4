// ============================================
// SpendWise: Interactive Dashboard
// ============================================

// ---------- DATA: arrays of objects ----------

const categories = [
    { name: "Food", budget: 16000 },
    { name: "Transport", budget: 5000 },
    { name: "Rent", budget: 25000 },
    { name: "Entertainment", budget: 4000 },
    { name: "Savings", budget: 12000 },
    { name: "Utilities", budget: 6000 }
];

const expenses = [
    { id: 1, name: "Groceries", amount: 8500, category: "Food" },
    { id: 2, name: "Bus fare", amount: 1200, category: "Transport" },
    { id: 3, name: "Rent", amount: 25000, category: "Rent" },
    { id: 4, name: "Netflix", amount: 1100, category: "Entertainment" },
    { id: 5, name: "Electricity", amount: 2300, category: "Utilities" }
];

let monthlyBudget = 60000;
let nextId = 6;

// ---------- DOM REFERENCES ----------

const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const summaryBudget = document.getElementById("summary-budget");
const summarySpent = document.getElementById("summary-spent");
const summaryRemaining = document.getElementById("summary-remaining");
const summaryPercent = document.getElementById("summary-percent");
const statusMessage = document.getElementById("status-message");
const cardsContainer = document.getElementById("cards");
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const formError = document.getElementById("form-error");
const expenseList = document.getElementById("expense-list");
const emptyMessage = document.getElementById("empty-message");

// ---------- CALCULATION FUNCTIONS ----------

function formatCurrency(amount) {
    return "KSh " + amount.toLocaleString();
}

function calculateTotal(list) {
    let total = 0;
    for (const item of list) {
        total += item.amount;
    }
    return total;
}

function calculateCategoryTotal(categoryName) {
    let total = 0;
    for (const expense of expenses) {
        if (expense.category === categoryName) {
            total += expense.amount;
        }
    }
    return total;
}

function calculateRemainingBalance(budget, totalExpenses) {
    return budget - totalExpenses;
}

function calculatePercentageUsed(budget, totalExpenses) {
    if (budget === 0) {
        return 0;
    }
    return (totalExpenses / budget) * 100;
}

// Decision making: returns the message and a level used for styling
function getBudgetStatus(budget, remaining, percentUsed) {
    if (budget <= 0) {
        return { text: "Set a monthly budget to see your status.", level: "info" };
    } else if (remaining < 0) {
        return {
            text: "Over budget by " + formatCurrency(Math.abs(remaining)) + ". Time to cut back.",
            level: "danger"
        };
    } else if (percentUsed >= 80) {
        return {
            text: "Careful: you have used " + percentUsed.toFixed(1) + "% of your budget.",
            level: "warning"
        };
    } else {
        return {
            text: "You're on track. " + formatCurrency(remaining) + " left to spend.",
            level: "good"
        };
    }
}

// ---------- DOM HELPERS ----------

// Builds an element and sets its text safely
function createEl(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function setStatus(text, level) {
    statusMessage.textContent = text;
    statusMessage.className = "status status-" + level;
}

// ---------- RENDER FUNCTIONS ----------

function populateCategoryOptions() {
    for (const category of categories) {
        const option = createEl("option", "", category.name);
        option.value = category.name;
        categorySelect.append(option);
    }
}

function renderCards() {
    cardsContainer.innerHTML = "";

    for (const category of categories) {
        const spent = calculateCategoryTotal(category.name);

        const card = createEl("article", "card");
        card.tabIndex = 0;

        if (spent > category.budget) {
            card.classList.add("card-over");
        } else if (spent >= category.budget * 0.8) {
            card.classList.add("card-warn");
        }

        card.append(
            createEl("h3", "", category.name),
            createEl("p", "amount", formatCurrency(spent)),
            createEl("p", "note", "of " + formatCurrency(category.budget) + " budget")
        );

        cardsContainer.append(card);
    }
}

function renderExpenses() {
    expenseList.innerHTML = "";

    for (const expense of expenses) {
        const row = document.createElement("tr");

        const deleteCell = document.createElement("td");
        const deleteButton = createEl("button", "delete-btn", "Delete");
        deleteButton.type = "button";
        deleteButton.dataset.id = expense.id;
        deleteCell.append(deleteButton);

        row.append(
            createEl("td", "", expense.name),
            createEl("td", "", expense.category),
            createEl("td", "", formatCurrency(expense.amount)),
            deleteCell
        );

        expenseList.append(row);
    }

    emptyMessage.hidden = expenses.length > 0;
}

function renderSummary() {
    const total = calculateTotal(expenses);
    const remaining = calculateRemainingBalance(monthlyBudget, total);
    const percentUsed = calculatePercentageUsed(monthlyBudget, total);

    summaryBudget.textContent = formatCurrency(monthlyBudget);
    summarySpent.textContent = formatCurrency(total);
    summaryRemaining.textContent = formatCurrency(remaining);
    summaryPercent.textContent = percentUsed.toFixed(1) + "%";

    const status = getBudgetStatus(monthlyBudget, remaining, percentUsed);
    setStatus(status.text, status.level);
}

// One function redraws everything from the data
function updateDashboard() {
    renderCards();
    renderExpenses();
    renderSummary();
}

// ---------- ACTIONS THAT CHANGE THE DATA ----------

function deleteExpense(id) {
    const index = expenses.findIndex(function (expense) {
        return expense.id === id;
    });

    if (index !== -1) {
        expenses.splice(index, 1);
        updateDashboard();
    }
}

// ---------- EVENTS ----------

budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const value = Number(budgetInput.value);

    if (budgetInput.value.trim() === "" || isNaN(value) || value <= 0) {
        setStatus("Enter a monthly budget greater than 0.", "danger");
        return;
    }

    monthlyBudget = value;
    updateDashboard();
});

expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categorySelect.value;

    if (name === "") {
        formError.textContent = "Please enter a description.";
        return;
    }

    if (amountInput.value.trim() === "" || isNaN(amount) || amount <= 0) {
        formError.textContent = "Enter an amount greater than 0.";
        return;
    }

    expenses.push({ id: nextId, name: name, amount: amount, category: category });
    nextId++;

    formError.textContent = "";
    expenseForm.reset();
    nameInput.focus();
    updateDashboard();
});

// Event delegation: one listener handles every Delete button
expenseList.addEventListener("click", function (event) {
    const button = event.target.closest(".delete-btn");
    if (button) {
        deleteExpense(Number(button.dataset.id));
    }
});

// ---------- START ----------

populateCategoryOptions();
budgetInput.value = monthlyBudget;
updateDashboard();