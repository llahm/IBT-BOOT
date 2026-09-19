import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusBlock from "../components/StatusBlock";
import { fetchClubById } from "../api/clubs";
import { useFavorites } from "../context/FavoritesContext";

function ClubDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isClubFavorite, toggleClub } = useFavorites();

  const [club, setClub] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchClubById(id, { signal: controller.signal });
        setClub(result);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      }
    }

    load();
    // Re-run when navigating from one club straight to another.
    return () => controller.abort();
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <StatusBlock kind="loading" message="Loading club…" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container">
        <StatusBlock kind="error" message={`Couldn't load this club: ${error}`} />
        <Link to="/clubs" className="back-link">
          ← Back to clubs
        </Link>
      </div>
    );
  }

  const favorite = isClubFavorite(club.id);

  return (
    <div className="container">
      <Link to="/clubs" className="back-link">
        ← Back to clubs
      </Link>

      <div className="detail-layout">
        <img src={club.image} alt={club.name} />

        <div className="detail-body">
          <span className="category-pill">{club.category}</span>
          <h1>{club.name}</h1>
          <p className="description">{club.description}</p>

          <dl className="detail-info-list">
            <div>
              <dt>Meeting</dt>
              <dd>{club.meeting}</dd>
            </div>
            <div>
              <dt>Members</dt>
              <dd>{club.members}</dd>
            </div>
          </dl>

          <div className="tag-list">
            {club.interests.map((interest) => (
              <span key={interest} className="tag">
                {interest}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className={`btn ${favorite ? "btn-primary" : "btn-outline"}`}
              onClick={() => toggleClub(club.id)}
            >
              {favorite ? "★ Favorited" : "☆ Add to Favorites"}
            </button>

            {/* Demonstrates programmatic navigation alongside the
                declarative <Link> above the card. */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/clubs")}
            >
              Back to Clubs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetailsPage;
