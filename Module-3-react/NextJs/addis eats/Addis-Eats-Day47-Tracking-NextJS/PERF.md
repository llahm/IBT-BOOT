# Addis Eats Performance Decisions

## Server Components
The initial menu and dish details are rendered on the server. Data access is isolated in `lib/data.js`; optional backend requests use 300-second revalidation.

## Client Components
Browser state is limited to interactive boundaries: cart/localStorage, debounced search, SWR status polling, sign-in pending state, and kitchen status controls.

## SWR
Menu search uses a 300 ms debounce, a null SWR key while a non-empty query is waiting to debounce, `keepPreviousData`, and page-specific keys. Order status polls every 5 seconds and uses server-supplied fallback data.

## Images and fonts
Dish detail/menu/search imagery uses `next/image` with an allow-listed Unsplash host and meaningful alt text. The application uses `next/font/google` Geist so the font is managed by Next.js at build time.

## Environment
`API_URL` configures server-side data fetching. `SESSION_SECRET` remains server-only. `NEXT_PUBLIC_SITE_URL` controls metadata base, sitemap URLs, and robots sitemap reference; it is not a secret.

## Verification
Run `npm run build` and `npm run start`, then repeat the main authenticated user flow in production mode.
