import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <span>© {new Date().getFullYear()} CampusConnect — Student Community Portal</span>

        <nav className="footer-links">
          <Link to="/clubs">Clubs</Link>
          <Link to="/events">Events</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
