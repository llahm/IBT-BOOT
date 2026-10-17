import Link from "next/link";
import { notFound,redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrderById } from "@/lib/orders";
import OrderStatus from "@/components/OrderStatus";
import ClearCartOnOrder from "@/components/ClearCartOnOrder";
export async function generateMetadata({params}) { const {id}=await params; return {title:`Order ${id}`,robots:{index:false,follow:false}}; }
export default async function OrderDetailsPage({params}) {
 const user=await getSession(); if(!user) redirect(`/signin?next=${encodeURIComponent("/orders")}`);
 const {id}=await params; const order=getOrderById(id); if(!order) notFound();
 if(order.userId!==user.id && user.role!=="staff") notFound();
 return <main className="page-section"><ClearCartOnOrder/><div className="container narrow-container"><Link className="back-link" href="/orders">← Back to orders</Link><div className="page-heading"><span className="eyebrow">ORDER CONFIRMED</span><h1>Thank you for <span>ordering.</span></h1><p>Order {order.id} was received. Keep this page open for status updates.</p></div><section className="order-detail-panel"><OrderStatus orderId={order.id} initialStatus={order.status}/><div className="order-detail-meta"><div><small>Order number</small><strong>{order.id}</strong></div><div><small>Customer</small><strong>{order.customer.name}</strong></div><div><small>Delivery address</small><strong>{order.customer.address}</strong></div></div><h2>Order summary</h2><ul className="order-items">{order.items.map(i=><li key={i.id}><span>{i.quantity} × {i.name}</span><strong>{(i.price*i.quantity).toLocaleString()} ETB</strong></li>)}</ul><div className="summary-total"><span>Total</span><strong>{order.total.toLocaleString()} ETB</strong></div><p className="field-help">Demo note: orders are stored in server memory, so they reset when the server restarts.</p></section><div className="order-actions"><Link href="/orders" className="button button-light">All my orders</Link><Link href="/menu" className="button button-primary">Order more food</Link></div></div></main>;
}