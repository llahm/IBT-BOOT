function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container footer-content">
        <div>
          <a href="#home" className="logo">
            Addis<span>-eats</span>
          </a>

          <p>
            Your food. Your city. Delivered.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>

            <a href="#restaurants">
              Restaurants
            </a>

            <a href="#home">
              Categories
            </a>
          </div>

          <div>
            <h4>Company</h4>

            <a href="#about">
              About us
            </a>

            <a href="#">
              Contact
            </a>
          </div>

          <div>
            <h4>Follow us</h4>

            <a href="#">
              Instagram
            </a>

            <a href="#">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © 2026 Addis-eats. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;