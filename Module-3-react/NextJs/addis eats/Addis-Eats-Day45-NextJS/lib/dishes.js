const dishes = [
  { id: 1, name: "Beyayinet", category: "traditional", categoryLabel: "Ethiopian", description: "A colorful combination of traditional Ethiopian stews served together with injera.", price: 350, spicy: true, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Classic Pizza", category: "pizza", categoryLabel: "Pizza", description: "Freshly baked pizza with a golden crust, rich tomato sauce, and delicious toppings.", price: 450, spicy: false, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Classic Burger", category: "fast-food", categoryLabel: "Burger", description: "A juicy beef patty with crisp vegetables, melted cheese, and our house sauce.", price: 420, spicy: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Kitfo", category: "traditional", categoryLabel: "Ethiopian", description: "A much-loved Ethiopian classic, seasoned with aromatic mitmita and niter kibbeh.", price: 350, spicy: true, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Doro Wot", category: "traditional", categoryLabel: "Ethiopian", description: "Slow-cooked chicken stew with berbere spices, served with a comforting side of injera.", price: 400, spicy: true, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Shiro", category: "vegetarian", categoryLabel: "Vegetarian", description: "A smooth, warming chickpea stew infused with Ethiopian spices and served with injera.", price: 250, spicy: false, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Chechebsa", category: "traditional", categoryLabel: "Ethiopian", description: "Torn flatbread tossed with spiced butter and berbere for a hearty Ethiopian breakfast.", price: 220, spicy: false, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Garden Wrap", category: "vegetarian", categoryLabel: "Vegetarian", description: "A fresh wrap filled with crunchy vegetables, herbs, and a creamy house dressing.", price: 280, spicy: false, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85" },
  { id: 9, name: "Crispy Chicken", category: "fast-food", categoryLabel: "Fast food", description: "Golden, crunchy chicken with a tender center and a side of dipping sauce.", price: 390, spicy: true, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85" },
];

const restaurants = [
  { id: 1, name: "Habesha Restaurant", category: "Ethiopian classics", rating: 4.8, deliveryTime: "25–35 min", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Addis Pizza", category: "Pizza & sides", rating: 4.6, deliveryTime: "20–30 min", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Burger House", category: "Burgers & more", rating: 4.7, deliveryTime: "15–25 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
];

export async function getDishes({ slow = false, fail = false } = {}) {
  if (fail) throw new Error("Intentional test error: failed to load dishes.");
  if (slow) await new Promise((resolve) => setTimeout(resolve, 2500));
  return dishes;
}

export async function getDishById(id) {
  return dishes.find((dish) => dish.id === Number(id));
}

export async function getRestaurants() {
  return restaurants;
}

export default dishes;
