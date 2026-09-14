import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { count } = useCart();
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
