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
}) {
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

          <button className="add-btn">+</button>
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
};

export default Dish;
