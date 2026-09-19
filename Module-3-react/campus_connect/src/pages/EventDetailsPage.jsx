import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusBlock from "../components/StatusBlock";
import { fetchEventById } from "../api/events";
import { useFavorites } from "../context/FavoritesContext";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEventFavorite, toggleEvent } = useFavorites();

  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchEventById(id, { signal: controller.signal });
        setEvent(result);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <StatusBlock kind="loading" message="Loading event…" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container">
        <StatusBlock kind="error" message={`Couldn't load this event: ${error}`} />
        <Link to="/events" className="back-link">
          ← Back to events
        </Link>
      </div>
    );
  }

  const favorite = isEventFavorite(event.id);

  return (
    <div className="container">
      <Link to="/events" className="back-link">
        ← Back to events
      </Link>

      <div className="detail-layout">
        <img src={event.image} alt={event.name} />

        <div className="detail-body">
          <span className="category-pill">{event.category}</span>
          <h1>{event.name}</h1>
          <p className="description">{event.description}</p>

          <dl className="detail-info-list">
            <div>
              <dt>Date</dt>
              <dd>{formatDate(event.date)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{event.time}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{event.location}</dd>
            </div>
            <div>
              <dt>Hosted by</dt>
              <dd>{event.hostClub}</dd>
            </div>
          </dl>

          <div className="detail-actions">
            <button
              type="button"
              className={`btn ${favorite ? "btn-primary" : "btn-outline"}`}
              onClick={() => toggleEvent(event.id)}
            >
              {favorite ? "★ Favorited" : "☆ Add to Favorites"}
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/events")}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
