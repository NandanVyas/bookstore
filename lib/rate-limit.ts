import "server-only";
import { ApiError } from "@/lib/http";

type Bucket = { count: number; resetAt: number };

declare global {
  var authRateLimitBuckets: Map<string, Bucket> | undefined;
}

const buckets = global.authRateLimitBuckets ?? new Map<string, Bucket>();
global.authRateLimitBuckets = buckets;

export function enforceRateLimit(request: Request, action: string, limit = 8, windowMs = 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = `${action}:${ip}`;
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (current.count >= limit) {
    throw new ApiError(429, "RATE_LIMITED", "Too many attempts. Please wait and try again.");
  }
  current.count += 1;
}
