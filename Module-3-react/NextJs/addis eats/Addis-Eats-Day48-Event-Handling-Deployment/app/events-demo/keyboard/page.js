"use client";
import { useState } from "react";
export default function KeyboardPage() {
  const [message, setMessage] = useState("Focus the field and press Enter, Escape, or ArrowDown.");
  function handleKeyDown(event) {
    const messages = { Enter: "Enter was pressed.", Escape: "Escape was pressed.", ArrowDown: "Down arrow was pressed." };
    if (messages[event.key]) setMessage(messages[event.key]);
  }
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">KEYBOARD ACCESSIBILITY</span><h1>Keyboard event demo</h1><label className="event-demo-label" htmlFor="keyboard-demo">Focus this field and press a key</label><input className="event-demo-input" id="keyboard-demo" onKeyDown={handleKeyDown} /><p role="status" aria-live="polite">{message}</p></div></main>;
}
