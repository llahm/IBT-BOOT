const NETWORK_DELAY_MS = 700;
const FAILURE_RATE = 0.3;

// Stands in for a real payment/checkout endpoint. Fails roughly 30% of
// the time so the form's error handling actually gets exercised, not
// just built and never triggered.
export async function submitOrder(formData) {
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));

  if (Math.random() < FAILURE_RATE) {
    const error = new Error(
      "TeleBirr couldn't verify this number. Double-check it and try again."
    );
    error.field = "phone";
    throw error;
  }

  return { ...formData, confirmedAt: Date.now() };
}
