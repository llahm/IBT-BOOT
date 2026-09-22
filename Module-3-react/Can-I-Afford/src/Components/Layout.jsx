import { Link, NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="page">
      <header className="site-header">
        <Link to="/" className="wordmark">
          Can I Afford
        </Link>

        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Cost-of-living numbers are estimates. Always check current rates before you sign a lease.</p>
      </footer>
    </div>
  );
}

export default Layout;
