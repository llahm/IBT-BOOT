"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ dish, compact = false }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  function handleAdd() {
    addItem(dish);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }
  return <button type="button" className={`button button-primary add-button ${compact ? "add-button-compact" : ""}`} onClick={handleAdd} aria-label={`Add ${dish.name} to cart`}>{added ? "Added ✓" : compact ? "+ Add" : "Add to cart +"}</button>;
}
