"use client";
import { useState } from "react";
export default function CounterPage() {
  const [count, setCount] = useState(0);
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">STATE UPDATES</span><h1>Click counter</h1><p className="event-counter-value">Count: {count}</p><div className="event-demo-actions"><button type="button" className="button button-primary" onClick={() => setCount((previous) => previous + 1)}>Increase</button><button type="button" className="button button-outline" onClick={() => setCount((previous) => previous - 1)}>Decrease</button><button type="button" className="button button-outline" onClick={() => setCount(0)}>Reset</button></div><p className="event-demo-note">The functional updater calculates the next value from the latest queued state.</p></div></main>;
}
