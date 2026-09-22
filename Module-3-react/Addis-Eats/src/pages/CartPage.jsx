import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

// Nothing here is fetched or reset on mount — `items` comes straight
// from the Zustand cart store, which lives outside the router entirely
// (no provider needed at all), so whatever was added back on /menu or
// a /menu/:id page is still here — and still here after a refresh,
// thanks to the store's persist middleware.
function CartPage() {
  // Four separate, narrow selectors rather than one destructure off a
  // single hook. `items` and `total` each only cause a re-render when
  // their own value actually changes; `updateQty`/`removeItem` are
  // stable function references that never do.
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  );
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <section className="food-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">YOUR ORDER</span>
            <h2>Cart</h2>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart cart-page">
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious food to get started.</p>
              <Link to="/menu" className="view-all">
                Browse the menu →
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart cart-page">
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <Link to={`/menu/${item.id}`}>{item.name}</Link>
                    <span>
                      {item.price} {item.currency}
                    </span>
                  </div>

                  <div className="cart-item-qty">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>{total} ETB</strong>
              </div>

              <Link to="/checkout" className="checkout-btn checkout-link">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
