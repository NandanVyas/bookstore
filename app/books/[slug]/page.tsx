import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { formatCurrency } from "@/lib/format";
import { getAppUrl } from "@/lib/env";
import { getBookBySlug, listBooks } from "@/services/book-service";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBookBySlug((await params).slug).catch(() => null);
  if (!book) return { title: "Book not found", robots: { index: false, follow: false } };
  const description = book.description.slice(0, 155);
  const images = book.coverUrl ? [{ url: new URL(book.coverUrl, getAppUrl()).toString(), alt: `Cover of ${book.title}` }] : [];
  return {
    title: book.title,
    description,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: { title: book.title, description, type: "book", images },
    twitter: { title: book.title, description, images },
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug).catch(() => null);
  if (!book) notFound();
  let related = [] as Awaited<ReturnType<typeof listBooks>>["books"];
  try {
    related = (await listBooks({ category: book.category, availability: "all", sort: "featured", limit: 5 })).books.filter((item) => item.id !== book.id).slice(0, 4);
  } catch { related = []; }

  return (
    <div className="book-detail-page">
      <div className="shell"><Link href="/books" className="back-link"><ArrowLeft size={16} /> Back to catalogue</Link></div>
      <section className="shell book-detail">
        <div className="book-detail__visual"><BookCover {...book} priority className="book-detail__cover" /><span className="book-detail__edition">NV CURATED EDITION</span></div>
        <div className="book-detail__content">
          <div className="book-detail__category">{book.category}</div>
          <h1>{book.title}</h1><p className="book-detail__author">by <strong>{book.author}</strong></p>
          <div className="book-detail__price"><strong>{formatCurrency(book.price)}</strong><span className={book.stock ? "stock stock--in" : "stock stock--out"}>{book.stock ? `${book.stock} in stock` : "Out of stock"}</span></div>
          <p className="book-detail__description">{book.description}</p>
          <AddToCartButton book={book} />
          <div className="book-detail__promises"><span><ShieldCheck /> Secure account checkout</span><span><Truck /> Demo shipping flow</span><span><PackageCheck /> Stock verified on the server</span></div>
          <dl className="book-meta">
            <div><dt>Category</dt><dd>{book.category}</dd></div>
            {book.publisher && <div><dt>Publisher</dt><dd>{book.publisher}</dd></div>}
            {book.language && <div><dt>Language</dt><dd>{book.language}</dd></div>}
            {book.pages && <div><dt>Pages</dt><dd>{book.pages}</dd></div>}
            {book.isbn && <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>}
            <div><dt>Checkout</dt><dd><Check size={14} /> Demo only</dd></div>
          </dl>
        </div>
      </section>
      {!!related.length && <section className="section shell"><div className="section-heading"><div><span className="eyebrow">KEEP BROWSING</span><h2>You may also like</h2></div></div><div className="book-grid">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></section>}
    </div>
  );
}
