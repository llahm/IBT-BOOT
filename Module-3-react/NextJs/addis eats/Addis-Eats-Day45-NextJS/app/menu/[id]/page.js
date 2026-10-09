import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDish, getDishes } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";
export async function generateStaticParams() { const dishes=await getDishes(); return dishes.map(d=>({id:String(d.id)})); }
export async function generateMetadata({params}) { const {id}=await params; const dish=await getDish(id); if(!dish)return {title:"Dish not found"}; return {title:dish.name,description:dish.description,openGraph:{title:`${dish.name} | Addis Eats`,description:dish.description,images:[dish.image]}}; }
export default async function DishPage({params}) {
 const {id}=await params; const dish=await getDish(id); if(!dish)notFound();
 const structuredData={"@context":"https://schema.org","@type":"MenuItem",name:dish.name,description:dish.description,offers:{"@type":"Offer",price:dish.price,priceCurrency:"ETB"},image:dish.image};
 return <main className="detail-section"><div className="container"><Link href="/menu" className="back-link">← Back to menu</Link><article className="dish-detail"><div className="dish-detail-image-wrap"><Image src={dish.image} alt={dish.name} width={900} height={760} priority /></div><div className="dish-detail-copy"><span className="eyebrow">{dish.categoryLabel}</span><h1>{dish.name}</h1><p>{dish.description}</p><div className="detail-price">{dish.price.toLocaleString()} <small>ETB</small></div><p className="detail-footnote">Freshly prepared by our partner kitchens. Availability may vary.</p><AddToCartButton dish={dish}/></div></article></div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}} /></main>;
}