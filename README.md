# SpendWise Dashboard Shell

A responsive dashboard layout for the SpendWise budgeting app, built with
HTML and CSS only. It uses realistic static data in Kenyan shillings and
serves as the foundation for the capstone project.

## Files

- `index.html` — page structure: sidebar navigation, header, and six
  category cards (Food, Transport, Rent, Entertainment, Savings, Utilities).
- `style.css` — all styling, including the theme, layout, responsive
  rules, and card animations.

## What each part does

- **CSS Grid** controls the overall page layout (sidebar, header, content)
  and the arrangement of the category cards.
- **Flexbox** arranges the header, the sidebar navigation items, and the
  content inside each card.
- **CSS custom properties** in `:root` define the theme: brand, accent,
  surface/background, and primary and secondary text colors.
- **Responsive design:** below 768px the layout collapses into a single
  column. Verified with the DevTools Device Toolbar.
- **Card micro-interactions:** cards lift and gain a shadow on hover and
  keyboard focus, using a 200ms transition.
- **Dark theme (stretch goal):** a `prefers-color-scheme: dark` media query
  overrides only the `:root` variables.

## How to view

Open `index.html` in a browser. No build steps or dependencies required.