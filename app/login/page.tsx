import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };
export default function LoginPage() {
  return <div className="auth-layout"><section className="auth-layout__art"><div><span className="eyebrow">WELCOME BACK</span><h1>Return to your<br /><em>reading list.</em></h1><p>Sign in securely to continue checkout, review orders, and keep your cart in sync.</p></div><div className="auth-art__quote">“A reader lives a thousand lives before he dies.”</div></section><section className="auth-layout__form"><div className="auth-card"><span className="eyebrow">YOUR ACCOUNT</span><h2>Sign in</h2><p>Use the email and password attached to your account.</p><Suspense><LoginForm /></Suspense><div className="auth-card__footer">New to NV Bookstore? <Link href="/register">Create an account</Link></div></div></section></div>;
}
