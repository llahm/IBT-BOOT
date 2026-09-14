import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useCart } from "../context/CartContext";

// currency has a default value so callers don't have to pass it every time
function Dish({
  id,
  name,
  price,
  category,
  description,
  image,
  spicy,
  currency = "ETB",
}) {
  const { addItem } = useCart();

  // Dish owns its own "how many of this have I added" count, just for
  // the little badge next to the + button. The cart's real quantity
  // lives in CartContext, which is what actually survives navigation.
  const [count, setCount] = useState(0);

  function handleAdd(event) {
    // The whole card links to the detail page — stop the click from
    // also triggering that navigation when someone just wants to add.
    event.preventDefault();
    event.stopPropagation();
    setCount((current) => current + 1);
    addItem({ id, name, price, image, currency });
  }

  return (
    <Card className="food-card">
      <Link to={`/menu/${id}`} className="food-card-link">
        <img src={image} alt={name} />

        <div className="food-info">
          <span className="food-category">{category}</span>

          <h3>
            {name}
            {/* Guard with === true so a non-boolean "spicy" value (e.g. a
                stray 0 or empty string from bad data) can never sneak a
                stray value into the DOM the way `spicy && <Badge />` could. */}
            {spicy === true && <span className="spicy-badge">🌶️ Spicy</span>}
          </h3>

          <p>{description}</p>
        </div>
      </Link>

      <div className="food-info food-info-footer">
        <div className="food-bottom">
          <strong>
            {price} {currency}
          </strong>

          <div className="food-add">
            {count > 0 && <span className="dish-count">{count}</span>}
            <button type="button" className="add-btn" onClick={handleAdd}>
              +
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;
