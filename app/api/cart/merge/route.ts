import { cartPayloadSchema } from "@/schemas/cart";
import { mergeCart } from "@/services/cart-service";
import { requireUser } from "@/services/user-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const { items } = cartPayloadSchema.parse(await readJson(request));
    return ok({ items: await mergeCart(user.id, items) });
  } catch (error) {
    return handleApiError(error);
  }
}
