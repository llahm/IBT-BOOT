import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useFavorites } from "../context/FavoritesContext";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function EventCard({ id, name, category, date, time, location, description, image }) {
  const { isEventFavorite, toggleEvent } = useFavorites();
  const favorite = isEventFavorite(id);

  function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleEvent(id);
  }

  return (
    <Card className="event-card">
      <Link to={`/events/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <div className="event-card-body">
        <span className="category-pill">{category}</span>

        <h3>
          <Link to={`/events/${id}`}>{name}</Link>
        </h3>

        <p>{description}</p>

        <div className="event-meta">
          <span>📅 {formatDate(date)} · {time}</span>
          <span>📍 {location}</span>
        </div>

        <div className="event-card-footer">
          <Link to={`/events/${id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>

          <button
            type="button"
            className={`favorite-btn ${favorite ? "is-favorite" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  date: PropTypes.string.isRequired,
  time: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default EventCard;
