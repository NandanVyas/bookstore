import Link from "next/link";
import { ArrowRight, BookOpen, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { getFeaturedBooks } from "@/services/book-service";

const categories = [
  { name: "Software Engineering", query: "Software Engineering", note: "Build better systems" },
  { name: "Programming", query: "Programming", note: "Learn by doing" },
  { name: "Career & Craft", query: "Career & Craft", note: "Grow with intention" },
  { name: "General", query: "General", note: "Read beyond the stack" },
];

export default async function HomePage() {
  let featured = [] as Awaited<ReturnType<typeof getFeaturedBooks>>;
  try { featured = await getFeaturedBooks(4); } catch { featured = []; }

  return (
    <>
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <span className="eyebrow"><Sparkles size={14} /> CURATED FOR CURIOUS MINDS</span>
            <h1>Find your next<br /><em>great read.</em></h1>
            <p>Thoughtful books for developers, builders, and lifelong learners — selected with care and delivered through a polished demo experience.</p>
            <div className="hero__actions">
              <Link href="/books" className="button button--primary">Browse books <ArrowRight size={18} /></Link>
              <Link href="#categories" className="button button--secondary">Explore categories</Link>
            </div>
            <div className="hero__notes"><span><ShieldCheck size={17} /> Secure accounts</span><span><BookOpen size={17} /> Curated catalogue</span></div>
          </div>
          <div className="hero__shelf" aria-label="Featured editorial book covers">
            <div className="hero-book hero-book--one"><small>THE CRAFT OF</small><strong>Clean<br />Architecture</strong><span>ROBERT C. MARTIN</span></div>
            <div className="hero-book hero-book--two"><small>FROM JOURNEYMAN TO MASTER</small><strong>The Pragmatic<br />Programmer</strong><span>HUNT & THOMAS</span></div>
            <div className="hero-book hero-book--three"><small>BUILD RELIABLE SYSTEMS</small><strong>Designing<br />Data Systems</strong><span>NV STAFF PICK</span></div>
            <div className="hero__seal"><Compass /><span>STAFF<br />PICKS</span></div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><span className="eyebrow">THE FRONT TABLE</span><h2>Featured books</h2></div><Link href="/books">View the full catalogue <ArrowRight size={17} /></Link></div>
        {featured.length ? (
          <div className="book-grid">{featured.map((book, index) => <BookCard key={book.id} book={book} priority={index < 2} />)}</div>
        ) : (
          <div className="empty-state empty-state--shelf"><BookOpen /><div><h3>The shelves are ready for their first collection.</h3><p>Run the included seed command or add books from the protected admin area.</p></div><Link href="/books" className="button button--secondary">Visit catalogue</Link></div>
        )}
      </section>

      <section className="category-section" id="categories">
        <div className="shell">
          <div className="section-heading"><div><span className="eyebrow">BROWSE THE SHELVES</span><h2>Read by interest</h2></div><p>Four paths into a carefully organized catalogue.</p></div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link href={`/books?category=${category.query}`} key={category.name} className="category-card">
                <span>0{index + 1}</span><div><h3>{category.name}</h3><p>{category.note}</p></div><ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto shell">
        <span className="eyebrow">WHY NV BOOKSTORE</span>
        <blockquote>“A bookstore should make discovery feel considered, not overwhelming.”</blockquote>
        <p>That principle shapes the catalogue, the interface, and the engineering behind every order.</p>
      </section>
    </>
  );
}
