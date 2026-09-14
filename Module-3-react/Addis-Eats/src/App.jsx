import "./App.css";

import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Menu from "./Components/Menu";
import RestaurantCard from "./Components/RestaurantCard";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";

function App() {
  const restaurants = [];

  return (
    <div className="app">
      <Header />

      <main>
        <Hero />

        <section
          className="restaurants-section"
          id="restaurants"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">
                  TOP PICKS
                </span>

                <h2>
                  Popular restaurants
                </h2>
              </div>

              <button className="view-all">
                View all →
              </button>
            </div>

            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  name={restaurant.name}
                  category={restaurant.category}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                  image={restaurant.image}
                />
              ))}
            </div>
          </div>
        </section>

        <Menu />

        <section className="cta-section">
          <div className="container">
            <div className="cta">
              <div>
                <span className="section-label">
                  ADDIS-EATS
                </span>

                <h2>
                  Hungry? We've got you covered.
                </h2>

                <p>
                  Order your favorite food from the
                  best restaurants in Addis Ababa.
                </p>
              </div>

              <button className="cta-btn">
                Explore restaurants →
              </button>
            </div>
          </div>
        </section>

        <Cart />
      </main>

      <Footer />
    </div>
  );
}

export default App;
