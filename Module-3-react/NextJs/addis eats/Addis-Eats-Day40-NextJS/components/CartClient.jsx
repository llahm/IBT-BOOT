"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartClient() {
  const { items, total, updateQty, removeItem, hydrated } = useCart();
  if (!hydrated) return <div className="cart-loading" aria-live="polite">Loading your saved cart…</div>;
  if (!items.length) return <div className="empty-state cart-empty-state"><span>🛒</span><h2>Your cart is taking a little nap.</h2><p>Add something delicious and it’ll show up here.</p><Link className="button button-primary" href="/menu">Browse the menu <span aria-hidden="true">→</span></Link></div>;
  return <div className="cart-panel"><ul className="cart-list">{items.map((item) => <li className="cart-row" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-copy"><Link href={`/menu/${item.id}`}>{item.name}</Link><span>{item.price} ETB each</span><button className="remove-link" type="button" onClick={() => removeItem(item.id)}>Remove</button></div><div className="quantity-control"><button type="button" onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.qty}</span><button type="button" onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div><strong className="cart-line-total">{item.price * item.qty} ETB</strong></li>)}</ul><div className="cart-summary"><div><span>Subtotal</span><strong>{total} ETB</strong></div><p>Delivery fees, if any, are not included in this learning demo.</p><Link className="button button-primary button-full" href="/checkout">Continue to checkout <span aria-hidden="true">→</span></Link></div></div>;
}
