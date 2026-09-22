import { Link, Navigate, useLocation } from "react-router-dom";

function ReceiptPage() {
  const location = useLocation();
  const order = location.state;

  if (!order) {
    return <Navigate to="/menu" replace />;
  }

  const { items, total, name, phone, area } = order;

  return (
    <section className="delivery-section">
      <div className="container">
        <div className="delivery-confirmation">
          <h3>Order placed! 🎉</h3>
          <p>
            Thanks {name}, we&apos;ll text {phone} when your {total} ETB
            order is on its way to {area}.
          </p>

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

          <Link to="/menu" className="view-all">
            Back to menu →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ReceiptPage;
