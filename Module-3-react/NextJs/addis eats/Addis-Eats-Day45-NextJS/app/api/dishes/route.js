import { NextResponse } from "next/server";
import dishes from "@/lib/dishes";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1",10) || 1);
  const pageSize = 6;
  const filtered = dishes.filter((dish) => !q || `${dish.name} ${dish.description} ${dish.categoryLabel}`.toLowerCase().includes(q));
  return NextResponse.json({ items:filtered.slice((page-1)*pageSize,page*pageSize), page, pageSize, total:filtered.length, totalPages:Math.max(1,Math.ceil(filtered.length/pageSize)) }, { headers: { "Cache-Control":"no-store" } });
}
