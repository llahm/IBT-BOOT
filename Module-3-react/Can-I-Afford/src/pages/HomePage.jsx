import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>
          Could you actually afford to live in <span className="city-token">Lisbon</span>?
        </h1>

        <p className="hero-sub">
          A plain-English answer to the relocation question spreadsheets
          can&apos;t give you honestly — what you&apos;d really need to earn,
          and what would actually change month to month.
        </p>

        <Link to="/compare" className="btn btn-primary">
          Compare two cities →
        </Link>
      </section>

      <section className="steps">
        <div className="step">
          <span className="step-number">01</span>
          <div>
            <h3>Tell us where you live now</h3>
            <p>Your city and what you currently earn — that's the baseline everything else gets measured against.</p>
          </div>
        </div>

        <div className="step">
          <span className="step-number">02</span>
          <div>
            <h3>Pick the city you're considering</h3>
            <p>A job offer, a move you're weighing, or just curiosity about somewhere you've always wanted to live.</p>
          </div>
        </div>

        <div className="step">
          <span className="step-number">03</span>
          <div>
            <h3>See what actually changes</h3>
            <p>Rent, groceries, transport — broken down category by category, with the number you'd need to earn to keep your life intact.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
