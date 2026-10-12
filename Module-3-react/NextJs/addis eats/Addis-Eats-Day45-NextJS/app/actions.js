"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signSession, getSession, sessionCookieName } from "@/lib/session";
import { createOrder, updateOrderStatus } from "@/lib/orders";
import dishes from "@/lib/dishes";

function safeNext(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  try { const parsed = new URL(value, "http://localhost"); return parsed.origin === "http://localhost" ? `${parsed.pathname}${parsed.search}${parsed.hash}` : "/"; } catch { return "/"; }
}
export async function signInAction(_previous, formData) {
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNext(String(formData.get("next") || "/orders"));
  if (!/^\+?[0-9]{9,15}$/.test(phone) || password.length < 4) return { error: "Enter a valid phone number and a password of at least 4 characters." };
  // Course demo accounts; use a real identity provider/backend for production.
  const staff = phone.replace(/\D/g,"").endsWith("0000") || password === "staff123";
  const user = { id: staff ? "staff-demo" : `customer-${phone.replace(/\D/g,"")}`, name: staff ? "Kitchen Staff" : "Addis Eats Customer", phone, role: staff ? "staff" : "customer" };
  const store = await cookies();
  store.set(sessionCookieName, signSession(user), { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"lax", path:"/", maxAge:60*60*24*7 });
  redirect(next);
}
export async function signOutAction() {
  const store = await cookies(); store.delete(sessionCookieName); redirect("/");
}
export async function placeOrderAction(_previous, formData) {
  const user = await getSession();
  if (!user) return { error:"Please sign in before placing an order." };
  const name = String(formData.get("name")||"").trim();
  const phone = String(formData.get("phone")||"").trim();
  const address = String(formData.get("address")||"").trim();
  const rawItems = String(formData.get("items")||"");
  if (name.length < 2 || !/^\+?[0-9\s-]{9,16}$/.test(phone) || address.length < 5) return { error:"Please provide a name, valid phone number, and delivery address." };
  let requested;
  try { requested = JSON.parse(rawItems); } catch { return { error:"Your cart could not be read. Please refresh and try again." }; }
  if (!Array.isArray(requested) || requested.length < 1 || requested.length > 30) return { error:"Your cart is empty or invalid." };
  const items = [];
  for (const item of requested) {
    const dish = dishes.find((d) => d.id === Number(item.id));
    const quantity = Number(item.quantity);
    if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return { error:"An item in your cart is invalid." };
    items.push({ id:dish.id, name:dish.name, price:dish.price, quantity, image:dish.image });
  }
  const order = createOrder({ user, items, customer:{ name, phone, address } });
  redirect(`/orders/${encodeURIComponent(order.id)}`);
}
export async function updateOrderStatusAction(orderId, status) {
  const user = await getSession();
  if (!user || user.role !== "staff") return { error:"Only staff can update order status." };
  const allowed = ["Received","Preparing","Ready","Out for delivery","Delivered","Cancelled"];
  if (!allowed.includes(status)) return { error:"Invalid status." };
  if (!updateOrderStatus(orderId,status)) return { error:"Order not found." };
  return { success:true };
}
