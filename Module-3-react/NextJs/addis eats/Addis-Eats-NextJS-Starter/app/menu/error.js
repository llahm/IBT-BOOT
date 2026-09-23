"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function MenuError({ error, reset }) {
  useEffect(() => {
    console.error("Menu segment error:", error);
  }, [error]);

  return (
    <section className="page-section">
      <div className="container state-card error-card">
        <span className="state-icon" aria-hidden="true">!</span>
        <p className="eyebrow">MENU ERROR</p>
        <h1>We couldn't load the menu.</h1>
        <p className="muted">{error.message || "An unexpected error occurred."}</p>
        <div className="hero-actions">
          <button className="button" onClick={reset}>Try again</button>
          <Link className="button button-secondary" href="/menu">Back to menu</Link>
        </div>
      </div>
    </section>
  );
}
