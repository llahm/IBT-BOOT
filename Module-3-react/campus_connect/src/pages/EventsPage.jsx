import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import CategoryFilter from "../components/CategoryFilter";
import StatusBlock from "../components/StatusBlock";
import { fetchEvents } from "../api/events";

const CATEGORIES = [
  "All",
  "Technology",
  "Arts & Culture",
  "Sports",
  "Academic",
  "Community Service",
  "Music",
];

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("soonest");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchEvents({ signal: controller.signal });
        setEvents(result);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, [retryToken]);

  if (status === "loading") {
    return (
      <div className="container">
        <StatusBlock kind="loading" message="Loading events…" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container">
        <StatusBlock
          kind="error"
          message={`Couldn't load events: ${error}`}
          onRetry={() => setRetryToken((token) => token + 1)}
        />
      </div>
    );
  }

  const visibleEvents = events
    .filter((event) => {
      const matchesCategory = category === "All" || event.category === category;
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "soonest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="section-label">WHAT'S HAPPENING</span>
          <h2>Upcoming events</h2>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="search"
          className="search-input"
          placeholder="Search events…"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search events"
        />

        <CategoryFilter
          categories={CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />

        <select
          className="sort-select"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          aria-label="Sort events"
        >
          <option value="soonest">Date: Soonest first</option>
          <option value="latest">Date: Latest first</option>
        </select>
      </div>

      <div className="event-grid" style={{ marginBottom: "60px" }}>
        {visibleEvents.length === 0 ? (
          <p className="empty-state">
            No events match — try a different search or category.
          </p>
        ) : (
          visibleEvents.map((event) => <EventCard key={event.id} {...event} />)
        )}
      </div>
    </div>
  );
}

export default EventsPage;
