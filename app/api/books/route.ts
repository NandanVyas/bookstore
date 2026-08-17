import { bookQuerySchema, createBookSchema } from "@/schemas/book";
import { createBook, listBooks } from "@/services/book-service";
import { requireAdmin } from "@/services/user-service";
import { assertSameOrigin, handleApiError, ok, readJson } from "@/lib/http";

export async function GET(request: Request) {
  try {
    const search = Object.fromEntries(new URL(request.url).searchParams.entries());
    return ok(await listBooks(bookQuerySchema.parse(search)));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const input = createBookSchema.parse(await readJson(request));
    return ok({ book: await createBook(input) }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
