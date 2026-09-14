import PropTypes from "prop-types";
import Dish from "./Dish";

function DishList({ dishes, category, onAddToOrder }) {
  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (filteredDishes.length === 0) {
    return (
      <p className="empty-state">
        No {category} dishes yet — check back soon!
      </p>
    );
  }

  return (
    <div className="food-grid">
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          category={dish.category}
          description={dish.description}
          price={dish.price}
          image={dish.image}
          spicy={dish.spicy}
          onAdd={onAddToOrder}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
  onAddToOrder: PropTypes.func.isRequired,
};

export default DishList;
