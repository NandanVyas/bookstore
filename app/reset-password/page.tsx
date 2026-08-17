import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/password-reset-forms";
export const metadata = { title: "Reset password", robots: { index: false, follow: false } };
export default function ResetPasswordPage() { return <div className="auth-layout"><section className="auth-layout__art"><div><span className="eyebrow">SECURE RESET</span><h1>Choose a new<br /><em>password.</em></h1><p>Completing the reset invalidates existing signed-in sessions.</p></div></section><section className="auth-layout__form"><div className="auth-card"><span className="eyebrow">NEW PASSWORD</span><h2>Secure your account</h2><p>Use a unique password you do not use elsewhere.</p><Suspense><ResetPasswordForm /></Suspense></div></section></div>; }
