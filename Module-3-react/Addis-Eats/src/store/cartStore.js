import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

// The cart used to live in CartContext (a React Context + useState).
// That meant every consumer subscribed to the *whole* context value, so
// adding a dish re-rendered the header, every dish card, and the cart
// page all at once, whether or not that component cared about the
// thing that changed.
//
// As a Zustand store, there's no <CartProvider> to wrap the app in —
// any component can call useCartStore directly. And because each
// consumer selects only the slice it needs (see the narrow selectors
// in Header.jsx, Dish.jsx, CartPage.jsx, etc.), a component that only
// reads the cart *count* doesn't re-render when an item's quantity
// changes but the count doesn't, and a component that only reads
// *items* doesn't re-render for changes that don't touch the array.
export const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (dish) =>
          set(
            (state) => {
              const existing = state.items.find((item) => item.id === dish.id);
              if (existing) {
                return {
                  items: state.items.map((item) =>
                    item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
                  ),
                };
              }
              return { items: [...state.items, { ...dish, qty: 1 }] };
            },
            false,
            "cart/addItem"
          ),

        removeItem: (id) =>
          set(
            (state) => ({ items: state.items.filter((item) => item.id !== id) }),
            false,
            "cart/removeItem"
          ),

        updateQty: (id, qty) => {
          if (qty <= 0) {
            get().removeItem(id);
            return;
          }
          set(
            (state) => ({
              items: state.items.map((item) =>
                item.id === id ? { ...item, qty } : item
              ),
            }),
            false,
            "cart/updateQty"
          );
        },

        clearCart: () => set({ items: [] }, false, "cart/clearCart"),
      }),
      {
        // localStorage key — persist middleware handles the read on
        // load and the write on every change, so the cart survives a
        // refresh without any manual localStorage code in the store.
        name: "addis-eats-cart",
        storage: createJSONStorage(() => localStorage),
        // Only persist the data, not the action functions.
        partialize: (state) => ({ items: state.items }),
      }
    ),
    { name: "AddisEatsCartStore" }
  )
);
