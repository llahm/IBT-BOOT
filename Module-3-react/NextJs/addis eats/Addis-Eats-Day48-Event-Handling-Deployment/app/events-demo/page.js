import Link from "next/link";

const demos = [
  ["Event object", "/events-demo/object", "Inspect target, currentTarget, and the native event."],
  ["Form events", "/events-demo/form", "Control input state and submit without reloading."],
  ["Event propagation", "/events-demo/propagation", "See how stopPropagation changes bubbling."],
  ["State counter", "/events-demo/counter", "Update state using a functional updater."],
  ["Keyboard events", "/events-demo/keyboard", "Try Enter, Escape, and ArrowDown."],
  ["Browser APIs", "/events-demo/browser", "Read window width and clean up a resize listener."],
  ["Environment config", "/events-demo/config", "View the public site URL setting."],
];

export const metadata = { title: "Event Handling Lab" };

export default function EventsDemoIndex() {
  return <main className="page-section"><div className="container"><div className="page-heading"><span className="eyebrow">DAY 48 PRACTICE</span><h1>React event <span>lab.</span></h1><p>Small, interactive exercises for event handling, keyboard accessibility, and deployment configuration.</p></div><div className="event-demo-grid">{demos.map(([title, href, description]) => <article className="event-demo-card" key={href}><h2>{title}</h2><p>{description}</p><Link className="text-link" href={href}>Open exercise →</Link></article>)}</div><p className="event-demo-note">These exercises are separate from the main ordering flow, so you can experiment without changing an order.</p></div></main>;
}
