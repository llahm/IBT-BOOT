import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import SignInForm from "@/components/SignInForm";
export const metadata={title:"Sign in",description:"Sign in to manage your Addis Eats orders."};
export default async function SignInPage({searchParams}) {
 const user=await getSession(); const params=await searchParams; const next=typeof params?.next==="string" ? params.next : "/orders";
 if(user) redirect(next.startsWith("/")&&!next.startsWith("//")?next:"/orders");
 return <main className="page-section"><div className="container narrow-container"><div className="page-heading"><span className="eyebrow">WELCOME BACK</span><h1>Sign in to <span>Addis Eats.</span></h1><p>Track your orders and enjoy a smoother checkout.</p></div><div className="signin-layout"><SignInForm next={next}/><aside className="signin-aside"><span className="eyebrow">DEMO MODE</span><h2>A simple account for your order journey.</h2><p>This course project demonstrates signed sessions, protected routes, and server-side role checks without an external auth provider.</p><div><strong>Customer</strong><small>Any valid phone + password of 4 or more characters.</small></div><div><strong>Kitchen staff</strong><small>Phone number ending in 0000, or password <code>staff123</code>.</small></div></aside></div></div></main>;
}