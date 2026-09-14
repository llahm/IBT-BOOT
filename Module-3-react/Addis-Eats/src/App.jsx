import { useEffect, useState } from "react";
import "./App.css";

import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Menu from "./Components/Menu";
import RestaurantCard from "./Components/RestaurantCard";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";

async function getDishes() {
  const res = await fetch("/dishList.json");
  if (!res.ok) {
    throw new Error(`Failed to load dishes: ${res.status}`);
  }
  const data = await res.json();
  return data.dishes ?? [];
}

function App() {
  const restaurants = [];

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getDishes()
      .then(setDishes)
      .catch((err) => console.error(err));
  }, []);

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

        <Menu dishes={dishes} />

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
