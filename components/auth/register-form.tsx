"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function RegisterForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), password: data.get("password") }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error?.message ?? "Unable to create your account.");
      router.push("/account");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to create your account.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit}>
      {error && <div className="form-message" role="alert">{error}</div>}
      <div className="form-field"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" minLength={2} maxLength={80} required /></div>
      <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="form-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={10} maxLength={128} pattern="(?=.*[A-Za-z])(?=.*\d).{10,128}" aria-describedby="password-hint" required /><small id="password-hint">At least 10 characters, including a letter and a number.</small></div>
      <div className="form-field"><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={10} required /></div>
      <button className="button button--primary" disabled={pending}>{pending ? "Creating account…" : "Create account"}</button>
    </form>
  );
}
