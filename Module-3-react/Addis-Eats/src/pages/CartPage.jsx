import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Nothing here is fetched or reset on mount — `items` comes straight
// from CartContext, which lives above the router (see main.jsx), so
// whatever was added back on /menu or a /menu/:id page is still here.
function CartPage() {
  const { items, total, updateQty, removeItem } = useCart();

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
