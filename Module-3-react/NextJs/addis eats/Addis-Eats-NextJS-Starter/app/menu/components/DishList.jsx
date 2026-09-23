import Link from "next/link";

// This component is intentionally colocated inside app/menu/components.
// It has no page.js, so Next.js does not expose it as a route.
export default function DishList({ dishes }) {
  if (!dishes.length) return <p className="muted">No dishes are available yet.</p>;

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <Link href={`/menu/${dish.id}`} className="dish-image-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dish.image} alt={dish.name} />
          </Link>
          <div className="dish-card-body">
            <span className="eyebrow">{dish.category}{dish.spicy ? " · 🌶️ Spicy" : ""}</span>
            <h3><Link href={`/menu/${dish.id}`}>{dish.name}</Link></h3>
            <p>{dish.description}</p>
            <div className="dish-card-bottom">
              <strong>{dish.price} ETB</strong>
              <Link className="text-link" href={`/menu/${dish.id}`}>View dish →</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
