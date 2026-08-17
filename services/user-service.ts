import "server-only";
import { cache } from "react";
import { connectDB } from "@/lib/db";
import { ApiError } from "@/lib/http";
import { getSession } from "@/lib/auth/session";
import UserModel from "@/models/User";
import type { PublicUser, SessionData } from "@/types";

type LeanUser = {
  _id: { toString(): string };
  name: string;
  email: string;
  role: "user" | "admin";
  sessionVersion: number;
  profile?: {
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
};

export function toPublicUser(user: LeanUser): PublicUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    profile: {
      phone: user.profile?.phone ?? "",
      addressLine1: user.profile?.addressLine1 ?? "",
      addressLine2: user.profile?.addressLine2 ?? "",
      city: user.profile?.city ?? "",
      state: user.profile?.state ?? "",
      postalCode: user.profile?.postalCode ?? "",
    },
  };
}

export const getCurrentUser = cache(async (): Promise<PublicUser | null> => {
  const session = await getSession();
  if (!session) return null;

  try {
    await connectDB();
    const user = (await UserModel.findById(session.id).lean()) as LeanUser | null;
    if (!user || user.sessionVersion !== session.sessionVersion) return null;
    return toPublicUser(user);
  } catch {
    return null;
  }
});

export async function requireUser(): Promise<PublicUser> {
  const user = await getCurrentUser();
  if (!user) throw new ApiError(401, "UNAUTHENTICATED", "Please sign in to continue.");
  return user;
}

export async function requireAdmin(): Promise<PublicUser> {
  const user = await requireUser();
  if (user.role !== "admin") {
    throw new ApiError(403, "FORBIDDEN", "Administrator access is required.");
  }
  return user;
}

export function toSessionData(user: LeanUser): SessionData {
  return {
    id: user._id.toString(),
    role: user.role,
    sessionVersion: user.sessionVersion,
  };
}
