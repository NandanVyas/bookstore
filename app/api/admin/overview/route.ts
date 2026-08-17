import { getAdminOverview } from "@/services/admin-service";
import { requireAdmin } from "@/services/user-service";
import { handleApiError, ok } from "@/lib/http";

export async function GET() {
  try {
    await requireAdmin();
    return ok(await getAdminOverview());
  } catch (error) {
    return handleApiError(error);
  }
}
