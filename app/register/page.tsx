import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Create account", robots: { index: false, follow: false } };
export default function RegisterPage() {
  return <div className="auth-layout"><section className="auth-layout__art"><div><span className="eyebrow">JOIN THE BOOKSTORE</span><h1>Make room for<br /><em>what’s next.</em></h1><p>Create a secure account to sync your cart, place demo orders, and manage your profile.</p></div><div className="auth-art__quote">Your password is protected with Argon2id and is never recoverable.</div></section><section className="auth-layout__form"><div className="auth-card"><span className="eyebrow">CREATE ACCOUNT</span><h2>Start reading</h2><p>No payment details are required for this demo store.</p><RegisterForm /><div className="auth-card__footer">Already registered? <Link href="/login">Sign in</Link></div></div></section></div>;
}
