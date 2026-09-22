import { Link, Navigate } from "react-router-dom";
import DeliveryForm from "../Components/DeliveryForm";
import { useCartStore } from "../store/cartStore";

// This page's content only ever renders once RequireAuth (wrapping the
// /checkout route in App.jsx) has confirmed the person is signed in —
// that guard is still a Context (see context/AuthContext.jsx), which
// is exactly the kind of low-frequency, app-wide flag Context suits;
// the cart's higher-churn state is what moved to Zustand.
function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  );
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section className="food-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">CHECKOUT</span>
            <h2>Almost there</h2>
          </div>
        </div>

        <Link to="/cart" className="back-link">
          ← Back to cart
        </Link>

        <ul className="checkout-summary">
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.qty} × {item.name}
              </span>
              <span>
                {item.qty * item.price} {item.currency}
              </span>
            </li>
          ))}
        </ul>

        <DeliveryForm orderTotal={total} onOrderPlaced={clearCart} />
      </div>
    </section>
  );
}

export default CheckoutPage;
