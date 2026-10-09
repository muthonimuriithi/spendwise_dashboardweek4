# SpendWise

A budgeting app built step by step with HTML, CSS and JavaScript. It started
as a responsive dashboard layout, and this week it gained a JavaScript layer
that collects budget data, runs calculations and reports the results.

## Files

- `index.html` — page structure: sidebar navigation, header, and six
  category cards (Food, Transport, Rent, Entertainment, Savings, Utilities).
- `style.css` — layout, theme, responsive rules, card animations and dark
  theme.
- `script.js` — budget logic: variables, user input, calculations,
  reusable functions and console output.

## JavaScript features (this week)

1. **Script setup:** `script.js` is linked in `index.html` with the `defer`
   attribute, so it runs after the page has loaded. A confirmation message
   in the console shows the script loaded successfully.
2. **Stored data:** variables hold the app name, the monthly budget and
   expenses for Food, Transport, Rent, Entertainment and Utilities. They use
   the string, number and boolean data types.
3. **User input:** `prompt()` asks the user for their monthly budget and
   each expense. Prompts return text, so values are converted to numbers.
4. **Calculations:** the program works out total expenses, remaining
   balance, the percentage of the budget used, and whether the user is over
   budget.
5. **Reusable functions:**
   - `askForAmount(message)` — prompts for a number and rejects invalid
     input (letters, negatives or Cancel return 0).
   - `calculateTotalExpenses(...)` — adds up all expense categories.
   - `calculateRemainingBalance(budget, totalExpenses)` — budget minus
     spending.
   - `calculatePercentageUsed(budget, totalExpenses)` — share of the budget
     spent, with a guard against dividing by zero.
   - `formatCurrency(amount)` — formats a number as Kenyan shillings, for
     example `KSh 12,800`.
6. **Display:** a labeled summary is printed to the browser console.

## How to run

1. Open `index.html` in a browser.
2. Open the console (`Ctrl + Shift + J`, or right-click, Inspect, Console).
3. Refresh the page and answer the prompts.

### Example

Inputs: budget 60000; food 12800; transport 3400; rent 25000;
entertainment 2400; utilities 4410.