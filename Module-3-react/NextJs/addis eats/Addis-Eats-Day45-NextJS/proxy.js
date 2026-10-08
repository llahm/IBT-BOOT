import { NextResponse } from "next/server";
export function proxy(request) {
  const hasSession = Boolean(request.cookies.get("addis_eats_session")?.value);
  if (!hasSession) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"] };
