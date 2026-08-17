import { objectIdSchema } from "@/schemas/common";
import { updateBookSchema } from "@/schemas/book";
import { archiveBook, updateBook } from "@/services/book-service";
import { requireAdmin } from "@/services/user-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const id = objectIdSchema.parse((await params).id);
    const input = updateBookSchema.parse(await readJson(request));
    return ok({ book: await updateBook(id, input) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const id = objectIdSchema.parse((await params).id);
    await archiveBook(id);
    return ok({ archived: true });
  } catch (error) {
    return handleApiError(error);
  }
}
