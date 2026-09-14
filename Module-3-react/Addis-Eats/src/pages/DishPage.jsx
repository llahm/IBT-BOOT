import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchDishById } from "../api/dishes";
import { useCart } from "../context/CartContext";

function DishPage() {
  // Route is "menu/:id" (see App.jsx) — useParams reads whatever
  // segment the person navigated to, e.g. /menu/3 -> { id: "3" }.
  const { id } = useParams();
  const { addItem } = useCart();

  const [dish, setDish] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDish() {
      setStatus("loading");
      setError(null);
      setAdded(false);

      try {
        const result = await fetchDishById(id, { signal: controller.signal });
        setDish(result);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      }
    }

    loadDish();

    // Re-run whenever `id` changes (e.g. navigating from one dish
    // page straight to another), aborting any in-flight request for
    // the previous dish so it can't overwrite the new one.
    return () => controller.abort();
  }, [id]);

  if (status === "loading") {
    return (
      <section className="food-section">
        <div className="container">
          <p className="menu-status">Loading dish…</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="food-section">
        <div className="container">
          <p className="menu-status menu-status-error">
            Couldn&apos;t load this dish: {error}
          </p>
          <Link to="/menu" className="view-all">
            ← Back to menu
          </Link>
        </div>
      </section>
    );
  }

  function handleAdd() {
    addItem({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      currency: "ETB",
    });
    setAdded(true);
  }

  return (
    <section className="food-section dish-page">
      <div className="container">
        <Link to="/menu" className="back-link">
          ← Back to menu
        </Link>

        <div className="dish-detail">
          <img src={dish.image} alt={dish.name} className="dish-detail-image" />

          <div className="dish-detail-info">
            <span className="food-category">{dish.category}</span>

            <h2>
              {dish.name}
              {dish.spicy === true && (
                <span className="spicy-badge">🌶️ Spicy</span>
              )}
            </h2>

            <p>{dish.description}</p>

            <strong className="dish-detail-price">
              {dish.price} ETB
            </strong>

            <button type="button" className="checkout-btn" onClick={handleAdd}>
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DishPage;
