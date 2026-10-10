import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listOrdersFor } from "@/lib/orders";
export const metadata={title:"My orders",robots:{index:false,follow:false}};
export default async function OrdersPage() {
 const user=await getSession(); if(!user) redirect("/signin?next=/orders");
 const orders=listOrdersFor(user.id);
 return <main className="page-section"><div className="container"><div className="page-heading"><span className="eyebrow">YOUR FOOD JOURNEY</span><h1>My <span>orders.</span></h1><p>Welcome, {user.name}. Review your recent orders and status.</p></div>{orders.length?<div className="orders-list">{orders.map(o=><Link className="order-card" href={`/orders/${o.id}`} key={o.id}><div><span className="muted-label">ORDER {o.id}</span><h2>{o.items.map(i=>i.name).join(", ")}</h2><small>{new Date(o.createdAt).toLocaleString()}</small></div><div><span className="order-status-pill">{o.status}</span><strong>{o.total.toLocaleString()} ETB</strong></div><span aria-hidden="true">↗</span></Link>)}</div>:<div className="empty-orders"><div className="success-icon">⌑</div><h2>No orders yet</h2><p>When you place an order, it will appear here.</p><Link href="/menu" className="button button-primary">Explore the menu</Link></div>}</div></main>;
}