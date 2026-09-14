import { useEffect, useState } from "react";
import "./App.css";

import Header from "./Components/Header";
import Hero from "./Components/Hero";
import CategoryFilter from "./Components/CategoryFilter";
import RestaurantCard from "./Components/RestaurantCard";
import Dish from "./Components/Dish";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";

const CATEGORIES = [
  "All",
  "Ethiopian",
  "Pizza",
  "Burger",
  "Chicken",
  "Coffee",
  "Drinks",
];

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
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getDishes()
      .then(setDishes)
      .catch((err) => console.error(err));
  }, []);

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="app">
      <Header />

      <main>
        <Hero />

        <CategoryFilter
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

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

        <section className="food-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">
                  POPULAR
                </span>

                <h2>
                  Popular dishes
                </h2>
              </div>

              <button className="view-all">
                View all →
              </button>
            </div>

            <div className="food-grid">
              {filteredDishes.length === 0 ? (
                <p className="empty-state">
                  No {selectedCategory} dishes yet — check back soon!
                </p>
              ) : (
                filteredDishes.map((dish) => (
                  <Dish
                    key={dish.id}
                    name={dish.name}
                    category={dish.category}
                    description={dish.description}
                    price={dish.price}
                    image={dish.image}
                    spicy={dish.spicy}
                  />
                ))
              )}
            </div>
          </div>
        </section>

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
