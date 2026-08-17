import { z } from "zod";
import { objectIdSchema } from "@/schemas/common";

export const cartPayloadSchema = z.object({
  items: z
    .array(
      z.object({
        bookId: objectIdSchema,
        quantity: z.coerce.number().int().min(1).max(10),
      }),
    )
    .max(50),
});
