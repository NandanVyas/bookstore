import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout-form";
import { getCurrentUser } from "@/services/user-service";

export const metadata = { title: "Checkout", robots: { index: false, follow: false } };
export default async function CheckoutPage() { const user = await getCurrentUser(); if (!user) redirect("/login?next=/checkout"); return <><div className="demo-banner">Demo store — no real purchases are processed.</div><div className="app-page shell"><header className="app-page__header"><span className="eyebrow">SECURE CHECKOUT</span><h1>Complete your demo order</h1><p>Stock and pricing are verified again on the server before the order is recorded.</p></header><CheckoutForm user={user} /></div></>; }
