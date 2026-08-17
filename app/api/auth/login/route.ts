import { loginSchema } from "@/schemas/auth";
import { authenticateUser } from "@/services/auth-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";
import { setSessionCookie } from "@/lib/auth/session";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    assertSameOrigin(request);
    enforceRateLimit(request, "login", 10, 10 * 60_000);
    const input = loginSchema.parse(await readJson(request));
    const { user, session } = await authenticateUser(input);
    await setSessionCookie(session);
    return ok({ user });
  } catch (error) {
    return handleApiError(error, requestId);
  }
}
