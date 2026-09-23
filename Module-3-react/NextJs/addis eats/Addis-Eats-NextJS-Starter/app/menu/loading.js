export default function MenuLoading() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="eyebrow">PLEASE WAIT</p>
        <h1>Loading the menu…</h1>
        <p className="muted">Fetching today's dishes. This pause is intentional for the routing exercise.</p>
        <div className="skeleton-grid" aria-label="Loading dishes">
          <div className="skeleton-card" /><div className="skeleton-card" /><div className="skeleton-card" />
        </div>
      </div>
    </section>
  );
}
