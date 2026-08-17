"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, LockKeyhole, PackageCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";
import type { PublicUser } from "@/types";

export function CheckoutForm({ user }: { user: PublicUser }) {
  const { items, totals, clearCart } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ bookId, quantity }) => ({ bookId, quantity })),
          shippingAddress: { name: data.get("name"), phone: data.get("phone"), addressLine1: data.get("addressLine1"), addressLine2: data.get("addressLine2"), city: data.get("city"), state: data.get("state"), postalCode: data.get("postalCode") },
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error?.message ?? "Unable to place the order.");
      clearCart();
      router.push(`/orders/${body.data.order.id}?placed=true`);
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to place the order."); }
    finally { setPending(false); }
  }

  if (!items.length) return <div className="empty-state"><PackageCheck /><h2>Your cart needs a book first.</h2><p>Add something from the catalogue before starting checkout.</p><Link href="/books" className="button button--primary">Browse books</Link></div>;
  return (
    <form onSubmit={submit} className="checkout-grid">
      <section className="panel"><div className="checkout-step"><span>01</span><div><h2>Shipping information</h2><p>Used only to demonstrate the order flow.</p></div></div>{error && <div className="form-message" role="alert">{error}</div>}<div className="form-grid">
        <div className="form-field form-field--full"><label htmlFor="name">Full name</label><input id="name" name="name" defaultValue={user.name} autoComplete="name" required /></div>
        <div className="form-field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" defaultValue={user.profile.phone} autoComplete="tel" pattern="[+\d][\d\s-]{7,18}" required /></div>
        <div className="form-field"><label htmlFor="postalCode">Postal code</label><input id="postalCode" name="postalCode" defaultValue={user.profile.postalCode} inputMode="numeric" pattern="\d{6}" autoComplete="postal-code" required /></div>
        <div className="form-field form-field--full"><label htmlFor="addressLine1">Address</label><input id="addressLine1" name="addressLine1" defaultValue={user.profile.addressLine1} autoComplete="address-line1" required /></div>
        <div className="form-field form-field--full"><label htmlFor="addressLine2">Address line 2 <small>(optional)</small></label><input id="addressLine2" name="addressLine2" defaultValue={user.profile.addressLine2} autoComplete="address-line2" /></div>
        <div className="form-field"><label htmlFor="city">City</label><input id="city" name="city" defaultValue={user.profile.city} autoComplete="address-level2" required /></div>
        <div className="form-field"><label htmlFor="state">State</label><input id="state" name="state" defaultValue={user.profile.state} autoComplete="address-level1" required /></div>
      </div></section>
      <aside className="panel order-summary checkout-summary"><div className="checkout-step"><span>02</span><div><h2>Review & payment</h2><p>Sandbox confirmation only.</p></div></div><div className="demo-payment"><CreditCard /><div><strong>Demo payment</strong><span>No card details or real funds are used.</span></div></div>{items.map((item) => <div className="checkout-item" key={item.bookId}><span>{item.quantity} × {item.title}</span><strong>{formatCurrency(item.price * item.quantity)}</strong></div>)}<div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(totals.subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{totals.shipping ? formatCurrency(totals.shipping) : "Free"}</strong></div><div className="summary-row summary-row--total"><span>Total</span><strong>{formatCurrency(totals.total)}</strong></div><button className="button button--primary" disabled={pending}><LockKeyhole size={17} /> {pending ? "Placing demo order…" : `Place demo order · ${formatCurrency(totals.total)}`}</button><p className="checkout-disclaimer">Demo store — no real purchases are processed.</p></aside>
    </form>
  );
}
