import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "addis_eats_session";
const secret = () => process.env.SESSION_SECRET || "development-only-change-this-secret-before-deploying";

export function signSession(user) {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
export function verifySession(token) {
  if (!token || typeof token !== "string") return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret()).update(payload).digest();
  let supplied;
  try { supplied = Buffer.from(signature, "base64url"); } catch { return null; }
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
  try {
    const user = JSON.parse(Buffer.from(payload, "base64url").toString());
    return user.exp > Date.now() ? user : null;
  } catch { return null; }
}
export async function getSession() {
  const store = await cookies();
  return verifySession(store.get(COOKIE)?.value);
}
export const sessionCookieName = COOKIE;
