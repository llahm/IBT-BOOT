import Link from "next/link";
import CheckoutForm from "../../components/CheckoutForm";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <section className="page-section"><div className="container narrow-container"><div className="page-heading"><span className="eyebrow">ONE LAST THING</span><h1>Let’s get it <span>to you.</span></h1><p>Add your delivery details and we’ll take it from here.</p></div><Link href="/cart" className="back-link">← Back to cart</Link><CheckoutForm /></div></section>;
}
