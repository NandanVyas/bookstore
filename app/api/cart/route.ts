import { cartPayloadSchema } from "@/schemas/cart";
import { getCart, saveCart } from "@/services/cart-service";
import { requireUser } from "@/services/user-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

export async function GET() {
  try {
    const user = await requireUser();
    return ok({ items: await getCart(user.id) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const { items } = cartPayloadSchema.parse(await readJson(request));
    return ok({ items: await saveCart(user.id, items) });
  } catch (error) {
    return handleApiError(error);
  }
}
