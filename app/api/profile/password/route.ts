import { changePasswordSchema } from "@/schemas/auth";
import { changePassword } from "@/services/auth-service";
import { requireUser } from "@/services/user-service";
import { clearSessionCookie } from "@/lib/auth/session";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const input = changePasswordSchema.parse(await readJson(request));
    await changePassword(user.id, input.currentPassword, input.newPassword);
    await clearSessionCookie();
    return ok({ message: "Password updated. Please sign in again." });
  } catch (error) {
    return handleApiError(error);
  }
}
