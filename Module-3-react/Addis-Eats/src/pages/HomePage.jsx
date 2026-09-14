import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import RestaurantCard from "../Components/RestaurantCard";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/restaurantList.json", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setRestaurants(data.restaurants ?? []))
      .catch((err) => {
        if (err.name !== "AbortError") setRestaurants([]);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Hero />

      <section className="restaurants-section" id="restaurants">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">TOP PICKS</span>
              <h2>Popular restaurants</h2>
            </div>

            <button
              type="button"
              className="view-all"
              onClick={() => navigate("/menu")}
            >
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

      <section className="cta-section">
        <div className="container">
          <div className="cta">
            <div>
              <span className="section-label">ADDIS-EATS</span>

              <h2>Hungry? We&apos;ve got you covered.</h2>

              <p>
                Order your favorite food from the best restaurants in
                Addis Ababa.
              </p>
            </div>

            <button
              type="button"
              className="cta-btn"
              onClick={() => navigate("/menu")}
            >
              Explore restaurants →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
