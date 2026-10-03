# Addis Eats — Next.js Day 40 Project

A JavaScript food-ordering demo migrated from the React-only Addis Eats project to the Next.js App Router. It demonstrates file-based routing, nested layouts, Server and Client Components, server-side data access, dynamic routes, Server Actions, Route Handlers, validation, and loading/error/not-found UI.

## Run locally

Use a supported Node.js release (Next.js 16 requires Node.js 20.9 or newer), then run from this project root — the directory containing `package.json`:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. For a production check, run `npm run build`, then `npm run start`.

## Routes

| URL | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.js` | Home page, featured dishes, and popular restaurants |
| `/menu` | `app/menu/page.js` | Server-rendered menu with category and search filtering |
| `/menu/[id]` | `app/menu/[id]/page.js` | Dynamic dish details; reads `params` from page props |
| `/cart` | `app/cart/page.js` | Interactive cart with quantity controls and localStorage persistence |
| `/checkout` | `app/checkout/page.js` | Checkout form and order summary |
| Unknown URL / unknown dish | `app/not-found.js` | Custom not-found UI; dynamic page calls `notFound()` |
| `POST /api/orders` | `app/api/orders/route.js` | JSON endpoint with server-side validation and HTTP status codes |

The `/api/dishes` endpoint is intentionally omitted: the menu Server Component can read `lib/dishes.js` directly, so an extra HTTP round trip is unnecessary for this app.

## App Router file conventions

- `app/layout.js`: root HTML shell, metadata, header/footer, and cart provider.
- `app/menu/layout.js`: nested menu layout and category navigation.
- `app/menu/loading.js`: loading skeleton for the menu segment.
- `app/menu/error.js`: Client Component error boundary with a retry action.
- `app/not-found.js`: custom missing-page UI.
- `app/actions.js`: Server Action for checkout submission and server validation.
- `app/api/orders/route.js`: HTTP `POST` Route Handler.
- `lib/dishes.js`: shared dish and restaurant data. Server Components import it directly.
- `components/CartProvider.jsx`, `CartClient.jsx`, `AddToCartButton.jsx`, and `CheckoutForm.jsx`: small Client Components for browser state and interactions.

## Test the states

- **Menu loading UI:** visit `/menu?slow=1`. A deliberate 2.5-second delay makes `app/menu/loading.js` visible.
- **Menu error UI:** visit `/menu?error=1`. The data function throws intentionally and `app/menu/error.js` catches the error. This is a teaching switch; remove it before a real deployment.
- **Not-found:** visit `/menu/99999`; the dynamic page calls `notFound()`.
- **Direct route navigation:** type `/menu/1` in the address bar or refresh the page.
- **Cart persistence:** add a dish, open `/cart`, change quantity, refresh, and check that the cart remains. Storage key: `addis-eats-cart`.
- **Invalid checkout:** submit a one-character name or an invalid phone number such as `0912`; the Server Action returns field errors.
- **Route Handler:** from PowerShell, run:

  ```powershell
  Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/orders -ContentType 'application/json' -Body '{"name":"Almaz Bekele","phone":"0912345678"}'
  ```

  An invalid request should return HTTP `422`. Malformed JSON returns `400`; a valid demo request returns `201`.

## Notes about functionality

- The checkout Server Action and API endpoint validate the request and log a demo order on the server. They do **not** connect to a database, create a durable order record, or process real payments.
- Client cart data is persisted in the browser. The server recomputes/validates form fields, but this small learning project does not implement a production order database.
- Images are loaded from Unsplash URLs and therefore require an internet connection. The layout uses standard `<img>` tags so the project does not need remote image host configuration.
- Category links use query strings (`?category=traditional`, `?category=vegetarian`, etc.). Search uses `?q=...`, making the filtered menu link shareable.

## Architecture and learning objectives

See [`STRATEGY.md`](./STRATEGY.md) for the route/rendering choices and [`BOUNDARY.md`](./BOUNDARY.md) for the Server/Client component boundary.
