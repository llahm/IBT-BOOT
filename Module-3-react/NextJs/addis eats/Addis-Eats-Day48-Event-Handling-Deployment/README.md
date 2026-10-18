# Addis Eats — Day 48 Event Handling & Deployment

A Week 9 integration project combining App Router routing, Server and Client Components, API Route Handlers, Server Actions, SWR, signed cookie sessions, route protection, order ownership checks, staff roles, image/font optimization, SEO metadata, and documentation.

## Requirements
- Node.js **20.9 or newer** (required by Next.js 16)
- npm

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
On Windows PowerShell, use `Copy-Item .env.example .env.local`. Open `http://localhost:3000`.

Set a long random `SESSION_SECRET` in `.env.local` before deployment. `API_URL` is optional: when configured, server-side initial menu data comes from `${API_URL}/dishes`; without it the app uses the included local sample data. The browser-facing `/api/dishes` route uses the included demo dataset for search and pagination.

## Demo authentication
This is a classroom demonstration, not production identity infrastructure:
- Customer: any valid phone number (9–15 digits, optional leading `+`) and password of 4+ characters.
- Staff: phone number ending in `0000`, or password `staff123`.
- Sign out from the header.

Sessions are HMAC-signed and stored in an `httpOnly`, `sameSite=lax` cookie. The cookie uses `secure` in production. The proxy performs early cookie-presence redirects; protected pages, Server Actions, and Route Handlers verify the signature/session and enforce roles/ownership. Do not use the demo credentials or in-memory data for a real service.

## Main routes
| Route | Purpose | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/menu` | Server-rendered menu + SWR search and pagination | Public |
| `/menu/[id]` | Dish details and JSON-LD | Public |
| `/cart` | Browser-persisted cart | Public |
| `/signin?next=/checkout` | Demo sign-in and safe return | Public |
| `/checkout` | Place an order | Signed-in |
| `/orders` | Current user's orders | Signed-in |
| `/orders/[id]` | Order detail and status polling | Owner or staff |
| `/kitchen` | Review orders and update status | Staff |
| `/api/dishes?q=kitfo&page=1` | Search/paginated menu JSON | Public |
| `/api/orders/[id]/status` | Authenticated order status JSON | Owner or staff |
| `/sitemap.xml`, `/robots.txt` | Search discovery rules | Public |

## Day 45 verification walkthrough
1. Visit `/menu`, open a dish, add it to the cart, then open `/cart`.
2. Visit `/checkout` while signed out; verify redirect to `/signin?next=...`.
3. Sign in with a customer demo account and place the order.
4. Open `/orders` and `/orders/[id]`; status is revalidated by SWR every 5 seconds.
5. Sign in with a staff demo account and visit `/kitchen`; update an order status.
6. Test `/signin?next=https://example.com`; after sign-in the external redirect is rejected.
7. Test `/menu?slow=1` and `/menu?error=1` if you want to exercise the existing loading/error examples; normal menu data does not need an external API.
8. Inspect `/sitemap.xml` and `/robots.txt`.
9. Run `npm run lint`, `npm run build`, then `npm run start`.

## Important demo limitations
- Orders are stored in process memory, so they disappear when the server restarts and are not shared between separate server instances.
- The sign-in mechanism is intentionally self-contained for coursework. It does not hash or verify real passwords, use a user database, or provide password reset/OAuth. Replace it with the established Day 42 session/backend implementation for a real deployment.
- No payment gateway is connected.
- The local SWR search endpoint reads the included dish dataset; the optional `API_URL` integration applies to server-rendered menu/detail reads.
- A successful production build is the final verification checkpoint. Run it locally with the Node version above before submission.

## Git submission
```bash
git add .
git commit -m "Complete Addis Eats Week 9 advanced project"
git push
```
Never commit `.env.local`.

## Day 47 — Delivery tracking demo

The Day 47 implementation adds a delivery-tracking experience to the Addis Eats app:

- Visit `/track/AE-1042` or use **Track demo order** on the home page.
- Leaflet + React Leaflet render an interactive OpenStreetMap with courier and destination markers. The map is loaded client-side to avoid server-rendering browser-only APIs.
- `/api/orders/AE-1042/stream` demonstrates Server-Sent Events (SSE) and simulated status updates every five seconds.
- Currency is formatted in ETB, and date/time displays use `Africa/Addis_Ababa`.
- Order status history can be exported to CSV with quoting and common spreadsheet-formula-prefix protection.
- The CSV upload control validates the extension and 2 MB limit, then reads the file as text. It does **not** import or persist rows.

### Install the new map dependencies

```bash
npm install
npm run dev
```

The project now declares `leaflet`, `react-leaflet`, and `@types/leaflet`. If you are updating an existing checkout, run `npm install` before starting the app.

### Demo limitations

Order `AE-1042`, its address, coordinates, courier and statuses are fictional demonstration data. The courier marker does not move, and the SSE endpoint simulates status changes; it is not connected to a courier GPS device or a persisted order database. OpenStreetMap tiles require attribution and are suitable here for learning, not a guarantee of production map capacity. File selection is only a client-side preview; uploads are not sent to a server.


## Day 48 — Event Handling and Deployment

This project now includes the Day 48 practice exercises at `/events-demo` for the React event object, form submission, propagation, functional state updates, keyboard events, browser-only APIs, and public environment configuration. The existing menu Add buttons provide feedback and update the cart. Checkout disables its submit button while the server action is pending.

See [`DAY48-DEPLOYMENT.md`](./DAY48-DEPLOYMENT.md) for local setup, production verification, environment variables, Vercel deployment, and the smoke-test checklist.

Before deploying, set a unique `SESSION_SECRET`, set `NEXT_PUBLIC_SITE_URL` to the real deployment URL, then run `npm run lint` and `npm run build`. The app remains a classroom demo: authentication and order storage are not production-ready, courier data and SSE status updates are simulated, and server-side/database-backed idempotency is not implemented.
