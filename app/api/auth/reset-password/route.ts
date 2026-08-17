import { resetPasswordSchema } from "@/schemas/auth";
import { resetPassword } from "@/services/auth-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";
import { clearSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const input = resetPasswordSchema.parse(await readJson(request));
    await resetPassword(input.token, input.password);
    await clearSessionCookie();
    return ok({ message: "Password updated. You can now sign in." });
  } catch (error) {
    return handleApiError(error);
  }
}
