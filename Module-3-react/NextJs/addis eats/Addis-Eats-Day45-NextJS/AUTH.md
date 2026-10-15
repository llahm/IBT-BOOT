# Addis Eats Authentication and Authorization

## Session
`lib/session.js` signs a minimal user payload using HMAC-SHA256 and `SESSION_SECRET`. The cookie is `httpOnly`, `sameSite=lax`, path `/`, expires after seven days, and is `secure` in production. `getSession()` verifies the signature and expiry on the server. Session tokens are not stored in localStorage.

## Demo sign-in
The sign-in action accepts classroom demo credentials and creates a customer or staff session. This is not real password authentication; no account database or password hashes are included. Set `SESSION_SECRET` before local production-mode testing and replace the demo credential logic for real use.

## Route protection
`proxy.js` redirects requests without a session cookie away from `/checkout`, `/orders`, and `/kitchen`. This is an early redirect only, not the authorization boundary.

Protected server pages call `getSession()` and verify the role where applicable. Route handlers and Server Actions independently verify the session before protected operations.

## Ownership
Order detail and status routes verify `order.userId === session.id` unless the session role is staff. The orders list is derived from the current session user ID; clients cannot supply a user ID to select another user's orders.

## Staff
`/kitchen` and `updateOrderStatusAction` require `role === "staff"` on the server. Hiding a link in the interface is not treated as security.

## Return URL
The sign-in action only permits safe internal paths; protocol-relative URLs and external destinations such as `https://example.com` are rejected.

## Limitations
This is a learning demo. The proxy checks cookie presence, while the deeper page/action/handler layers verify the signature. In-memory orders are not durable, and the demo credential flow must not be deployed as a real authentication service.
