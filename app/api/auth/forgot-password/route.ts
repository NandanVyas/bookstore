import { forgotPasswordSchema } from "@/schemas/auth";
import { requestPasswordReset } from "@/services/auth-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    enforceRateLimit(request, "forgot-password", 4, 15 * 60_000);
    const { email } = forgotPasswordSchema.parse(await readJson(request));
    await requestPasswordReset(email);
    return ok({ message: "If an account exists, a reset link has been sent." });
  } catch (error) {
    return handleApiError(error);
  }
}
