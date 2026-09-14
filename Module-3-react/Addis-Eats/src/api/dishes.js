const DISHES_ENDPOINT = "/dishList.json";

// A real backend would take a moment to respond — this makes the
// loading state actually visible instead of flashing for 2ms.
const MOCK_NETWORK_DELAY_MS = 350;

function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

// Fetches the menu for a given category. This is a mock: it's really
// one static JSON file under the hood, but it's structured the way a
// real endpoint would be — `fetchDishes(category, { signal })` hits
// the network and can be cancelled — so swapping in a real backend
// later (e.g. `/api/dishes?category=...`) is a one-file change.
export async function fetchDishes(category, { signal } = {}) {
  await delay(MOCK_NETWORK_DELAY_MS, signal);

  const url = `${DISHES_ENDPOINT}?category=${encodeURIComponent(category)}`;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Menu request failed with status ${res.status}`);
  }

  const data = await res.json();
  const dishes = data.dishes ?? [];

  // A real API would do this filtering server-side based on the query
  // param above; here we filter after the fetch resolves.
  if (!category || category === "All") return dishes;
  return dishes.filter((dish) => dish.category === category);
}

// Fetches a single dish for the /menu/:id detail page. Mirrors
// fetchDishes above: a mock today, but shaped like a real
// `/api/dishes/:id` lookup (cancellable, throws on not-found) so
// swapping in a real endpoint later is a one-file change.
export async function fetchDishById(id, { signal } = {}) {
  await delay(MOCK_NETWORK_DELAY_MS, signal);

  const res = await fetch(DISHES_ENDPOINT, { signal });

  if (!res.ok) {
    throw new Error(`Menu request failed with status ${res.status}`);
  }

  const data = await res.json();
  const dishes = data.dishes ?? [];
  const dish = dishes.find((item) => String(item.id) === String(id));

  if (!dish) {
    throw new Error(`No dish found with id "${id}"`);
  }

  return dish;
}
