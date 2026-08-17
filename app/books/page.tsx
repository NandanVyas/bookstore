import Link from "next/link";
import { BookOpen, RotateCcw, Search } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { bookQuerySchema } from "@/schemas/book";
import { listBooks } from "@/services/book-service";

export const metadata = {
  title: "Browse Books",
  description: "Search and filter the NV Bookstore catalogue by title, author, category, price, and availability.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export default async function BooksPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const query = bookQuerySchema.parse({
    q: first(raw.q) ?? first(raw.title),
    category: first(raw.category),
    minPrice: first(raw.minPrice),
    maxPrice: first(raw.maxPrice),
    availability: first(raw.availability),
    sort: first(raw.sort),
  });

  let books = [] as Awaited<ReturnType<typeof listBooks>>["books"];
  let categories: string[] = [];
  let failed = false;
  try {
    ({ books, categories } = await listBooks(query));
  } catch {
    failed = true;
  }
  const filtered = Boolean(query.q || query.category || query.minPrice !== undefined || query.maxPrice !== undefined || query.availability === "in-stock");

  return (
    <div className="catalogue-page shell">
      <header className="page-intro page-intro--split">
        <div><span className="eyebrow">THE CATALOGUE</span><h1>Books worth<br /><em>keeping close.</em></h1></div>
        <p>Search the complete collection, narrow it to your interests, and keep useful filters in the URL for easy sharing.</p>
      </header>

      <form action="/books" className="catalogue-toolbar">
        <div className="catalogue-search"><Search size={19} /><label className="sr-only" htmlFor="catalogue-q">Search by title, author, or ISBN</label><input id="catalogue-q" name="q" defaultValue={query.q} placeholder="Search title, author, or ISBN" /></div>
        <label><span>Category</span><select name="category" defaultValue={query.category ?? ""}><option value="">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label><span>Availability</span><select name="availability" defaultValue={query.availability}><option value="all">All books</option><option value="in-stock">In stock</option></select></label>
        <label><span>Sort</span><select name="sort" defaultValue={query.sort}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
        <details className="price-filter"><summary>Price range</summary><div><label>Minimum<input name="minPrice" type="number" min="0" defaultValue={query.minPrice} /></label><label>Maximum<input name="maxPrice" type="number" min="0" defaultValue={query.maxPrice} /></label></div></details>
        <button className="button button--primary" type="submit">Apply filters</button>
      </form>

      <div className="catalogue-summary"><p><strong>{books.length}</strong> {books.length === 1 ? "book" : "books"}{query.q ? <> matching “{query.q}”</> : " on the shelf"}</p>{filtered && <Link href="/books" className="text-link"><RotateCcw size={15} /> Clear filters</Link>}</div>

      {failed ? (
        <div className="empty-state"><BookOpen /><h2>We couldn’t reach the shelves.</h2><p>Please check the database connection and try again.</p><Link href="/books" className="button button--secondary">Try again</Link></div>
      ) : books.length ? (
        <div className="book-grid">{books.map((book, index) => <BookCard key={book.id} book={book} priority={index < 4} />)}</div>
      ) : (
        <div className="empty-state"><Search /><h2>No books matched these filters.</h2><p>Try a broader search or start again with the full catalogue.</p><Link href="/books" className="button button--primary">Clear filters</Link></div>
      )}
    </div>
  );
}
