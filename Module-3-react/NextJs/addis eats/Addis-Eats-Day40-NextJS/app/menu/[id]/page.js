import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../../lib/dishes";
import AddToCartButton from "../../../components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  return dish ? { title: dish.name, description: dish.description } : { title: "Dish not found" };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish) notFound();

  return <section className="detail-section"><div className="container"><Link className="back-link" href="/menu">← Back to menu</Link><article className="dish-detail"><div className="dish-detail-image-wrap"><img src={dish.image} alt={dish.name} /><span className="image-tag">{dish.spicy ? "🌶️ A little heat" : dish.categoryLabel}</span></div><div className="dish-detail-copy"><span className="eyebrow">FRESH FROM OUR MENU</span><span className="detail-category">{dish.categoryLabel}</span><h1>{dish.name}</h1><p className="detail-description">{dish.description}</p><div className="detail-perks"><span>✓ Made fresh to order</span><span>✓ Addis Eats favorite</span></div><div className="detail-buy-row"><div><span className="muted-label">PRICE</span><strong className="detail-price">{dish.price} <small>ETB</small></strong></div><AddToCartButton dish={dish} /></div><p className="detail-footnote">Prices are listed in Ethiopian birr (ETB).</p></div></article></div></section>;
}
