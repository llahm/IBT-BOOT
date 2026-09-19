import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/clubs", label: "Clubs" },
  { to: "/events", label: "Events" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { count } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">CC</span>
          Campus<span>Connect</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <Link to="/favorites" className="favorites-btn">
            ★ Favorites
            {count > 0 && <span className="favorites-count">{count}</span>}
          </Link>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
