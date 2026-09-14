import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";
import { fetchDishes } from "../api/dishes";

const CATEGORIES = [
  "All",
  "Ethiopian",
  "Pizza",
  "Burger",
  "Chicken",
  "Coffee",
  "Drinks",
];

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const searchInputRef = useRef(null);
  const hasAutoFocused = useRef(false);

  // Refetches whenever `category` (or a manual retry) changes, because
  // both are in the dependency array.
  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchDishes(category, {
          signal: controller.signal,
        });
        setDishes(result);
        setStatus("success");
      } catch (err) {
        // The category changed (or we unmounted) before this request
        // finished and it got aborted below — that's not a real error,
        // just an in-flight request that's no longer wanted.
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      }
    }

    loadDishes();

    // Cleanup: cancel this request if `category` changes again (or the
    // component unmounts) before it resolves, so a slow, stale
    // response can never overwrite a newer one.
    return () => controller.abort();
  }, [category, retryToken]);

  // Auto-focus the search field once the first successful load puts it
  // on screen. Tied to `status` (not an empty-deps mount effect)
  // because the input doesn't exist in the DOM during the loading/error
  // early returns below, so a mount-only effect would find an empty ref.
  useEffect(() => {
    if (status === "success" && !hasAutoFocused.current) {
      searchInputRef.current?.focus();
      hasAutoFocused.current = true;
    }
  }, [status]);

  function handleAddToOrder(price) {
    setOrderTotal((total) => total + price);
  }

  if (status === "loading") {
    return (
      <section className="food-section">
        <div className="container">
          <p className="menu-status">Loading the {category} menu…</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="food-section">
        <div className="container">
          <p className="menu-status menu-status-error">
            Couldn&apos;t load the menu: {error}
          </p>
          <button
            type="button"
            className="view-all"
            onClick={() => setRetryToken((token) => token + 1)}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  const visibleDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
      <section className="categories-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>
              <h2>What are you craving?</h2>
            </div>
          </div>

          <CategoryBar
            categories={CATEGORIES}
            selected={category}
            onSelect={setCategory}
          />
        </div>
      </section>

      <section className="food-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">POPULAR</span>
              <h2>Popular dishes</h2>
            </div>

            <div className="order-total">
              Order total: <strong>{orderTotal} ETB</strong>
            </div>
          </div>

          <input
            ref={searchInputRef}
            type="search"
            className="menu-search"
            placeholder="Search dishes…"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search dishes"
          />

          <DishList dishes={visibleDishes} onAddToOrder={handleAddToOrder} />
        </div>
      </section>

      <DeliveryForm orderTotal={orderTotal} />
    </>
  );
}

export default Menu;
