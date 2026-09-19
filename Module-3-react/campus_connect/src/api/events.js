const EVENTS_ENDPOINT = "/events.json";
const MOCK_NETWORK_DELAY_MS = 400;

function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export async function fetchEvents({ signal } = {}) {
  await delay(MOCK_NETWORK_DELAY_MS, signal);

  const res = await fetch(EVENTS_ENDPOINT, { signal });

  if (!res.ok) {
    throw new Error(`Events request failed with status ${res.status}`);
  }

  const data = await res.json();
  const events = data.events ?? [];

  // Soonest first — nicer default than JSON insertion order.
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export async function fetchEventById(id, { signal } = {}) {
  await delay(MOCK_NETWORK_DELAY_MS, signal);

  const res = await fetch(EVENTS_ENDPOINT, { signal });

  if (!res.ok) {
    throw new Error(`Events request failed with status ${res.status}`);
  }

  const data = await res.json();
  const events = data.events ?? [];
  const event = events.find((item) => String(item.id) === String(id));

  if (!event) {
    throw new Error(`No event found with id "${id}"`);
  }

  return event;
}
