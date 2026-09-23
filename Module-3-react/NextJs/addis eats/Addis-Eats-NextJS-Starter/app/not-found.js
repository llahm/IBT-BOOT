import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="container narrow state-card">
        <span className="eyebrow">404 · NOT FOUND</span>
        <h1>We couldn't find that page or dish.</h1>
        <p className="muted">Check the URL, or head back to the menu and choose an available dish.</p>
        <div className="hero-actions">
          <Link className="button" href="/menu">Browse menu</Link>
          <Link className="button button-secondary" href="/">Go home</Link>
        </div>
      </div>
    </section>
  );
}
