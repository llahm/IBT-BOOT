"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../app/actions";
import { useCart } from "./CartProvider";

const initialState = { success: false, errors: {}, message: "" };
const areas = ["Bole", "Yeka", "Kirkos", "Arada", "Lideta", "Nifas Silk-Lafto", "Kolfe Keranio", "Gulele"];

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const { items, total, clearCart, hydrated } = useCart();

  useEffect(() => {
    if (state.success) clearCart();
  }, [state.success, clearCart]);

  if (state.success) return <div className="success-state" role="status"><span className="success-icon">✓</span><span className="eyebrow">ORDER RECEIVED</span><h2>Thanks for ordering!</h2><p>{state.message}</p><p className="success-note">This is a learning demo. No payment was taken and no order was saved to a database.</p><Link href="/menu" className="button button-primary">Back to the menu →</Link></div>;
  if (hydrated && !items.length) return <div className="empty-state checkout-empty"><span>🛍️</span><h2>Your cart is empty</h2><p>Add at least one dish before heading to checkout.</p><Link href="/menu" className="button button-primary">Explore the menu →</Link></div>;

  return <div className="checkout-grid"><form action={formAction} className="checkout-form"><div className="form-section-heading"><span>01</span><div><h2>Delivery details</h2><p>Where should we bring the good stuff?</p></div></div><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" placeholder="e.g. Almaz Bekele" required minLength={2} aria-invalid={Boolean(state.errors?.name)} aria-describedby={state.errors?.name ? "name-error" : undefined} />{state.errors?.name && <p className="field-error" id="name-error">{state.errors.name}</p>}<label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0912345678" required pattern="(09|07)[0-9]{8}" aria-invalid={Boolean(state.errors?.phone)} aria-describedby={state.errors?.phone ? "phone-error" : "phone-help"} /><small id="phone-help" className="field-help">Use a local Ethiopian mobile number (09xxxxxxxx or 07xxxxxxxx).</small>{state.errors?.phone && <p className="field-error" id="phone-error">{state.errors.phone}</p>}<label htmlFor="area">Delivery area</label><select id="area" name="area" defaultValue="" required aria-invalid={Boolean(state.errors?.area)} aria-describedby={state.errors?.area ? "area-error" : undefined}><option value="" disabled>Choose your sub-city</option>{areas.map((area) => <option key={area} value={area}>{area}</option>)}</select>{state.errors?.area && <p className="field-error" id="area-error">{state.errors.area}</p>}<p className="privacy-note">Your details are used only to demonstrate server-side form handling in this local project.</p>{state.message && <p className="form-error" role="alert">{state.message}</p>}<button className="button button-primary button-full" type="submit" disabled={pending}>{pending ? "Placing your demo order…" : "Place demo order · " + total + " ETB"}</button></form><aside className="order-summary"><span className="eyebrow">YOUR ORDER</span><h2>Order summary</h2><ul>{!hydrated ? <li><span>Preparing saved cart…</span><strong>—</strong></li> : items.map((item) => <li key={item.id}><span>{item.qty} × {item.name}</span><strong>{item.qty * item.price} ETB</strong></li>)}</ul><div className="summary-total"><span>Total</span><strong>{hydrated ? `${total} ETB` : "—"}</strong></div><p className="summary-disclaimer">Demo checkout only. No real payment is processed.</p><Link href="/cart" className="text-link">Edit cart ←</Link></aside></div>;
}
