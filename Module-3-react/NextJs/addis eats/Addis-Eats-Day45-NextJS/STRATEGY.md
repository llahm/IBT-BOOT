# Day 45 Integration Strategy

The project uses the smallest practical Client Component boundaries. The initial menu is server-rendered; SWR is reserved for interactive search/pagination and status polling. Route Handlers expose JSON for browser-side requests. Server Actions handle sign-in, sign-out, order placement and staff status updates.

Authentication is a self-contained classroom demonstration using an HMAC-signed, `httpOnly` cookie. The proxy redirects early, but pages/actions/handlers verify the session and authorization independently. Orders are intentionally stored in process memory so no database/ORM is introduced outside the Day 45 scope.

Optimization and SEO include `next/image`, `next/font`, page metadata, Open Graph defaults, dynamic dish metadata/JSON-LD, `sitemap.xml`, and `robots.txt`. `DATA.md`, `AUTH.md`, and `PERF.md` explain the corresponding decisions.
