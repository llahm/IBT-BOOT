import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

// currency has a default value so callers don't have to pass it every time
function Dish({
  name,
  price,
  category,
  description,
  image,
  spicy,
  currency = "ETB",
  onAdd,
}) {
  // Dish owns its own "how many of this have I added" count. The running
  // order total itself lives higher up (in Menu), so every time someone
  // taps Add we bump our local count *and* tell the parent via onAdd.
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((current) => current + 1);
    onAdd(price);
  }

  return (
    <Card className="food-card">
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;
