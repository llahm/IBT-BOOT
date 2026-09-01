import SearchBar from "./SearchBar";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-label">
            🍴 Addis Ababa's food delivery
          </span>

          <h1>
            Delicious food,
            <br />
            <span>delivered to you.</span>
          </h1>

          <p>
            Discover the best restaurants and meals around
            Addis Ababa and get your favorites delivered
            right to your door.
          </p>

          <SearchBar />
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
            alt="Delicious Ethiopian food"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;