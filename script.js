// ============================================
// SpendWise: JavaScript Foundation
// ============================================

console.log("SpendWise script loaded successfully");

// ---------- REUSABLE FUNCTIONS ----------

// Asks the user for a number and makes sure we get a valid one back
function askForAmount(message) {
    const amount = Number(prompt(message));
    if (isNaN(amount) || amount < 0) {
        return 0;
    }
    return amount;
}

// Adds up all expense categories
function calculateTotalExpenses(food, transport, rent, entertainment, utilities) {
    return food + transport + rent + entertainment + utilities;
}

// Budget minus what was spent
function calculateRemainingBalance(budget, totalExpenses) {
    return budget - totalExpenses;
}

// What percentage of the budget has been used
function calculatePercentageUsed(budget, totalExpenses) {
    if (budget === 0) {
        return 0;
    }
    return (totalExpenses / budget) * 100;
}

// Formats a number as Kenyan shillings, e.g. KSh 12,800
function formatCurrency(amount) {
    return "KSh " + amount.toLocaleString();
}

// ---------- STORE DATA ----------

const appName = "SpendWise";

// ---------- COLLECT USER INPUT ----------

const monthlyBudget = askForAmount("Enter your monthly budget (KSh):");
const foodExpense = askForAmount("How much did you spend on Food (KSh)?");
const transportExpense = askForAmount("How much did you spend on Transport (KSh)?");
const rentExpense = askForAmount("How much did you spend on Rent (KSh)?");
const entertainmentExpense = askForAmount("How much did you spend on Entertainment (KSh)?");
const utilitiesExpense = askForAmount("How much did you spend on Utilities (KSh)?");

// ---------- PERFORM CALCULATIONS ----------

const totalExpenses = calculateTotalExpenses(
    foodExpense,
    transportExpense,
    rentExpense,
    entertainmentExpense,
    utilitiesExpense
);
const remainingBalance = calculateRemainingBalance(monthlyBudget, totalExpenses);
const percentageUsed = calculatePercentageUsed(monthlyBudget, totalExpenses);
const isOverBudget = remainingBalance < 0;

// let is used here because the value is assigned after we decide which branch applies
let statusMessage;
if (isOverBudget) {
    statusMessage = "Over budget by " + formatCurrency(Math.abs(remainingBalance));
} else if (remainingBalance === 0) {
    statusMessage = "Budget fully used";
} else {
    statusMessage = "Within budget";
}

// ---------- DISPLAY RESULTS ----------

console.log(`=== ${appName} Budget Summary ===`);
console.log(`Monthly budget: ${formatCurrency(monthlyBudget)}`);
console.log(`Food: ${formatCurrency(foodExpense)}`);
console.log(`Transport: ${formatCurrency(transportExpense)}`);
console.log(`Rent: ${formatCurrency(rentExpense)}`);
console.log(`Entertainment: ${formatCurrency(entertainmentExpense)}`);
console.log(`Utilities: ${formatCurrency(utilitiesExpense)}`);
console.log(`Total expenses: ${formatCurrency(totalExpenses)}`);
console.log(`Remaining balance: ${formatCurrency(remainingBalance)}`);
console.log(`Budget used: ${percentageUsed.toFixed(1)}%`);
console.log(`Status: ${statusMessage}`);