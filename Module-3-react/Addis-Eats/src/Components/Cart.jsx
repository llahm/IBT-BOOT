function Cart() {
  return (
    <aside className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>

        <span className="cart-count">
          0
        </span>
      </div>

      <div className="cart-empty">
        <div className="cart-empty-icon">
          🛒
        </div>

        <h3>Your cart is empty</h3>

        <p>
          Add some delicious food to get started.
        </p>
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>0 ETB</strong>
        </div>

        <button className="checkout-btn" disabled>
          Checkout
        </button>
      </div>
    </aside>
  );
}

export default Cart;