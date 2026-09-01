import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantCard from "./components/RestaurantCard";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  const restaurants = [
    {
      id: 1,
      name: "Habesha Restaurant",
      category: "Ethiopian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    },
    {
      id: 2,
      name: "Addis Pizza",
      category: "Pizza",
      rating: 4.6,
      deliveryTime: "20-30 min",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
    },
    {
      id: 3,
      name: "Burger House",
      category: "Burger",
      rating: 4.7,
      deliveryTime: "15-25 min",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
  ];

  const dishes = [
    {
      id: 1,
      name: "Beyayinet",
      category: "Ethiopian",
      description:
        "A delicious combination of traditional Ethiopian dishes.",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    },
    {
      id: 2,
      name: "Classic Pizza",
      category: "Pizza",
      description:
        "Freshly baked pizza with delicious toppings.",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
    },
    {
      id: 3,
      name: "Classic Burger",
      category: "Burger",
      description:
        "Juicy beef burger with fresh vegetables and sauce.",
      price: 420,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
  ];

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