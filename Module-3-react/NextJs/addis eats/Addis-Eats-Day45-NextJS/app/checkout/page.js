import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CheckoutClient from "@/components/CheckoutClient";
export const metadata={title:"Checkout",robots:{index:false,follow:false}};
export default async function CheckoutPage() {
 const user=await getSession(); if(!user) redirect("/signin?next=/checkout");
 return <main className="page-section"><div className="container"><div className="page-heading"><span className="eyebrow">ALMOST THERE</span><h1>Ready to <span>checkout?</span></h1><p>Signed in as {user.name}. Confirm your delivery details below.</p></div><CheckoutClient/></div></main>;
}