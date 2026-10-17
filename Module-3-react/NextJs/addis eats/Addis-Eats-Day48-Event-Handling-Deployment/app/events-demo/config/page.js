export const metadata = { title: "Environment Configuration" };
export default function ConfigPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "Site URL not configured";
  return <main className="page-section"><div className="container event-demo-narrow"><span className="eyebrow">ENVIRONMENT CONFIG</span><h1>Application configuration</h1><p>Public site URL: <strong>{siteUrl}</strong></p><p className="event-demo-note">Only public configuration belongs in a NEXT_PUBLIC_ variable. Never expose database credentials, session secrets, or private payment keys.</p></div></main>;
}
