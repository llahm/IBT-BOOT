import Link from "next/link";

export default function CheckoutPage() {
  return (
    <section className="page-section">
      <div className="container narrow">
        <span className="eyebrow">ALMOST THERE</span>
        <h1>Checkout</h1>
        <div className="checkout-panel">
          <p>This is a routing starter, so payment processing and order submission are not connected yet.</p>
          <p className="muted">In a later step, add delivery details, form validation, and a checkout handler.</p>
          <div className="hero-actions">
            <Link className="button" href="/cart">Review cart</Link>
            <Link className="button button-secondary" href="/menu">Back to menu</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
