# Addis Eats Data Architecture

## Server data
The initial menu and dish-detail routes are Server Components. `lib/data.js` uses the optional server-only `API_URL` to fetch `/dishes` and `/dishes/:id` with a 300-second revalidation period. If `API_URL` is unset, the app uses `lib/dishes.js` so the learning project works without a separately running backend.

## SWR
`components/MenuSearch.jsx` uses SWR against `/api/dishes`. It keeps previous results visible while a new query is loading. The search is debounced by 300 ms and an empty query does not send a search request; it loads the paginated base menu instead.

## Search and pagination
The API route accepts `q` and `page`, returns `items`, `page`, `pageSize`, `total`, and `totalPages`. The page number is part of the SWR key. The UI exposes Previous/Next controls and resets to page one when the query changes.

## Order status
The order detail page passes its server-known initial status into a Client Component. SWR then revalidates `/api/orders/:id/status` every five seconds with `fallbackData` so the UI starts with the server result.

## Persistence caveat
The included order repository is deliberately in-memory to avoid introducing a database/ORM that the Day 45 brief excludes. Orders last only for the lifetime of the running Node process. Use the course's existing backend/API when available.
