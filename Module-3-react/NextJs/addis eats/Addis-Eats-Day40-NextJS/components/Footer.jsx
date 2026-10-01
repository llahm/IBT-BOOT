import Link from "next/link";

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div><Link href="/" className="brand footer-brand"><span className="brand-mark">a<span>.</span></span><span>Addis<span className="brand-accent">-eats</span><small>GOOD FOOD, GOOD MOOD</small></span></Link><p>Your city, your cravings, delivered with a little extra love.</p></div><div className="footer-links"><div><strong>Explore</strong><Link href="/menu">Menu</Link><Link href="/cart">Your cart</Link><Link href="/checkout">Checkout</Link></div><div><strong>Made for Addis</strong><a href="mailto:hello@addiseats.example">Say hello</a><Link href="/#restaurants">Local favorites</Link><span>Made with ♥ in Addis Ababa</span></div></div></div><div className="container footer-bottom"><span>© 2026 Addis Eats. All good things reserved.</span><span>Prices shown in ETB</span></div></footer>;
}
