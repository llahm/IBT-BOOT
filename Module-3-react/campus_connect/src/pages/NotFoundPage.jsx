import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container not-found">
      <div className="code">404</div>
      <p>We couldn't find the page you were looking for.</p>

      <div className="hero-actions" style={{ justifyContent: "center" }}>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
