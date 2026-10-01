import Link from "next/link";
import { getDishes, getRestaurants } from "../lib/dishes";

export default async function HomePage() {
  const [dishes, restaurants] = await Promise.all([getDishes(), getRestaurants()]);
  const featuredDishes = dishes.slice(0, 3);

  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">🍴 MADE FOR ADDIS ABABA</span>
            <h1>Good food.<br /><span>Good mood.</span><br />Delivered.</h1>
            <p>From the comfort of your home to the heart of your table — discover local favorites and get something delicious on the way.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/menu">Explore the menu <span aria-hidden="true">→</span></Link>
              <span className="hero-note">Fresh picks, local flavor.</span>
            </div>
            <div className="hero-proof"><span className="proof-stars">★★★★★</span><span><strong>4.8/5</strong> loved by hungry people in Addis</span></div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85" alt="A colorful spread of food" /></div>
            <div className="floating-note note-top"><span className="note-icon">🥘</span><span><strong>Local favorites</strong><small>Big flavor, close by</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon">⚡</span><span><strong>Easy ordering</strong><small>Just a few clicks</small></span></div>
            <div className="hero-sticker">MADE WITH<br />LOVE ♥</div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">A LITTLE INSPIRATION</span><h2>What sounds good today?</h2><p>Comfort food, classic Ethiopian dishes, and a few cravings in between.</p></div><Link className="text-link" href="/menu">See full menu <span aria-hidden="true">→</span></Link></div>
          <div className="dish-grid">
            {featuredDishes.map((dish) => <article className="dish-card" key={dish.id}>
              <Link className="dish-card-image" href={`/menu/${dish.id}`}><img src={dish.image} alt={dish.name} /><span className="image-tag">{dish.spicy ? "🌶️ A little heat" : dish.categoryLabel}</span></Link>
              <div className="dish-card-body"><div className="dish-card-title"><div><span className="muted-label">{dish.categoryLabel}</span><h3>{dish.name}</h3></div><strong>{dish.price} <small>ETB</small></strong></div><p>{dish.description}</p><Link className="card-link" href={`/menu/${dish.id}`}>View dish <span aria-hidden="true">↗</span></Link></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section restaurants-section" id="restaurants">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">GOOD PEOPLE, GOOD FOOD</span><h2>Popular around town</h2><p>A few local-inspired spots to start your next craving.</p></div></div>
          <div className="restaurant-grid">{restaurants.map((restaurant) => <article className="restaurant-card" key={restaurant.id}><div className="restaurant-image"><img src={restaurant.image} alt={restaurant.name} /><span className="rating">★ {restaurant.rating}</span></div><div className="restaurant-info"><div><h3>{restaurant.name}</h3><p>{restaurant.category}</p></div><span className="delivery-time">◷ {restaurant.deliveryTime}</span></div></article>)}</div>
        </div>
      </section>

      <section className="cta-section"><div className="container"><div className="cta-panel"><div><span className="eyebrow">YOUR NEXT FAVORITE IS WAITING</span><h2>Hungry? Let’s fix that.</h2><p>Browse the menu and make tonight a little more delicious.</p></div><Link href="/menu" className="button button-light">Find your next meal <span aria-hidden="true">→</span></Link></div></div></section>
    </>
  );
}
