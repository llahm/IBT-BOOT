import PropTypes from "prop-types";

// Renders category chips from an array and highlights whichever one
// matches `selected`. Doesn't own any state itself — Menu passes down
// the current category and how to change it.
function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-btn ${
            category === selected ? "active" : ""
          }`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryBar;
