# Server / Client and Security Boundaries

- **Server Components:** home, initial menu, dish details, protected order pages, kitchen page.
- **Client Components:** cart/localStorage, SWR menu search, order status polling, form pending states, staff status controls.
- **Server-only:** HMAC session signing/verification, cookie reads, order creation and status mutation, API route handlers.
- **Proxy:** early redirects based on cookie presence only. It is not the final authorization check.
- **Deep checks:** protected pages, Server Actions and Route Handlers call `getSession()` and enforce user ownership or staff role.
- **Secrets:** `SESSION_SECRET` and `API_URL` are server environment variables; neither uses `NEXT_PUBLIC_`.

This is a course demonstration. Replace the in-memory order repository and demo sign-in with the existing course backend/session implementation before any real deployment.
