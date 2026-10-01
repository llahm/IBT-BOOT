"use client";

export default function MenuError({ error, reset }) {
  return <section className="error-state" role="alert"><div className="error-icon">!</div><span className="eyebrow">A LITTLE DETOUR</span><h2>We couldn’t load the menu.</h2><p>Something went wrong while getting the dishes. Give it another try.</p>{process.env.NODE_ENV === "development" && error?.message && <p className="error-detail">Debug: {error.message}</p>}<button className="button button-primary" type="button" onClick={() => reset()}>Try again ↻</button></section>;
}
