# Day 48 — Event Handling and Deployment

This is the Day 48 continuation of the Addis Eats project. It keeps the existing menu, cart, checkout, order history, and Day 47 delivery tracking, and adds focused React event exercises plus production/deployment guidance.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
```

Create a local environment file:

```powershell
Copy-Item .env.example .env.local
```

Set a unique random `SESSION_SECRET` in `.env.local`, then run:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Day 48 event exercises

- `/events-demo` — index of all exercises
- `/events-demo/object` — `target`, `currentTarget`, and `nativeEvent` in the console
- `/events-demo/form` — controlled input, `onChange`, `onSubmit`, and `preventDefault`
- `/events-demo/propagation` — demonstrates bubbling and `stopPropagation`
- `/events-demo/counter` — functional state updater
- `/events-demo/keyboard` — Enter, Escape, and ArrowDown handling
- `/events-demo/browser` — browser-only `window` access inside `useEffect`, with listener cleanup
- `/events-demo/config` — reads the public site URL from environment configuration

The menu Add buttons provide visible feedback and add dishes to the cart. The checkout uses a pending state and disables the submit button while the server action is processing. That is client-side repeated-click prevention, not a guarantee of exactly-once order creation; production ordering should also use server/database-backed idempotency.

## Production verification

Run these commands from the project root:

```bash
npm run lint
npm run build
npm run start
```

A successful development server does not prove that the production build succeeds. Fix lint/build errors before deployment. `npm run start` requires a successful build first.

## Environment variables

- `NEXT_PUBLIC_SITE_URL`: public canonical site URL; set to the actual Vercel URL for deployment.
- `API_URL`: optional server-side menu API base URL; leave blank to use bundled demo data.
- `SESSION_SECRET`: server-only session signing secret. Use a long, unique value.

Never commit `.env.local` or production secrets. Configure the variables separately for Vercel Development, Preview, and Production environments. Keep preview payment credentials and data non-production.

## Deploy to Vercel

1. Review `git status` and commit the project on the intended course branch.
2. Push the branch to the existing GitHub repository (or create/connect a repository if this project has none).
3. Sign in to Vercel and import that repository.
4. Confirm that Vercel detects Next.js and configure the environment variables for each environment.
5. Deploy and inspect the build logs. Open the deployment URL and test the routes below.
6. Test the preview deployment before merging/promoting to production, following the course repository's workflow.

## Deployment smoke-test checklist

- Home and `/menu` load; menu images render.
- Add a dish, open `/cart`, and continue to checkout.
- A signed-out visit to `/checkout` redirects to sign-in; after sign-in, the checkout works.
- The checkout button shows its pending label and is disabled while the request runs.
- `/events-demo` and each linked exercise works, including keyboard-only interaction.
- `/track/AE-1042` loads its browser-only Leaflet map, displays accessible text information, receives demo SSE updates, and exports CSV.
- `/sitemap.xml` and `/robots.txt` load.
- Check deployment logs and browser console for runtime errors.

## Demo limitations

This remains a learning project. Authentication is a self-contained demo, orders are stored in process memory, no payment is collected, the courier coordinates are fictional, and the Day 47 SSE stream simulates statuses. Process-local data is not durable or shared across serverless instances. Do not use it for real customer orders without a database, production identity, payment integration, authorization review, and server-side idempotency.
