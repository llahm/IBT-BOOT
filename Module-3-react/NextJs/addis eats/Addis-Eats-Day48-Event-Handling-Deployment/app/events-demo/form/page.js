"use client";
import { useState } from "react";
export default function FormEventPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(event) { event.preventDefault(); setMessage(`Welcome, ${name.trim()}!`); }
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">FORM EVENTS</span><h1>Submit without a reload.</h1><form className="event-demo-form" onSubmit={handleSubmit}><label htmlFor="event-name">Your name</label><input id="event-name" value={name} onChange={(event) => setName(event.target.value)} required minLength={1} /><button className="button button-primary" type="submit">Submit</button></form><p role="status" aria-live="polite">{message}</p></div></main>;
}
