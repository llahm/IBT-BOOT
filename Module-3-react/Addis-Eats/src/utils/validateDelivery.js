// Ethiopian mobile numbers TeleBirr accepts: 09xxxxxxxx / 07xxxxxxxx
// (local, 10 digits) or +2519xxxxxxxx / +2517xxxxxxxx (international).
const TELEBIRR_REGEX = /^(?:\+251|0)[97]\d{8}$/;

export const DELIVERY_AREAS = [
  "Bole",
  "Yeka",
  "Kirkos",
  "Arada",
  "Lideta",
  "Nifas Silk-Lafto",
  "Kolfe Keranio",
  "Gulele",
];

// No side effects, no state — same form in, same errors out. Called on
// every render so the errors are always in sync with formData, not a
// separate copy that can drift out of date.
export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Enter your full name.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Enter a TeleBirr number.";
  } else if (!TELEBIRR_REGEX.test(form.phone.trim())) {
    errors.phone = "Enter a valid TeleBirr number, e.g. 0912345678 or +251912345678.";
  }

  if (!form.area) {
    errors.area = "Select a delivery area.";
  }

  return errors;
}
