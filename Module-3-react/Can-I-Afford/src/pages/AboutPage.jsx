function AboutPage() {
  return (
    <section className="about-page">
      <h1>Where these numbers come from</h1>
      <p className="page-sub">
        Can I Afford isn't guessing — but it isn't perfect either. Here's what
        goes into a comparison, and where it can be wrong.
      </p>

      <div className="about-block">
        <h3>Cost of living</h3>
        <p>
          Rent, groceries, transport, and eating-out figures come from
          crowd-sourced cost data for each city, aggregated and updated
          periodically rather than in real time. Big cities with more
          contributors tend to be more accurate than smaller ones.
        </p>
      </div>

      <div className="about-block">
        <h3>Currency conversion</h3>
        <p>
          Salaries and prices are converted using current exchange rates at
          the time you run a comparison. Exchange rates move daily — the
          comparison reflects a snapshot, not a guarantee.
        </p>
      </div>

      <div className="about-block">
        <h3>What this doesn't account for</h3>
        <p>
          Taxes, healthcare costs, visa or relocation fees, and
          neighborhood-level variation within a city aren't factored in.
          Treat the result as a starting point for a bigger conversation, not
          a final answer.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
