import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext(null);

// The cart lives here, one level above <BrowserRouter> in main.jsx.
// Routing only ever swaps out what <Outlet /> renders — this provider
// (and the state inside it) is never unmounted by a navigation, so the
// cart "survives navigation" for free. We also mirror it to
// localStorage so it survives a full page reload too.
const STORAGE_KEY = "addis-eats-cart";

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialItems);

  // Single helper every mutation goes through: resolves an updater
  // function (or plain value) against the current items, writes the
  // result to state, and mirrors it to localStorage.
  function persistUpdate(updater) {
    setItems((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage can fail (private browsing, quota) — the cart
        // still works for the rest of the session via React state.
      }
      return next;
    });
  }

  function addItem(dish) {
    persistUpdate((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...dish, qty: 1 }];
    });
  }

  function removeItem(id) {
    persistUpdate((current) => current.filter((item) => item.id !== id));
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    persistUpdate((current) =>
      current.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    persistUpdate([]);
  }

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    return { items, count, total, addItem, removeItem, updateQty, clearCart };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return ctx;
}
