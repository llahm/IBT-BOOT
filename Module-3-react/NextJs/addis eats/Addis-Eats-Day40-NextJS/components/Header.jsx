"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count } = useCart();
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="Addis Eats home"><span className="brand-mark">a<span>.</span></span><span>Addis<span className="brand-accent">-eats</span><small>GOOD FOOD, GOOD MOOD</small></span></Link><nav className="main-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/menu">Menu</Link><Link href="/#restaurants">Our picks</Link></nav><div className="header-actions"><Link className="cart-nav" href="/cart"><span aria-hidden="true">🛒</span><span>Cart</span><span className="cart-count">{count}</span></Link><Link className="header-order" href="/menu">Order now <span aria-hidden="true">↗</span></Link></div></div></header>;
}
