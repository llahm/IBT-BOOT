import { useState } from "react";
import PropTypes from "prop-types";

// Ethiopian mobile numbers TeleBirr accepts: 09xxxxxxxx / 07xxxxxxxx
// (local, 10 digits) or +2519xxxxxxxx / +2517xxxxxxxx (international).
const TELEBIRR_REGEX = /^(?:\+251|0)[97]\d{8}$/;

const AREAS = [
  "Bole",
  "Yeka",
  "Kirkos",
  "Arada",
  "Lideta",
  "Nifas Silk-Lafto",
  "Kolfe Keranio",
  "Gulele",
];

function DeliveryForm({ orderTotal }) {
  // One state object for the whole form, updated by a single handler —
  // rather than a separate useState per field.
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const isNameValid = formData.name.trim().length > 0;
  const isPhoneValid = TELEBIRR_REGEX.test(formData.phone.trim());
  const isAreaValid = formData.area !== "";
  const isFormValid = isNameValid && isPhoneValid && isAreaValid;
  const showPhoneError = formData.phone.length > 0 && !isPhoneValid;

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="delivery-section">
        <div className="container">
          <div className="delivery-confirmation">
            <h3>Order placed! 🎉</h3>
            <p>
              Thanks {formData.name}, we&apos;ll text {formData.phone} when
              your {orderTotal} ETB order is on its way to {formData.area}.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="delivery-section">
      <div className="container">
        <form className="delivery-form" onSubmit={handleSubmit}>
          <h3>Delivery details</h3>

          <label htmlFor="delivery-name">Full name</label>
          <input
            id="delivery-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Abebe Kebede"
          />

          <label htmlFor="delivery-phone">TeleBirr number</label>
          <input
            id="delivery-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09XXXXXXXX"
          />
          {showPhoneError && (
            <p className="field-error">
              Enter a valid TeleBirr number, e.g. 0912345678 or
              +251912345678.
            </p>
          )}

          <label htmlFor="delivery-area">Delivery area</label>
          <select
            id="delivery-area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          >
            <option value="">Select a sub-city</option>
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <div className="delivery-total">
            Order total: <strong>{orderTotal} ETB</strong>
          </div>

          <button
            type="submit"
            className="checkout-btn"
            disabled={!isFormValid}
          >
            Pay with TeleBirr
          </button>
        </form>
      </div>
    </section>
  );
}

DeliveryForm.propTypes = {
  orderTotal: PropTypes.number.isRequired,
};

export default DeliveryForm;
