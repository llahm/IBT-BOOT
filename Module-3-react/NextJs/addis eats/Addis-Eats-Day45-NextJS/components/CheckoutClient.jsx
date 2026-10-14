"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { placeOrderAction } from "@/app/actions";
import { useActionState } from "react";
export default function CheckoutClient() {
 const [ready,setReady]=useState(false); const [items,setItems]=useState([]);
 useEffect(()=>{try{const raw=localStorage.getItem("addis-eats-cart");setItems(raw?JSON.parse(raw):[])}catch{setItems([])}setReady(true)},[]);
 const [state,action,pending]=useActionState(placeOrderAction,{error:""});
 const total=items.reduce((sum,i)=>sum+Number(i.price||0)*Number(i.qty||0),0);
 if(!ready) return <div className="cart-loading">Preparing your checkout…</div>;
 if(!items.length) return <div className="success-state checkout-empty"><div className="success-icon">⌑</div><h2>Your cart is empty</h2><p>Add a few dishes before checking out.</p><Link className="button button-primary" href="/menu">Browse menu</Link></div>;
 return <div className="checkout-grid"><form action={action} className="checkout-form"><div className="form-section-heading"><span>01</span><div><h2>Delivery details</h2><p>Where should we bring your order?</p></div></div>
 <label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" required minLength={2} placeholder="Your name"/>
 <label htmlFor="phone">Phone number</label><input id="phone" name="phone" autoComplete="tel" required placeholder="+251 9…"/>
 <label htmlFor="address">Delivery address</label><input id="address" name="address" autoComplete="street-address" required minLength={5} placeholder="Street, area, landmark"/>
 <input type="hidden" name="items" value={JSON.stringify(items.map(({id,qty})=>({id,quantity:qty})))}/>
 {state?.error&&<p role="alert" className="form-error">{state.error}</p>}<p className="privacy-note">Demo checkout only. No payment is collected. Orders are kept in server memory and reset when the server restarts.</p><button className="button button-primary button-full" disabled={pending}>{pending?"Placing order…":`Place order · ${total.toLocaleString()} ETB`}</button></form>
 <aside className="order-summary"><span className="eyebrow">YOUR ORDER</span><h2>Order summary</h2><ul>{items.map(i=><li key={i.id}><span>{i.qty} × {i.name}</span><strong>{(i.price*i.qty).toLocaleString()} ETB</strong></li>)}</ul><div className="summary-total"><span>Total</span><strong>{total.toLocaleString()} ETB</strong></div><p className="summary-disclaimer">Delivery fee is not included in this demo.</p><Link href="/cart" className="text-link">Edit cart →</Link></aside></div>;
}
