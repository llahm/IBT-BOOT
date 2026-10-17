"use client";
import { useEffect, useState } from "react";
export default function BrowserPage() {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    function updateWidth() { setWidth(window.innerWidth); }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">BROWSER API</span><h1>Browser width</h1><p aria-live="polite">{width === null ? "Reading screen width…" : `Window width: ${width}px`}</p><p className="event-demo-note">The resize listener is registered after mount and removed when this page unmounts.</p></div></main>;
}
