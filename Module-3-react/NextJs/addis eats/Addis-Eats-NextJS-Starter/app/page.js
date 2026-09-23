import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">🍴 ADDIS ABABA'S FOOD DELIVERY</span>
          <h1>Delicious food,<br /><span>delivered to you.</span></h1>
          <p>Discover Ethiopian favorites and popular meals around Addis Ababa. Browse the menu and find your next favorite.</p>
          <div className="hero-actions">
            <Link className="button" href="/menu">Explore the menu</Link>
            <Link className="button button-secondary" href="/cart">View cart</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-emoji" aria-hidden="true">🍲</div>
          <p className="eyebrow">MADE FOR YOUR CRAVINGS</p>
          <h2>Local flavor.<br />Easy ordering.</h2>
          <p className="muted">A small Next.js routing exercise inspired by Addis Eats.</p>
        </div>
      </div>
    </section>
  );
}
