import { useState } from "react";
import PropTypes from "prop-types";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";

const CATEGORIES = [
  "All",
  "Ethiopian",
  "Pizza",
  "Burger",
  "Chicken",
  "Coffee",
  "Drinks",
];

function Menu({ dishes }) {
  // Category state lives here (not in CategoryBar or DishList) because
  // both children need it: CategoryBar to highlight the active chip,
  // DishList to filter the dishes it renders.
  const [category, setCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);

  function handleAddToOrder(price) {
    setOrderTotal((total) => total + price);
  }

  return (
    <>
      <section className="categories-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>
              <h2>What are you craving?</h2>
            </div>
          </div>

          <CategoryBar
            categories={CATEGORIES}
            selected={category}
            onSelect={setCategory}
          />
        </div>
      </section>

      <section className="food-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">POPULAR</span>
              <h2>Popular dishes</h2>
            </div>

            <div className="order-total">
              Order total: <strong>{orderTotal} ETB</strong>
            </div>
          </div>

          <DishList
            dishes={dishes}
            category={category}
            onAddToOrder={handleAddToOrder}
          />
        </div>
      </section>

      <DeliveryForm orderTotal={orderTotal} />
    </>
  );
}

Menu.propTypes = {
  dishes: PropTypes.array.isRequired,
};

export default Menu;
