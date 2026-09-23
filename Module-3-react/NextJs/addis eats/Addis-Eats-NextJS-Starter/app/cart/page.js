import Link from "next/link";

export default function CartPage() {
  return (
    <section className="page-section">
      <div className="container narrow">
        <span className="eyebrow">YOUR ORDER</span>
        <h1>Your cart</h1>
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">🛒</div>
          <h2>Your cart is empty</h2>
          <p className="muted">This starter focuses on file-based routing. Cart state can be added as a later exercise.</p>
          <Link className="button" href="/menu">Browse the menu</Link>
        </div>
      </div>
    </section>
  );
}
