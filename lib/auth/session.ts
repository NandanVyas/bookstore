import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { getRequiredEnv } from "@/lib/env";
import type { SessionData } from "@/types";

export const SESSION_COOKIE = "nv_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const issuer = "nv-bookstore";
const audience = "nv-bookstore-web";

function signingKey() {
  const secret = getRequiredEnv("AUTH_SECRET");
  if (secret.length < 32) throw new Error("AUTH_SECRET must contain at least 32 characters.");
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(session: SessionData): Promise<string> {
  return new SignJWT({
    role: session.role,
    sessionVersion: session.sessionVersion,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(session.id)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(signingKey());
}

export async function verifySessionToken(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, signingKey(), { issuer, audience });
    if (
      !payload.sub ||
      (payload.role !== "user" && payload.role !== "admin") ||
      typeof payload.sessionVersion !== "number"
    ) {
      return null;
    }
    return {
      id: payload.sub,
      role: payload.role,
      sessionVersion: payload.sessionVersion,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return value ? verifySessionToken(value) : null;
}

export async function setSessionCookie(session: SessionData) {
  const token = await createSessionToken(session);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    priority: "high",
  });
}

export async function clearSessionCookie() {
  (await cookies()).set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
