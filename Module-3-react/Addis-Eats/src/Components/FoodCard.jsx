function FoodCard({
  name,
  category,
  description,
  price,
  image,
}) {
  return (
    <article className="food-card">
      <img
        src={image}
        alt={name}
      />

      <div className="food-info">
        <span className="food-category">
          {category}
        </span>

        <h3>{name}</h3>

        <p>{description}</p>

        <div className="food-bottom">
          <strong>
            {price} ETB
          </strong>

          <button className="add-btn">
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;