import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "../dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  // In current Next.js versions, params is a Promise in Server Components.
  // This intentionally reads props rather than using a routing hook.
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  if (!dish) notFound();

  return (
    <section className="page-section">
      <div className="container">
        <Link href="/menu" className="text-link">← Back to menu</Link>
        <article className="dish-detail">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dish.image} alt={dish.name} />
          <div className="dish-detail-copy">
            <span className="eyebrow">{dish.category}{dish.spicy ? " · 🌶️ Spicy" : ""}</span>
            <h1>{dish.name}</h1>
            <p>{dish.description}</p>
            <p className="detail-price">{dish.price} ETB</p>
            <p className="muted">Dish ID: <code>{id}</code></p>
            <Link className="button" href="/cart">Continue to cart</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
