import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <Link href="/" className="wordmark wordmark--footer"><span className="wordmark__monogram">NV</span><span><strong>NV Bookstore</strong><small>A production-minded demo store.</small></span></Link>
          <p>Curated reading for curious minds. Demo checkout only — no real purchases are processed.</p>
        </div>
        <div><h2>Explore</h2><Link href="/books">All books</Link><Link href="/books?sort=newest">New releases</Link><Link href="/books?availability=in-stock">In stock</Link></div>
        <div><h2>Your account</h2><Link href="/account">Profile</Link><Link href="/orders">Orders</Link><Link href="/account#security">Security</Link></div>
        <div><h2>Project</h2><Link href="/about">About V2</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="https://github.com/NandanVyas/bookstore" target="_blank" rel="noreferrer">Source on GitHub</a></div>
      </div>
      <div className="shell site-footer__bottom"><span>© {new Date().getFullYear()} NV Bookstore</span><span>Built as a secure modular monolith.</span></div>
    </footer>
  );
}
