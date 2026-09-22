import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { validate, DELIVERY_AREAS } from "../utils/validateDelivery";
import { submitOrder } from "../api/checkout";

const FIELD_ORDER = ["name", "phone", "area"];

function DeliveryForm({ orderTotal, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const fieldRefs = { name: nameRef, phone: phoneRef, area: areaRef };

  const errors = validate(formData);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function focusField(name) {
    fieldRefs[name]?.current?.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const firstBadField = FIELD_ORDER.find((field) => errors[field]);
    if (firstBadField) {
      setTouched({ name: true, phone: true, area: true });
      focusField(firstBadField);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitOrder(formData);
      onOrderPlaced?.(formData);
    } catch (err) {
      setSubmitError(err.message);
      setTouched((prev) => ({ ...prev, [err.field ?? "phone"]: true }));
      focusField(err.field ?? "phone");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="delivery-section">
      <div className="container">
        <form className="delivery-form" onSubmit={handleSubmit} noValidate>
          <h3>Delivery details</h3>

          {submitError && (
            <p className="field-error form-error" role="alert">
              {submitError}
            </p>
          )}

          <label htmlFor="delivery-name">Full name</label>
          <input
            id="delivery-name"
            name="name"
            type="text"
            ref={nameRef}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Abebe Kebede"
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={touched.name && errors.name ? "delivery-name-error" : undefined}
          />
          {touched.name && errors.name && (
            <p id="delivery-name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}

          <label htmlFor="delivery-phone">TeleBirr number</label>
          <input
            id="delivery-phone"
            name="phone"
            type="tel"
            ref={phoneRef}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="09XXXXXXXX"
            aria-invalid={touched.phone && Boolean(errors.phone)}
            aria-describedby={touched.phone && errors.phone ? "delivery-phone-error" : undefined}
          />
          {touched.phone && errors.phone && (
            <p id="delivery-phone-error" className="field-error" role="alert">
              {errors.phone}
            </p>
          )}

          <label htmlFor="delivery-area">Delivery area</label>
          <select
            id="delivery-area"
            name="area"
            ref={areaRef}
            value={formData.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.area && Boolean(errors.area)}
            aria-describedby={touched.area && errors.area ? "delivery-area-error" : undefined}
          >
            <option value="">Select a sub-city</option>
            {DELIVERY_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {touched.area && errors.area && (
            <p id="delivery-area-error" className="field-error" role="alert">
              {errors.area}
            </p>
          )}

          <label htmlFor="delivery-notes">Notes (optional)</label>
          <textarea
            id="delivery-notes"
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Gate code, landmark, extra napkins…"
          />

          <div className="delivery-total">
            Order total: <strong>{orderTotal} ETB</strong>
          </div>

          <button type="submit" className="checkout-btn" disabled={isSubmitting}>
            {isSubmitting ? "Placing order…" : `Pay ${orderTotal} ETB with TeleBirr`}
          </button>
        </form>
      </div>
    </section>
  );
}

DeliveryForm.propTypes = {
  orderTotal: PropTypes.number.isRequired,
  onOrderPlaced: PropTypes.func,
};

export default DeliveryForm;
