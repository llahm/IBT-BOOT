const RESOURCE_GROUPS = [
  {
    icon: "📚",
    title: "Library",
    items: [
      { label: "Catalog & eBook search", href: "#" },
      { label: "Reserve a study room", href: "#" },
      { label: "Research librarian chat", href: "#" },
      { label: "Interlibrary loan requests", href: "#" },
    ],
  },
  {
    icon: "🎓",
    title: "Academic Support",
    items: [
      { label: "Free peer tutoring", href: "#" },
      { label: "Writing center appointments", href: "#" },
      { label: "Academic advising", href: "#" },
      { label: "Study skills workshops", href: "#" },
    ],
  },
  {
    icon: "💼",
    title: "Career Services",
    items: [
      { label: "Resume & cover letter reviews", href: "#" },
      { label: "Mock interviews", href: "#" },
      { label: "Campus job board", href: "#" },
      { label: "Employer info sessions", href: "#" },
    ],
  },
  {
    icon: "🛎️",
    title: "Student Services",
    items: [
      { label: "Counseling & wellness", href: "#" },
      { label: "Financial aid office", href: "#" },
      { label: "Housing & dining", href: "#" },
      { label: "Accessibility services", href: "#" },
    ],
  },
];

function ResourcesPage() {
  return (
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="section-label">SUPPORT</span>
          <h2>Student resources</h2>
        </div>
      </div>

      <div className="resource-grid">
        {RESOURCE_GROUPS.map((group) => (
          <div key={group.title} className="resource-card">
            <div className="resource-card-header">
              <span className="resource-icon">{group.icon}</span>
              <h3>{group.title}</h3>
            </div>

            <ul className="resource-list">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.label}
                  <a href={item.href}>Open →</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesPage;
