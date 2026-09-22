import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../context/AuthContext";

function Header() {
  // Narrow selector: computed inline from `items` each time the store
  // changes, but Zustand compares the *returned* number with Object.is,
  // so Header only actually re-renders when the count itself changes —
  // not on every cart update (e.g. a quantity edit that leaves the
  // total item count the same won't re-render this component).
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0)
  );
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleAuthClick() {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Addis<span>-eats</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <a href="#about">About</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="login-btn" onClick={handleAuthClick}>
            {isAuthenticated ? `Log out (${user.name})` : "Log in"}
          </button>

          <Link to="/cart" className="cart-btn">
            🛒
            <span className="cart-count">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
