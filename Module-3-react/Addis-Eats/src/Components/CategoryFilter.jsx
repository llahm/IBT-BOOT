function CategoryFilter() {
  const categories = [
    "All",
    "Ethiopian",
    "Pizza",
    "Burger",
    "Chicken",
    "Coffee",
    "Drinks",
  ];

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
                category === "All" ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryFilter;