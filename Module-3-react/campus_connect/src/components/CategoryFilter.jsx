import PropTypes from "prop-types";

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-bar" role="group" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-btn ${category === selected ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;
