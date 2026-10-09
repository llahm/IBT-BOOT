import dishes, { getDishById } from "./dishes";
export async function getDishes({ slow = false, fail = false } = {}) {
  if (fail) throw new Error("Failed to load menu data (intentional error-boundary test).");
  if (slow) await new Promise((resolve) => setTimeout(resolve, 2500));
  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/dishes`, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("Unable to load menu from API");
    return response.json();
  }
  return dishes;
}
export async function getDish(id) {
  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/dishes/${encodeURIComponent(id)}`, { next: { revalidate: 300 } });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load dish");
    return response.json();
  }
  return getDishById(id);
}
