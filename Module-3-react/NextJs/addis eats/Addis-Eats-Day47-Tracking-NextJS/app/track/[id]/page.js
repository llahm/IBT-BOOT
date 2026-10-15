import { notFound } from "next/navigation";
import { demoTrackingOrder } from "@/lib/tracking-order";
import TrackingClient from "./TrackingClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: id === demoTrackingOrder.id ? `Track ${id}` : "Order not found", description: "Track an Addis Eats delivery." };
}

export default async function TrackingPage({ params }) {
  const { id } = await params;
  if (id !== demoTrackingOrder.id) notFound();
  return <TrackingClient order={demoTrackingOrder} />;
}
