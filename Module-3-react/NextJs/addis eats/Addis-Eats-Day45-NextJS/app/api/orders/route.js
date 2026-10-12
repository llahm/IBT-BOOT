const PHONE_REGEX = /^(?:09|07)\d{8}$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const errors = {};
  if (name.length < 2) errors.name = "Name must contain at least 2 characters.";
  if (!PHONE_REGEX.test(phone)) errors.phone = "Enter a valid Ethiopian mobile number, e.g. 0912345678.";

  if (Object.keys(errors).length) return Response.json({ error: "Validation failed.", errors }, { status: 422 });

  // Demo endpoint only: a real application would persist the order in a database.
  console.log("[Addis Eats API demo order]", { name, phone, createdAt: new Date().toISOString() });
  return Response.json({ message: "Order request accepted for this demo." }, { status: 201 });
}
