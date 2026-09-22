const CATEGORIES = [
  { name: "Rent (1BR, city center)", origin: "ETB 18,000/mo", target: "€950/mo", change: "+64%" },
  { name: "Groceries", origin: "ETB 6,500/mo", target: "€280/mo", change: "+22%" },
  { name: "Transport", origin: "ETB 1,200/mo", target: "€40/mo", change: "-8%" },
  { name: "Eating out", origin: "ETB 4,000/mo", target: "€150/mo", change: "+31%" },
];

function ResultsPage() {
  return (
    <section className="results-page">
      <p className="route">
        Addis Ababa <span aria-hidden="true">→</span> Lisbon
      </p>

      <div className="verdict verdict-caution">
        <p className="verdict-figure">ETB 1,240,000/yr</p>
        <p>is what you'd need to earn in Lisbon to match your life in Addis Ababa.</p>
      </div>

      <table className="comparison-table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Addis Ababa</th>
            <th scope="col">Lisbon</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map((row) => (
            <tr key={row.name}>
              <th scope="row">{row.name}</th>
              <td>{row.origin}</td>
              <td>{row.target}</td>
              <td className={row.change.startsWith("+") ? "up" : "down"}>{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="results-note">These numbers are placeholders — real cost-of-living data comes next.</p>
    </section>
  );
}

export default ResultsPage;
