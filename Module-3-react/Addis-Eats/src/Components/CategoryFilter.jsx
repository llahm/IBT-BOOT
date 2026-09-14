import PropTypes from "prop-types";

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">
              EXPLORE
            </span>

            <h2>
              What are you craving?
            </h2>
          </div>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                category === selected ? "active" : ""
              }`}
              onClick={() => onSelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;
