import Link from "next/link";
import Image from "next/image";
import { getDishes } from "@/lib/data";
import MenuSearch from "@/components/MenuSearch";
import AddToCartButton from "../../components/AddToCartButton";

const validCategories = ["traditional", "vegetarian", "fast-food", "pizza", "burger"];

export const metadata = { title: "Menu" };

export default async function MenuPage({ searchParams }) {
  const query = await searchParams;
  // These query flags are intentionally included for the lesson's failure-state checks.
  const dishes = await getDishes({ slow: query.slow === "1", fail: query.error === "1" });
  const category = validCategories.includes(query.category) ? query.category : "all";
  const search = typeof query.q === "string" ? query.q.trim().toLowerCase() : "";
  const visibleDishes = dishes.filter((dish) => {
    const matchesCategory = category === "all" || dish.category === category;
    const matchesSearch = !search || `${dish.name} ${dish.description} ${dish.categoryLabel}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="menu-section">
      <div className="container"><MenuSearch /></div>
      <div className="menu-toolbar"><div><span className="eyebrow">MADE TO MAKE YOU HUNGRY</span><h2>{category === "all" ? "The good stuff" : category.replace("-", " ").replace(/^./, (letter) => letter.toUpperCase())}</h2><p>{visibleDishes.length} {visibleDishes.length === 1 ? "dish" : "dishes"} to explore</p></div><form action="/menu" className="menu-search"><label className="sr-only" htmlFor="menu-search">Search dishes</label><span aria-hidden="true">⌕</span><input id="menu-search" name="q" type="search" placeholder="Search the menu…" defaultValue={query.q || ""} /><button type="submit">Search</button>{category !== "all" && <input type="hidden" name="category" value={category} />}</form></div>
      {visibleDishes.length ? <div className="dish-grid">{visibleDishes.map((dish) => <article className="dish-card" key={dish.id}><Link className="dish-card-image" href={`/menu/${dish.id}`}><Image src={dish.image} alt={dish.name} width={700} height={520} /><span className="image-tag">{dish.spicy ? "🌶️ A little heat" : dish.categoryLabel}</span></Link><div className="dish-card-body"><div className="dish-card-title"><div><span className="muted-label">{dish.categoryLabel}</span><h3><Link href={`/menu/${dish.id}`}>{dish.name}</Link></h3></div><strong>{dish.price} <small>ETB</small></strong></div><p>{dish.description}</p><div className="dish-card-actions"><Link className="card-link" href={`/menu/${dish.id}`}>Details <span aria-hidden="true">↗</span></Link><AddToCartButton dish={dish} compact /></div></div></article>)}</div> : <div className="empty-state"><span>🍽️</span><h3>No dishes found</h3><p>Try a different search or choose another category.</p><Link className="button button-primary" href="/menu">Show all dishes</Link></div>}
      <p className="lesson-hint">Want to test the loading UI? Open <Link href="/menu?slow=1">/menu?slow=1</Link>. For the error boundary, open <Link href="/menu?error=1">/menu?error=1</Link>.</p>
    </section>
  );
}
