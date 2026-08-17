import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BookCover } from "@/components/book-cover";
import { formatCurrency } from "@/lib/format";
import type { Book } from "@/types";

export function BookCard({ book, priority = false }: { book: Book; priority?: boolean }) {
  return (
    <article className="book-card">
      <Link href={`/books/${book.slug}`} className="book-card__cover-link" aria-label={`View ${book.title}`}>
        <BookCover {...book} priority={priority} />
      </Link>
      <div className="book-card__body">
        <div className="book-card__meta">
          <span>{book.category}</span>
          <span className={book.stock ? "stock stock--in" : "stock stock--out"}>
            {book.stock ? "In stock" : "Out of stock"}
          </span>
        </div>
        <h3><Link href={`/books/${book.slug}`}>{book.title}</Link></h3>
        <p className="book-card__author">by {book.author}</p>
        <div className="book-card__footer">
          <strong>{formatCurrency(book.price)}</strong>
          <div className="book-card__actions">
            <Link href={`/books/${book.slug}`} className="icon-link" aria-label={`View details for ${book.title}`}>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <AddToCartButton book={book} compact />
          </div>
        </div>
      </div>
    </article>
  );
}
