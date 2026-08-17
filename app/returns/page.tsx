import Link from "next/link";
export const metadata = { title: "Returns", robots: { index: false, follow: true } };
export default function ReturnsPage() { return <div className="empty-state page-state"><h1>Returns are not applicable.</h1><p>NV Bookstore processes demo orders only. No product is shipped and no money changes hands.</p><Link href="/books" className="button button--primary">Back to books</Link></div>; }
