"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { useCart } from "@/components/cart-provider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatCurrency } from "@/lib/format";

export function CartPage() {
  const { items, totals, updateQuantity, removeItem, clearCart } = useCart();
  if (!items.length) return <div className="empty-state page-state"><ShoppingBag /><h1>Your cart is empty.</h1><p>Browse the shelves and add a book that earns its place.</p><Link href="/books" className="button button--primary">Browse books</Link></div>;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  return (
    <div className="app-page shell">
      <header className="app-page__header"><span className="eyebrow">YOUR SELECTION</span><h1>Shopping cart</h1><p>Review quantities before the server verifies stock and pricing at checkout.</p></header>
      <div className="cart-page-grid">
        <section className="panel cart-page-lines" aria-label="Cart items">
          {items.map((item) => <article className="cart-page-line" key={item.bookId}><BookCover {...item} category="cart" className="cart-page-line__cover" /><div><Link href={`/books/${item.slug}`}><h2>{item.title}</h2></Link><p>{item.author}</p><span>{formatCurrency(item.price)} each</span><div className="cart-line__controls"><div className="quantity-control"><button onClick={() => updateQuantity(item.bookId, item.quantity - 1)} aria-label={`Decrease ${item.title} quantity`}><Minus size={15} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.bookId, item.quantity + 1)} aria-label={`Increase ${item.title} quantity`}><Plus size={15} /></button></div><button className="text-button" onClick={() => removeItem(item.bookId)}><Trash2 size={15} /> Remove</button></div></div><strong>{formatCurrency(item.price * item.quantity)}</strong></article>)}
          <button className="text-button" onClick={clearCart}>Clear cart</button>
        </section>
        <aside className="panel order-summary"><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(totals.subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{totals.shipping ? formatCurrency(totals.shipping) : "Free"}</strong></div><div className="summary-row summary-row--total"><span>Estimated total</span><strong>{formatCurrency(totals.total)}</strong></div>{remaining > 0 && <p>Add {formatCurrency(remaining)} more for free demo shipping.</p>}<Link href="/checkout" className="button button--primary">Continue to checkout</Link><Link href="/books" className="text-link">Continue browsing</Link></aside>
      </div>
    </div>
  );
}
