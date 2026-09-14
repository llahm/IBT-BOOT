import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantCard from "./components/RestaurantCard";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

async function getDishes() {
  const res = await Promise.all(fetch("/DishList.json"));
  if(!res.ok){
    
  }
}

function App() {
  const restaurants = [];

  const dishes = [];

  return (
    <div className="app">
      <Header />

      <main>
        <Hero />

        <CategoryFilter />

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
              {dishes.map((dish) => (
                <FoodCard
                  key={dish.id}
                  name={dish.name}
                  category={dish.category}
                  description={dish.description}
                  price={dish.price}
                  image={dish.image}
                />
              ))}
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