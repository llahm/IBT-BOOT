import { Link, Navigate, useNavigate } from "react-router-dom";
import DeliveryForm from "../Components/DeliveryForm";
import { useCartStore } from "../store/cartStore";

function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  );
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleOrderPlaced(formData) {
    const order = { items, total, ...formData };
    clearCart();
    navigate("/checkout/receipt", { state: order, replace: true });
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

        <DeliveryForm orderTotal={total} onOrderPlaced={handleOrderPlaced} />
      </div>
    </section>
  );
}

export default CheckoutPage;
