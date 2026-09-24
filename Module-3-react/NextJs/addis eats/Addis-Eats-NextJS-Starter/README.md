# Addis Eats — Next.js file-based routing starter

This project rebuilds the route structure of the React-only Addis Eats project using the Next.js App Router. The goal is to practise filesystem routing and segment-level loading, error, and not-found UI—not to implement a full cart or payment backend.

## Requirements

- Node.js **20.9 or newer** (recommended: current LTS)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check the production route output:

```bash
npm run build
npm start
```

## Route map

| URL | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.js` | Home page |
| `/menu` | `app/menu/page.js` | Menu list; includes a short intentional delay to expose `loading.js` |
| `/menu/1` | `app/menu/[id]/page.js` | Dynamic dish details (Beyayinet) |
| `/menu/2` | `app/menu/[id]/page.js` | Dynamic dish details (Classic Pizza) |
| `/menu/3` | `app/menu/[id]/page.js` | Dynamic dish details (Classic Burger) |
| `/cart` | `app/cart/page.js` | Cart placeholder |
| `/checkout` | `app/checkout/page.js` | Checkout placeholder |
| Any unknown URL | `app/not-found.js` | Root not-found page |
| Unknown dish ID, e.g. `/menu/999` | `app/menu/[id]/page.js` calls `notFound()` | Not-found UI for an invalid dish |

Next.js also generates internal framework routes; the table above lists the user-facing routes for this exercise.

## Route states and how to test them

### 1. Loading UI

Navigate to `/menu` from another page. The menu page waits briefly on purpose, so the route segment's `app/menu/loading.js` can be seen during navigation. For a stronger test, use browser DevTools → Network → throttling (Slow 3G), then navigate to Menu.

A direct initial document request may show the browser's own navigation behavior depending on caching and server rendering. Client-side navigation is the clearest way to see the segment loading UI.

### 2. Error UI

On the menu page, select **Test menu error state**, or visit `/menu?error=1`. The page deliberately throws, and `app/menu/error.js` should render. Use **Try again** to retry the route. Remove `?error=1` or select **Back to menu** to return to the working page.

The `error.js` file must be a Client Component, hence the `"use client"` directive at its top.

### 3. Not-found UI

- Visit `/this-route-does-not-exist` to trigger the root `app/not-found.js`.
- Visit `/menu/999` to trigger `notFound()` inside `app/menu/[id]/page.js`.

### 4. Dynamic params

The dynamic dish page reads `id` from its `params` prop (`const { id } = await params`) rather than using a routing hook. Current Next.js versions provide `params` as a Promise in Server Components.

### 5. Components that are not routes

`app/menu/components/DishList.jsx` is colocated with the menu segment, but it does not become a URL because it is not a `page.js` file. The same is true of `app/menu/dishes.js`.

## App tree

```text
app/
├── layout.js
├── globals.css
├── page.js
├── not-found.js
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
├── menu/
│   ├── page.js
│   ├── loading.js
│   ├── error.js
│   ├── dishes.js
│   ├── components/
│   │   └── DishList.jsx
│   └── [id]/
│       └── page.js
├── cart/
│   └── page.js
└── checkout/
    └── page.js
```

## Notes

- All internal navigation uses `next/link`; there are no plain internal `<a>` links.
- The dish list is sample data inspired by the previous Addis Eats project.
- The cart and checkout are intentionally placeholders. This starter keeps the focus on the assignment's five route folders, dynamic params, colocated components, and route states.
- The external food photos require an internet connection. They are plain `<img>` elements so this starter does not need `next/image` remote-host configuration.
- `app/menu/error.js` handles errors thrown by the menu page and its descendants; it does not catch errors from the root layout itself.
