# SpendWise

SpendWise is a budgeting app built with HTML, CSS and JavaScript. This week it
changed from a static dashboard into an interactive one. Users can set a
monthly budget, add and delete expenses, and see the dashboard update straight
away with feedback on how they are doing.

## Files

- `index.html`: page structure, including the budget form, summary, category
  cards, expense form and expense table.
- `style.css`: layout, theme colours, dark theme, responsive rules, forms,
  table and status styling.
- `script.js`: all the logic, covering data, calculations, rendering and events.

## What improved this week

- The category cards are no longer typed into the HTML. They are built from
  data stored in arrays.
- Users can set a monthly budget and add expenses through forms.
- Users can delete an expense with a Delete button.
- The summary, cards and table update immediately after every change, with no
  page refresh.
- The app gives feedback: a status message shows whether the user is on track,
  close to the limit or over budget.
- Form input is checked, so empty or invalid entries show an error message.

## How conditionals are used

Conditional statements make the app respond to the user's situation:

- **Budget status:** an if / else if / else chain checks, in order, whether no
  budget is set, whether spending is over budget, whether 80% or more of the
  budget is used, and otherwise shows that the user is on track. The order
  matters because the first true condition wins, so "over budget" is checked
  before the 80% warning.
- **Category cards:** each card gets a warning style at 80% of its category
  budget and an over-budget style when it goes past it.
- **Form validation:** the forms check for an empty description, an empty
  amount, or an amount that is not greater than 0, and show an error message
  instead of adding bad data.
- **Empty state:** the "No expenses yet" message is shown only when the
  expenses array is empty.

## How arrays are used to store data

- `categories` is an array of objects. Each one holds a category name and its
  budget, for example Food with a budget of 16,000.
- `expenses` is an array of objects. Each one holds an id, a description, an
  amount and a category.
- Adding an expense uses `push`. Deleting one uses `findIndex` and `splice`.
- Each expense has a unique `id`, so the right record is removed even when the
  list changes.
- The page is always drawn from these arrays, so the data is the single source
  of truth.

## How loops are used

`for...of` loops work through the stored records:

- adding up all expenses to get the total spent
- adding up the expenses in each category for the cards
- building one card for each category
- building one table row for each expense
- filling the category dropdown from the `categories` array

## How the DOM is updated

The page is changed with JavaScript rather than written by hand in the HTML.

- Elements are found with `document.getElementById`.
- New elements, such as cards, table rows and dropdown options, are created
  with `document.createElement` and added with `append`.
- Text is set with `textContent`, which is safer than `innerHTML` because
  anything a user types is treated as plain text and never as code.
- One function, `updateDashboard()`, clears and redraws the cards, the table
  and the summary from the current arrays. It runs after every change, so the
  page always matches the data.
- Styling changes, such as status colours and card warnings, are made by adding
  and changing CSS classes.

## How user interactions are handled through events

- **Set Budget form:** a `submit` event reads the value, checks it, saves it
  and updates the dashboard.
- **Add Expense form:** a `submit` event validates the input, adds the expense
  to the array, clears the form and updates the dashboard.
- **Delete buttons:** one `click` listener on the table body handles every
  Delete button (event delegation). It reads the expense id stored on the
  button, removes that expense and updates the dashboard. This works even for
  rows that are created later.
- `event.preventDefault()` stops the form from reloading the page, which would
  erase the data in the arrays.

## How user actions connect to the page

Every interaction follows the same flow:

1. The user acts, for example by clicking Add Expense.
2. An event listener runs.
3. Conditionals check that the input is valid.
4. The array is changed, for example with `push` or `splice`.
5. `updateDashboard()` loops through the arrays and redraws the page.

## Challenges and how I resolved them

**1. Understanding how JavaScript fits together.**
JavaScript was the hardest part of this project for me. I found it difficult
to see how the data, the page and the user actions connect. I resolved it by
breaking the code into three parts: the arrays that store the data, the render
functions that draw the page from that data, and the event listeners that
respond to the user. Following one action at a time, such as adding an expense,
helped me see how the array changes and the dashboard updates.

**2. DevTools would not open with F12.**
I needed the browser console to check that my script was loading, but F12 did
nothing on my laptop. I found that function keys can be mapped to hardware
controls, and I opened DevTools with Fn + F12, Ctrl + Shift + J, or
right-click and Inspect instead.

**3. The dark theme was not showing.**
The dark theme did not appear because the browser only applies it when the
device is set to dark mode. I fixed this by using the DevTools Rendering tab
to emulate the dark colour scheme, which confirmed the theme worked.

## How to run

1. Open `index.html` in a browser.
2. Set a monthly budget and add or delete expenses to see the dashboard update.

Data resets when the page is refreshed. Saving data permanently is not part of
this week's work.

## Author

Loise