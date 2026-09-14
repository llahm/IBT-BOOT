import PropTypes from "prop-types";
import Dish from "./Dish";

// By the time DishList gets `dishes`, category filtering has already
// happened in the fetch (Menu -> fetchDishes) and search filtering has
// already happened in Menu too — this component just renders the list
// it's handed, plus the empty state when that list is empty.
function DishList({ dishes, onAddToOrder }) {
  if (dishes.length === 0) {
    return (
      <p className="empty-state">
        No dishes match — try a different search or category.
      </p>
    );
  }

  return (
    <div className="food-grid">
      {dishes.map((dish) => (
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
  onAddToOrder: PropTypes.func.isRequired,
};

export default DishList;
