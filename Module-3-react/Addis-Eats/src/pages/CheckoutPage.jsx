import { Link, Navigate } from "react-router-dom";
import DeliveryForm from "../Components/DeliveryForm";
import { useCart } from "../context/CartContext";

// This page's content only ever renders once RequireAuth (wrapping the
// /checkout route in App.jsx) has confirmed the person is signed in.
function CheckoutPage() {
  const { items, total, clearCart } = useCart();

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
