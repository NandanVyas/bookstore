import { registerSchema } from "@/schemas/auth";
import { registerUser } from "@/services/auth-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";
import { setSessionCookie } from "@/lib/auth/session";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    assertSameOrigin(request);
    enforceRateLimit(request, "register", 5, 10 * 60_000);
    const input = registerSchema.parse(await readJson(request));
    const { user, session } = await registerUser(input);
    await setSessionCookie(session);
    return ok({ user }, 201);
  } catch (error) {
    return handleApiError(error, requestId);
  }
}
