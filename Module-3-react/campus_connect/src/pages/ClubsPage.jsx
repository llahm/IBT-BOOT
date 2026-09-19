import { useEffect, useState } from "react";
import ClubCard from "../components/ClubCard";
import CategoryFilter from "../components/CategoryFilter";
import StatusBlock from "../components/StatusBlock";
import { fetchClubs } from "../api/clubs";

const CATEGORIES = [
  "All",
  "Technology",
  "Arts & Culture",
  "Sports",
  "Academic",
  "Community Service",
  "Music",
];

function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchClubs({ signal: controller.signal });
        setClubs(result);
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
        <StatusBlock kind="loading" message="Loading clubs…" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container">
        <StatusBlock
          kind="error"
          message={`Couldn't load clubs: ${error}`}
          onRetry={() => setRetryToken((token) => token + 1)}
        />
      </div>
    );
  }

  const visibleClubs = clubs.filter((club) => {
    const matchesCategory = category === "All" || club.category === category;
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="section-label">EXPLORE</span>
          <h2>Campus clubs</h2>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="search"
          className="search-input"
          placeholder="Search clubs…"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search clubs"
        />

        <CategoryFilter
          categories={CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <div className="club-grid" style={{ marginBottom: "60px" }}>
        {visibleClubs.length === 0 ? (
          <p className="empty-state">
            No clubs match — try a different search or category.
          </p>
        ) : (
          visibleClubs.map((club) => <ClubCard key={club.id} {...club} />)
        )}
      </div>
    </div>
  );
}

export default ClubsPage;
