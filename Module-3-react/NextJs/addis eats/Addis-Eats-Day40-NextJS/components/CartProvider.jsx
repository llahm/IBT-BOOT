"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter((item) => item && Number.isInteger(item.id) && Number.isInteger(item.qty) && item.qty > 0));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((dish) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) return current.map((item) => item.id === dish.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { id: dish.id, name: dish.name, price: dish.price, image: dish.image, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((current) => qty < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, qty: Math.min(qty, 99) } : item));
  }, []);

  const removeItem = useCallback((id) => { setItems((current) => current.filter((item) => item.id !== id)); }, []);
  const clearCart = useCallback(() => { setItems((current) => current.length ? [] : current); }, []);

  const value = useMemo(() => ({ items, addItem, updateQty, removeItem, clearCart, hydrated, count: items.reduce((sum, item) => sum + item.qty, 0), total: items.reduce((sum, item) => sum + item.price * item.qty, 0) }), [items, hydrated, addItem, updateQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
