import { assertSameOrigin, handleApiError, ok } from "@/lib/http";
import { clearSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await clearSessionCookie();
    return ok({ loggedOut: true });
  } catch (error) {
    return handleApiError(error);
  }
}
