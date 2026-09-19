import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import StatusBlock from "../components/StatusBlock";
import { fetchClubs } from "../api/clubs";
import { fetchEvents } from "../api/events";
import { useFavorites } from "../context/FavoritesContext";

// Favorites only stores ids (see FavoritesContext) — this page fetches
// the full club/event lists once and filters them down using
// useContext, the same pattern the bonus Context API section asks for.
function FavoritesPage() {
  const { favoriteClubIds, favoriteEventIds } = useFavorites();

  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const [clubList, eventList] = await Promise.all([
          fetchClubs({ signal: controller.signal }),
          fetchEvents({ signal: controller.signal }),
        ]);
        setClubs(clubList);
        setEvents(eventList);
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
        <StatusBlock kind="loading" message="Loading your favorites…" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container">
        <StatusBlock
          kind="error"
          message={`Couldn't load favorites: ${error}`}
          onRetry={() => setRetryToken((token) => token + 1)}
        />
      </div>
    );
  }

  const favoriteClubs = clubs.filter((club) => favoriteClubIds.includes(club.id));
  const favoriteEvents = events.filter((event) => favoriteEventIds.includes(event.id));
  const hasFavorites = favoriteClubs.length > 0 || favoriteEvents.length > 0;

  return (
    <div className="container favorites-section">
      <div className="section-heading">
        <div>
          <span className="section-label">SAVED</span>
          <h2>Your favorites</h2>
        </div>
      </div>

      {!hasFavorites && (
        <p className="empty-state">
          Nothing saved yet — tap the ☆ on any club or event to add it here.{" "}
          <Link to="/clubs" style={{ color: "var(--brand)", fontWeight: 600 }}>
            Browse clubs →
          </Link>
        </p>
      )}

      {favoriteClubs.length > 0 && (
        <>
          <h3 style={{ marginBottom: "16px" }}>Clubs</h3>
          <div className="club-grid">
            {favoriteClubs.map((club) => (
              <ClubCard key={club.id} {...club} />
            ))}
          </div>
        </>
      )}

      {favoriteEvents.length > 0 && (
        <>
          <h3 style={{ margin: "40px 0 16px" }}>Events</h3>
          <div className="event-grid">
            {favoriteEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
