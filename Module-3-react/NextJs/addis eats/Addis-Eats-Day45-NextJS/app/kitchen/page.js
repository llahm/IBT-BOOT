import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/orders";
import KitchenControls from "@/components/KitchenControls";
export const metadata={title:"Kitchen dashboard",robots:{index:false,follow:false}};
export default async function KitchenPage() {
 const user=await getSession(); if(!user) redirect("/signin?next=/kitchen");
 if(user.role!=="staff") return <main className="page-section"><div className="container narrow-container"><div className="error-state"><div className="error-icon">!</div><span className="eyebrow">STAFF ONLY</span><h1>Kitchen access denied</h1><p>Your account does not have the staff role required to manage orders.</p><a href="/" className="button button-primary">Return home</a></div></div></main>;
 const orders=listOrdersFor(user.id);
 // In-memory demo store can be inspected by the staff role; list all orders is handled by the shared store below.
 const { getAllOrders } = await import("@/lib/orders");
 const allOrders=getAllOrders();
 return <main className="page-section"><div className="container"><div className="page-heading"><span className="eyebrow">STAFF WORKSPACE</span><h1>The <span>kitchen.</span></h1><p>Review incoming orders and update preparation status.</p></div>{allOrders.length?<div className="kitchen-list">{allOrders.map(o=><article className="kitchen-card" key={o.id}><div className="kitchen-order-heading"><div><span className="muted-label">{o.id}</span><h2>{o.customer.name}</h2><p>{o.customer.phone} · {o.customer.address}</p></div><strong>{o.total.toLocaleString()} ETB</strong></div><ul>{o.items.map(i=><li key={i.id}>{i.quantity} × {i.name}</li>)}</ul><KitchenControls order={o}/></article>)}</div>:<div className="empty-orders"><h2>No incoming orders</h2><p>Orders placed during this running server session will appear here.</p></div>}</div></main>;
}