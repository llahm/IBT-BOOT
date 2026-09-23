import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link href="/" className="logo">Addis<span>-eats</span></Link>
          <p>Your food. Your city. Delivered.</p>
        </div>
        <p>© 2026 Addis Eats · Learning project</p>
      </div>
    </footer>
  );
}
