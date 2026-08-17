import { createOrderSchema } from "@/schemas/order";
import { createDemoOrder, listOrders } from "@/services/order-service";
import { requireUser } from "@/services/user-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

export async function GET() {
  try {
    const user = await requireUser();
    return ok({ orders: await listOrders(user.id) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const input = createOrderSchema.parse(await readJson(request));
    const order = await createDemoOrder(user.id, input.items, input.shippingAddress);
    return ok({ order }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
