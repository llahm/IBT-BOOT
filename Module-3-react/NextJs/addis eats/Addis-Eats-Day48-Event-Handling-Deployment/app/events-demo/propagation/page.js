"use client";
import { useState } from "react";
export default function PropagationPage() {
  const [message, setMessage] = useState("Choose an action.");
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">EVENT PROPAGATION</span><h1>Dish card interaction</h1><button type="button" className="event-demo-card event-demo-parent" onClick={() => setMessage("Dish details opened.")}><strong>Doro Wat</strong><span>450 ETB · Click the card to open details</span><span className="button button-primary event-demo-inline" onClick={(event) => { event.stopPropagation(); setMessage("Dish added to cart. The parent action did not run."); }}>Add to cart</span></button><p role="status" aria-live="polite">{message}</p><p className="event-demo-note">This deliberately nested control demonstrates stopPropagation(). For production interfaces, prefer separate semantic links and buttons instead of nested interactive elements.</p></div></main>;
}
