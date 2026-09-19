import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import StatusBlock from "../components/StatusBlock";
import { fetchClubs } from "../api/clubs";
import { fetchEvents } from "../api/events";

const QUICK_LINKS = [
  { to: "/resources", icon: "📚", label: "Library" },
  { to: "/resources", icon: "🎓", label: "Academic Support" },
  { to: "/resources", icon: "💼", label: "Career Services" },
  { to: "/resources", icon: "🛎️", label: "Student Services" },
];

function HomePage() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
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

  const popularClubs = [...clubs]
    .sort((a, b) => b.members - a.members)
    .slice(0, 3);
  const featuredEvents = events.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="section-label">WELCOME TO</span>
            <h1>
              Find your people on <span>campus</span>.
            </h1>
            <p>
              Discover clubs, keep up with events, and find the student
              resources you need — all in one place.
            </p>

            <div className="hero-actions">
              <Link to="/clubs" className="btn btn-primary">
                Browse Clubs
              </Link>
              <Link to="/events" className="btn btn-ghost">
                See Upcoming Events
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>{clubs.length || "—"}</strong>
                <span>Active Clubs</span>
              </div>
              <div className="hero-stat">
                <strong>{events.length || "—"}</strong>
                <span>Upcoming Events</span>
              </div>
              <div className="hero-stat">
                <strong>4</strong>
                <span>Resource Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="quick-links">
          {QUICK_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className="quick-link-card">
              <div className="quick-link-icon">{link.icon}</div>
              {link.label}
            </Link>
          ))}
        </div>

        {status === "loading" && (
          <StatusBlock kind="loading" message="Loading the latest from campus…" />
        )}

        {status === "error" && (
          <StatusBlock
            kind="error"
            message={`Couldn't load the home page: ${error}`}
            onRetry={() => setRetryToken((token) => token + 1)}
          />
        )}

        {status === "success" && (
          <>
            <div className="section-heading">
              <div>
                <span className="section-label">DON'T MISS OUT</span>
                <h2>Featured events</h2>
              </div>
              <Link to="/events" className="btn btn-outline btn-sm">
                View all events →
              </Link>
            </div>

            <div className="event-grid">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="section-heading">
              <div>
                <span className="section-label">TRENDING</span>
                <h2>Popular clubs</h2>
              </div>
              <Link to="/clubs" className="btn btn-outline btn-sm">
                View all clubs →
              </Link>
            </div>

            <div className="club-grid" style={{ marginBottom: "60px" }}>
              {popularClubs.map((club) => (
                <ClubCard key={club.id} {...club} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
