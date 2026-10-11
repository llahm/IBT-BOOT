"use client";
import { useActionState } from "react";
import { signInAction } from "@/app/actions";
export default function SignInForm({ next="/" }) {
 const [state,action,pending]=useActionState(signInAction,{error:""});
 return <form action={action} className="checkout-form signin-form"><input type="hidden" name="next" value={next}/><div className="form-section-heading"><span>01</span><div><h2>Your account</h2><p>Use the course demo credentials to sign in.</p></div></div>
 <label htmlFor="phone">Phone number</label><input id="phone" name="phone" autoComplete="tel" placeholder="+251911123456" required/>
 <label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" minLength={4} placeholder="Enter any 4+ characters" required/>
 {state?.error&&<p className="form-error" role="alert">{state.error}</p>}<button className="button button-primary button-full" disabled={pending}>{pending?"Signing in…":"Sign in →"}</button>
 <p className="field-help">Demo staff account: phone ending in 0000, or password <code>staff123</code>. Other valid credentials create a demo customer.</p></form>;
}
