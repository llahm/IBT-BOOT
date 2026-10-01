import Link from "next/link";
import CartClient from "../../components/CartClient";

export const metadata = { title: "Your cart" };

export default function CartPage() {
  return <section className="page-section"><div className="container narrow-container"><div className="page-heading"><span className="eyebrow">YOUR ORDER, YOUR WAY</span><h1>Your cart<span>.</span></h1><p>Everything you’ve picked, all in one place.</p></div><CartClient /><div className="continue-shopping"><Link href="/menu">← Keep exploring the menu</Link></div></div></section>;
}
