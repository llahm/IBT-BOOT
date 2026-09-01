function RestaurantCard({
  name,
  category,
  rating,
  deliveryTime,
  image,
}) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-image">
        <img
          src={image}
          alt={name}
        />

        <span className="rating">
          ⭐ {rating}
        </span>
      </div>

      <div className="restaurant-info">
        <h3>{name}</h3>

        <p className="restaurant-category">
          {category}
        </p>

        <div className="restaurant-meta">
          <span>
            🕐 {deliveryTime}
          </span>

          <span>
            🚚 Free delivery
          </span>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;