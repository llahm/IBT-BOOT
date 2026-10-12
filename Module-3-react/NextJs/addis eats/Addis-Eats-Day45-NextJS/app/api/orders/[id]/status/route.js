import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getOrderById } from "@/lib/orders";
export async function GET(_request, { params }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error:"Sign in required" }, { status:401 });
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) return NextResponse.json({ error:"Order not found" }, { status:404 });
  if (order.userId !== user.id && user.role !== "staff") return NextResponse.json({ error:"Not allowed" }, { status:403 });
  return NextResponse.json({ id:order.id, status:order.status, statusUpdatedAt:order.statusUpdatedAt });
}
