import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div className="not-found-emoji">🍽️</div><span className="eyebrow">OOPS, WRONG TABLE</span><h1>That dish is off the menu.</h1><p>We couldn’t find what you were looking for. There’s plenty more good food to discover.</p><Link href="/menu" className="button button-primary">Back to the menu <span aria-hidden="true">→</span></Link></section>;
}
