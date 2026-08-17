import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function BookNotFound() {
  return <div className="empty-state page-state"><BookOpen /><h1>That book isn’t on this shelf.</h1><p>It may have moved or is no longer available.</p><Link href="/books" className="button button--primary">Browse all books</Link></div>;
}
