# CampusConnect

A student community portal built with React + React Router. Browse campus
clubs and events, save favorites, and find student resources.

## Getting started

```bash
npm install
npm run dev
```

## Features

- Home, Clubs, Club Details, Events, Event Details, Resources, About, 404
- Search + category filtering on Clubs and Events
- Data loaded from local JSON with loading/error states (`useEffect`)
- Full client-side routing: dynamic routes (`/clubs/:id`, `/events/:id`),
  `NavLink`, programmatic navigation with `useNavigate`, a catch-all 404 route
- Bonus: Context API for favorite clubs/events and a light/dark theme toggle
