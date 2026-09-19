import { useState } from "react";

const ABOUT_CARDS = [
  {
    title: "Our Mission",
    body: "CampusConnect helps students discover the clubs, events, and resources that make campus feel smaller and more welcoming.",
  },
  {
    title: "Built by Students",
    body: "This portal is maintained by a small team of student developers as an ongoing campus project.",
  },
  {
    title: "Always Growing",
    body: "New clubs and events are added every semester — reach out if yours isn't listed yet.",
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AboutPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Please add a short message.";
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // No backend for this demo — just confirm receipt in the UI.
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  }

  return (
    <div className="container">
      <section className="about-hero">
        <span className="section-label">ABOUT</span>
        <h2>About CampusConnect</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "620px", marginTop: "10px" }}>
          CampusConnect is a student-built portal for finding clubs, events,
          and resources across campus — one place instead of a dozen
          scattered flyers and group chats.
        </p>
      </section>

      <div className="about-grid">
        {ABOUT_CARDS.map((card) => (
          <div key={card.title} className="about-card">
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="section-label">GET IN TOUCH</span>
          <h2>Send us a message</h2>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {submitted && (
          <p className="form-success">
            Thanks — your message has been sent. We'll get back to you soon.
          </p>
        )}

        <div>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@university.edu"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help?"
          />
          {errors.message && <p className="field-error">{errors.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default AboutPage;
