import { objectIdSchema } from "@/schemas/common";
import { updateOrderStatusSchema } from "@/schemas/order";
import { getOrder, setOrderStatus } from "@/services/order-service";
import { requireAdmin, requireUser } from "@/services/user-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  try {
    const user = await requireUser();
    const id = objectIdSchema.parse((await params).id);
    return ok({ order: await getOrder(id, user.id, user.role === "admin") });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: Context) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const id = objectIdSchema.parse((await params).id);
    const { status } = updateOrderStatusSchema.parse(await readJson(request));
    return ok({ order: await setOrderStatus(id, status) });
  } catch (error) {
    return handleApiError(error);
  }
}
