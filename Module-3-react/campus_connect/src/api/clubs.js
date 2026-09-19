const CLUBS_ENDPOINT = "/clubs.json";

// A small artificial delay so the loading state is actually visible
// in the demo instead of flashing for a single frame — this is what
// a real network request would feel like.
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

export async function fetchClubs({ signal } = {}) {
  await delay(MOCK_NETWORK_DELAY_MS, signal);

  const res = await fetch(CLUBS_ENDPOINT, { signal });

  if (!res.ok) {
    throw new Error(`Clubs request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.clubs ?? [];
}

export async function fetchClubById(id, { signal } = {}) {
  await delay(MOCK_NETWORK_DELAY_MS, signal);

  const res = await fetch(CLUBS_ENDPOINT, { signal });

  if (!res.ok) {
    throw new Error(`Clubs request failed with status ${res.status}`);
  }

  const data = await res.json();
  const clubs = data.clubs ?? [];
  const club = clubs.find((item) => String(item.id) === String(id));

  if (!club) {
    throw new Error(`No club found with id "${id}"`);
  }

  return club;
}
