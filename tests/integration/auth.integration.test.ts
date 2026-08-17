import mongoose from "mongoose";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const hasDatabase = Boolean(process.env.TEST_MONGODB_URI);

describe.runIf(hasDatabase)("authentication integration", () => {
  beforeAll(async () => { process.env.MONGODB_URI = process.env.TEST_MONGODB_URI; const { connectDB } = await import("@/lib/db"); await connectDB(); const { default: UserModel } = await import("@/models/User"); await UserModel.deleteMany({ email: /@integration\.test$/ }); });
  afterAll(async () => { const { default: UserModel } = await import("@/models/User"); await UserModel.deleteMany({ email: /@integration\.test$/ }); await mongoose.disconnect(); });
  it("registers and authenticates without exposing a password hash", async () => { const { registerUser, authenticateUser } = await import("@/services/auth-service"); const email = `reader-${Date.now()}@integration.test`; const registered = await registerUser({ name: "Integration Reader", email, password: "integration2026" }); expect(registered.user).not.toHaveProperty("passwordHash"); const authenticated = await authenticateUser({ email, password: "integration2026" }); expect(authenticated.user.email).toBe(email); });
});
