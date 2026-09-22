function ComparePage() {
  return (
    <section className="compare-page">
      <h1>Compare two cities</h1>
      <p className="page-sub">Fill in where you live now and where you're thinking about moving.</p>

      <form className="compare-form">
        <fieldset>
          <legend>Where you live now</legend>

          <label htmlFor="current-city">City</label>
          <input id="current-city" name="currentCity" type="text" placeholder="Addis Ababa" />

          <label htmlFor="salary">Annual salary</label>
          <div className="salary-row">
            <input id="salary" name="salary" type="number" placeholder="450000" />
            <select name="currency" aria-label="Currency">
              <option value="ETB">ETB</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Where you're considering</legend>

          <label htmlFor="target-city">City</label>
          <input id="target-city" name="targetCity" type="text" placeholder="Lisbon" />
        </fieldset>

        <button type="submit" className="btn btn-primary">
          See the comparison
        </button>
      </form>
    </section>
  );
}

export default ComparePage;
