"use server";

const PHONE_REGEX = /^(?:09|07)\d{8}$/;

export async function placeOrder(previousState, formData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const errors = {};

  if (name.length < 2) errors.name = "Name must contain at least 2 characters.";
  if (!PHONE_REGEX.test(phone)) errors.phone = "Enter a valid Ethiopian mobile number, e.g. 0912345678 or 0712345678.";
  if (!area) errors.area = "Please choose your delivery area.";

  if (Object.keys(errors).length) return { success: false, errors, message: "Please fix the fields below." };

  // This lesson project has no database/payment integration. The order is validated
  // on the server and logged for demonstration; do not treat this as a real payment.
  const order = { name, phone, area, createdAt: new Date().toISOString() };
  console.log("[Addis Eats demo order received]", order);
  return { success: true, errors: {}, message: `Thanks, ${name}! Your demo order has been received.`, order };
}
