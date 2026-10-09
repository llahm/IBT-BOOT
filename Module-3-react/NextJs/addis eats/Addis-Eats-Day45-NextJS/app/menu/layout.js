import Link from "next/link";

const categories = [
  { label: "All dishes", value: "all", icon: "✦" },
  { label: "Traditional", value: "traditional", icon: "🥘" },
  { label: "Vegetarian", value: "vegetarian", icon: "🌿" },
  { label: "Fast food", value: "fast-food", icon: "🍔" },
  { label: "Pizza", value: "pizza", icon: "🍕" },
];

export default function MenuLayout({ children }) {
  return (
    <div className="menu-shell">
      <div className="menu-banner"><div className="container"><span className="eyebrow">YOUR TABLE, YOUR RULES</span><h1>Explore the menu<span>.</span></h1><p>Local favorites and feel-good food, ready when you are.</p></div></div>
      <div className="container menu-layout">
        <aside className="category-sidebar"><span className="sidebar-title">BROWSE BY</span><nav aria-label="Menu categories" className="category-nav">{categories.map((category) => <Link key={category.value} href={category.value === "all" ? "/menu" : `/menu?category=${category.value}`}><span className="category-icon">{category.icon}</span>{category.label}<span className="category-arrow">→</span></Link>)}</nav><div className="sidebar-tip"><span>💡</span><p><strong>Not sure yet?</strong> Try a classic Ethiopian favorite.</p></div></aside>
        <div className="menu-content">{children}</div>
      </div>
    </div>
  );
}
