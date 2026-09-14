import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");

  // RequireAuth (Components/RequireAuth.jsx) redirected here with the
  // original destination tucked into router state as `from`. Once
  // sign-in succeeds we send the person back there instead of always
  // landing on the home page — e.g. /checkout -> /login -> /checkout.
  const from = location.state?.from?.pathname ?? "/";

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate(from, { replace: true });
  }

  return (
    <section className="delivery-section">
      <div className="container">
        <form className="delivery-form" onSubmit={handleSubmit}>
          <h3>Sign in</h3>

          <p className="field-hint">
            This is a mock sign-in for the demo — any name gets you in.
          </p>

          <label htmlFor="login-name">Your name</label>
          <input
            id="login-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Abebe Kebede"
            autoFocus
          />

          <button type="submit" className="checkout-btn" disabled={!name.trim()}>
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
