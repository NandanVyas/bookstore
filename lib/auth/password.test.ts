import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

describe("password hashing", () => {
  it("creates a non-reversible Argon2id hash and verifies it", async () => { const password = "strong-password-2026"; const hash = await hashPassword(password); expect(hash).toMatch(/^\$argon2id\$/); expect(hash).not.toContain(password); await expect(verifyPassword(hash, password)).resolves.toBe(true); await expect(verifyPassword(hash, "wrong-password")).resolves.toBe(false); });
});
