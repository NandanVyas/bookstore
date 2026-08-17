import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { connectDB } from "@/lib/db";
import { ApiError } from "@/lib/http";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import UserModel from "@/models/User";
import PasswordResetTokenModel from "@/models/PasswordResetToken";
import { sendPasswordResetEmail } from "@/services/email-service";
import { toPublicUser, toSessionData } from "@/services/user-service";
import type { PublicUser, SessionData } from "@/types";

const GENERIC_LOGIN_ERROR = "Invalid email or password.";
const tokenDigest = (token: string) => createHash("sha256").update(token).digest("hex");

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: PublicUser; session: SessionData }> {
  await connectDB();
  if (await UserModel.exists({ email: input.email })) {
    throw new ApiError(409, "EMAIL_IN_USE", "An account with this email already exists.");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await (async () => {
    try {
      return await UserModel.create({
        name: input.name,
        email: input.email,
        passwordHash,
        role: "user",
      });
    } catch (error) {
      if (typeof error === "object" && error && "code" in error && error.code === 11000) {
        throw new ApiError(409, "EMAIL_IN_USE", "An account with this email already exists.");
      }
      throw error;
    }
  })();
  const lean = user.toObject();
  return { user: toPublicUser(lean), session: toSessionData(lean) };
}

export async function authenticateUser(input: {
  email: string;
  password: string;
}): Promise<{ user: PublicUser; session: SessionData }> {
  await connectDB();
  const user = await UserModel.findOne({ email: input.email }).select("+passwordHash");
  if (!user?.passwordHash || !(await verifyPassword(user.passwordHash, input.password))) {
    throw new ApiError(401, "INVALID_CREDENTIALS", GENERIC_LOGIN_ERROR);
  }

  const lean = user.toObject();
  return { user: toPublicUser(lean), session: toSessionData(lean) };
}

export async function requestPasswordReset(email: string): Promise<void> {
  await connectDB();
  const user = await UserModel.findOne({ email }).lean();
  if (!user) return;

  const token = randomBytes(32).toString("base64url");
  await PasswordResetTokenModel.deleteMany({ userId: user._id });
  await PasswordResetTokenModel.create({
    userId: user._id,
    tokenHash: tokenDigest(token),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  });
  await sendPasswordResetEmail(email, token);
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await connectDB();
  const candidate = await PasswordResetTokenModel.findOne({
    tokenHash: tokenDigest(token),
    usedAt: { $exists: false },
    expiresAt: { $gt: new Date() },
  }).select("_id userId");

  if (!candidate) {
    throw new ApiError(400, "INVALID_RESET_TOKEN", "This password reset link is invalid or expired.");
  }

  const passwordHash = await hashPassword(password);
  const resetToken = await PasswordResetTokenModel.findOneAndUpdate(
    { _id: candidate._id, usedAt: { $exists: false }, expiresAt: { $gt: new Date() } },
    { $set: { usedAt: new Date() } },
    { new: true },
  );
  if (!resetToken) {
    throw new ApiError(400, "INVALID_RESET_TOKEN", "This password reset link is invalid or expired.");
  }

  await UserModel.updateOne(
    { _id: resetToken.userId },
    {
      $set: { passwordHash },
      $unset: { password: "" },
      $inc: { sessionVersion: 1 },
    },
  );
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  await connectDB();
  const user = await UserModel.findById(userId).select("+passwordHash");
  if (!user?.passwordHash || !(await verifyPassword(user.passwordHash, currentPassword))) {
    throw new ApiError(400, "INCORRECT_PASSWORD", "The current password is incorrect.");
  }
  user.passwordHash = await hashPassword(newPassword);
  user.sessionVersion += 1;
  await user.save();
}
