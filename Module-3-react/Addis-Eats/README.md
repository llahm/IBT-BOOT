# Addis Eats

A food-ordering demo: browse a menu, view a dish, build a cart, and check
out behind a sign-in guard.

## Getting started

```bash
npm install
npm run dev
```

## Architecture

- **Routing**: `react-router-dom`, with a shared `Layout` (`Components/Layout.jsx`)
  rendering `Header` + `<Outlet />` + `Footer`. Category filtering on `/menu`
  lives in the query string via `useSearchParams`.
- **Cart**: a Zustand store (`src/store/cartStore.js`) — `items` plus
  `addItem`/`removeItem`/`updateQty`/`clearCart` actions, wrapped in the
  `persist` middleware (localStorage, key `addis-eats-cart`) so the cart
  survives a page refresh, and `devtools` middleware so store updates show
  up in the Redux DevTools browser extension under "AddisEatsCartStore".
  There's no `<CartProvider>` — components import `useCartStore` directly
  and select just the slice they need:

  ```js
  const addItem = useCartStore((state) => state.addItem);
  ```

  Selecting one narrow value per call (rather than destructuring the whole
  store) means a component that only reads, say, the cart count doesn't
  re-render when some other field changes.
- **Auth**: still a React Context (`src/context/AuthContext.jsx`, exposed
  via `useAuth`), guarding `/checkout` through `RequireAuth`. Context suits
  this well — it's a single low-frequency boolean flag, not the
  high-churn array the cart is.

## Checking re-renders

To see the narrow-selector cart in action:

1. Install the [Redux DevTools browser extension](https://github.com/reduxjs/redux-devtools) —
   Zustand's `devtools` middleware plugs into it automatically.
2. Run the app, open the DevTools, and pick "AddisEatsCartStore" from the
   store dropdown in the Redux tab. Add a few dishes and watch the
   `cart/addItem` actions and state diff appear.
3. In React DevTools' Profiler tab (or Components tab → the settings-gear
   → "Highlight updates when components render"), add a dish and watch
   which components flash: `Header` (count changed) and `Dish`/`DishPage`
   (their own `addItem` call) light up, but components that only read
   `items` (like `CartPage`) only re-render while they're mounted and
   the array actually changes — not from unrelated store activity.

---



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
