import "server-only";

export function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getDatabaseUri(): string {
  // The existing Vercel project still carries its original server-only name.
  // Prefer it during the V2 transition; new deployments use MONGODB_URI.
  return process.env.MONGO_URI?.trim() || getRequiredEnv("MONGODB_URI");
}

export function getAppUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
}
