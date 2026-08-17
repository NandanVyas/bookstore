"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email") }) });
      const body = await response.json();
      setMessage(response.ok ? body.data.message : body.error?.message ?? "Unable to request a reset link.");
    } catch { setMessage("Unable to request a reset link."); } finally { setPending(false); }
  }
  return <form onSubmit={submit}><div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required /></div>{message && <p className="form-success" role="status">{message}</p>}<button className="button button--primary" disabled={pending}>{pending ? "Requesting…" : "Send reset link"}</button></form>;
}

export function ResetPasswordForm() {
  const token = useSearchParams()?.get("token") ?? "";
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) { setMessage("Passwords do not match."); return; }
    setPending(true); setMessage("");
    try {
      const response = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password: data.get("password") }) });
      const body = await response.json(); setSuccess(response.ok); setMessage(response.ok ? body.data.message : body.error?.message ?? "Unable to reset the password.");
    } catch { setMessage("Unable to reset the password."); } finally { setPending(false); }
  }
  if (!token) return <div className="form-message" role="alert">This reset link is incomplete. Request a new one.</div>;
  if (success) return <div><p className="form-success" role="status">{message}</p><Link href="/login" className="button button--primary">Sign in</Link></div>;
  return <form onSubmit={submit}>{message && <div className="form-message" role="alert">{message}</div>}<div className="form-field"><label htmlFor="password">New password</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={10} pattern="(?=.*[A-Za-z])(?=.*\d).{10,128}" required /><small>At least 10 characters, including a letter and a number.</small></div><div className="form-field"><label htmlFor="confirmPassword">Confirm new password</label><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={10} required /></div><button className="button button--primary" disabled={pending}>{pending ? "Updating…" : "Update password"}</button></form>;
}
