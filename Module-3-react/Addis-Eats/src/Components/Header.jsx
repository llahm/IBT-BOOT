function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <a href="#home" className="logo">
          Addis<span>-eats</span>
        </a>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#restaurants">Restaurants</a>
          <a href="#about">About</a>
        </nav>

        <div className="header-actions">
          <button className="login-btn">
            Log in
          </button>

          <button className="cart-btn">
            🛒
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;