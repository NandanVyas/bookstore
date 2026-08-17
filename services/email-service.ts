import "server-only";
import { getAppUrl } from "@/lib/env";
import { logger } from "@/lib/logger";

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!apiKey || !from) {
    logger.warn("password_reset_email_not_configured");
    return false;
  }

  const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Reset your NV Bookstore password",
      text: `A password reset was requested for your NV Bookstore account. Use this link within 30 minutes: ${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    }),
  });

  if (!response.ok) {
    logger.error("password_reset_email_failed", undefined, { status: response.status });
    return false;
  }
  return true;
}
