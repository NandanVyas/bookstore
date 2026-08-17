import UserModel from "@/models/User";
import { connectDB } from "@/lib/db";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";
import { setSessionCookie } from "@/lib/auth/session";
import { profileSchema } from "@/schemas/profile";
import { requireUser, toPublicUser, toSessionData } from "@/services/user-service";

export async function GET() {
  try {
    return ok({ user: await requireUser() });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request);
    const current = await requireUser();
    const input = profileSchema.parse(await readJson(request));
    await connectDB();
    const user = await UserModel.findByIdAndUpdate(
      current.id,
      {
        name: input.name,
        profile: {
          phone: input.phone,
          addressLine1: input.addressLine1,
          addressLine2: input.addressLine2,
          city: input.city,
          state: input.state,
          postalCode: input.postalCode,
        },
      },
      { new: true, runValidators: true },
    );
    if (!user) throw new Error("User disappeared during profile update.");
    const lean = user.toObject();
    await setSessionCookie(toSessionData(lean));
    return ok({ user: toPublicUser(lean) });
  } catch (error) {
    return handleApiError(error);
  }
}
