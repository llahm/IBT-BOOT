import { memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./Card";
import Modal from "./Modal";
import { useCartStore } from "../store/cartStore";

function Dish({
  id,
  name,
  price,
  category,
  description,
  image,
  spicy,
  currency = "ETB",
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();
    setCount((current) => current + 1);
    addItem({ id, name, price, image, currency });
  }

  function openQuickView(event) {
    event.preventDefault();
    event.stopPropagation();
    setShowModal(true);
  }

  return (
    <Card className="food-card">
      <Link to={`/menu/${id}`} className="food-card-link">
        <img src={image} alt={name} />

        <div className="food-info">
          <span className="food-category">{category}</span>

          <h3>
            {name}
            {spicy === true && <span className="spicy-badge">🌶️ Spicy</span>}
          </h3>

          <p>{description}</p>
        </div>
      </Link>

      <div className="food-info food-info-footer">
        <div className="food-bottom">
          <strong>
            {price} {currency}
          </strong>

          <div className="food-add">
            <button type="button" className="quickview-btn" onClick={openQuickView}>
              👁
            </button>
            {count > 0 && <span className="dish-count">{count}</span>}
            <button type="button" className="add-btn" onClick={handleAdd}>
              +
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img src={image} alt={name} className="modal-dish-image" />
          <div className="modal-dish-info">
            <span className="food-category">{category}</span>
            <h3>
              {name}
              {spicy === true && <span className="spicy-badge">🌶️ Spicy</span>}
            </h3>
            <p>{description}</p>
            <strong>
              {price} {currency}
            </strong>
            <button
              type="button"
              className="checkout-btn"
              onClick={(event) => {
                handleAdd(event);
                setShowModal(false);
              }}
            >
              Add to cart
            </button>
          </div>
        </Modal>
      )}
    </Card>
  );
}

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default memo(Dish);
