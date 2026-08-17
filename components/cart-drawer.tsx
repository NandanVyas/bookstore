"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { items, totals, open, setOpen, updateQuantity, removeItem } = useCart();
  return (
    <>
      <button className={`drawer-backdrop ${open ? "is-open" : ""}`} aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className={`cart-drawer ${open ? "is-open" : ""}`} aria-hidden={!open} aria-label="Shopping cart" role="dialog" aria-modal={open}>
        <div className="cart-drawer__header">
          <div><span className="eyebrow">YOUR SELECTION</span><h2>Shopping cart</h2></div>
          <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close cart"><X /></button>
        </div>
        <div className="cart-drawer__content">
          {!items.length ? (
            <div className="empty-state empty-state--compact">
              <ShoppingBag aria-hidden="true" />
              <h3>Your cart is waiting</h3>
              <p>Discover a book worth making room for.</p>
              <Link href="/books" className="button button--primary" onClick={() => setOpen(false)}>Browse books</Link>
            </div>
          ) : items.map((item) => (
            <div className="cart-line" key={item.bookId}>
              <BookCover {...item} category="cart" className="cart-line__cover" />
              <div className="cart-line__details">
                <Link href={`/books/${item.slug}`} onClick={() => setOpen(false)}><strong>{item.title}</strong></Link>
                <span>{item.author}</span>
                <div className="cart-line__controls">
                  <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
                    <button onClick={() => updateQuantity(item.bookId, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={15} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.bookId, item.quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
                  </div>
                  <button className="text-button" onClick={() => removeItem(item.bookId)} aria-label={`Remove ${item.title}`}><Trash2 size={15} /> Remove</button>
                </div>
              </div>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        {!!items.length && (
          <div className="cart-drawer__footer">
            <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(totals.subtotal)}</strong></div>
            <p>Shipping is calculated from your verified cart at checkout.</p>
            <div className="cart-drawer__buttons">
              <Link href="/cart" className="button button--secondary" onClick={() => setOpen(false)}>View cart</Link>
              <Link href="/checkout" className="button button--primary" onClick={() => setOpen(false)}>Checkout</Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
