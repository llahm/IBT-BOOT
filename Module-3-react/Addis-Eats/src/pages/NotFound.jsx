import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="food-section not-found">
      <div className="container">
        <h2>404</h2>
        <p>We couldn&apos;t find that page.</p>
        <Link to="/" className="view-all">
          ← Back to home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
