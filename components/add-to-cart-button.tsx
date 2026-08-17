"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { Book } from "@/types";

export function AddToCartButton({ book, compact = false }: { book: Book; compact?: boolean }) {
  const { addBook } = useCart();
  const soldOut = book.stock < 1;
  return (
    <button
      type="button"
      className={compact ? "button button--quiet button--small" : "button button--primary"}
      disabled={soldOut}
      onClick={() => addBook(book)}
      aria-label={soldOut ? `${book.title} is out of stock` : `Add ${book.title} to cart`}
    >
      <ShoppingBag aria-hidden="true" size={compact ? 16 : 18} />
      {soldOut ? "Sold out" : "Add to cart"}
    </button>
  );
}
