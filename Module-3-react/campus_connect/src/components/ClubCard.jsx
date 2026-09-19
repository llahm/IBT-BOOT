import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useFavorites } from "../context/FavoritesContext";

function ClubCard({ id, name, category, description, image, members }) {
  const { isClubFavorite, toggleClub } = useFavorites();
  const favorite = isClubFavorite(id);

  function handleFavoriteClick(event) {
    // The card's image/title link to the details page — don't let a
    // click on the star also trigger that navigation.
    event.preventDefault();
    event.stopPropagation();
    toggleClub(id);
  }

  return (
    <Card className="club-card">
      <Link to={`/clubs/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <div className="club-card-body">
        <span className="category-pill">{category}</span>

        <h3>
          <Link to={`/clubs/${id}`}>{name}</Link>
        </h3>

        <p>{description}</p>

        <div className="club-card-footer">
          <span className="club-members">{members} members</span>

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

ClubCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  members: PropTypes.number,
};

export default ClubCard;
