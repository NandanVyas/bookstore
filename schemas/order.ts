import { z } from "zod";
import { objectIdSchema, phoneSchema, postalCodeSchema } from "@/schemas/common";

export const shippingAddressSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: phoneSchema,
  addressLine1: z.string().trim().min(5).max(160),
  addressLine2: z.string().trim().max(160).optional().default(""),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  postalCode: postalCodeSchema,
});

export const createOrderSchema = z.object({
  items: z
    .array(z.object({ bookId: objectIdSchema, quantity: z.coerce.number().int().min(1).max(10) }))
    .min(1)
    .max(50)
    .refine(
      (items) => new Set(items.map((item) => item.bookId)).size === items.length,
      "Each book may appear only once in an order.",
    ),
  shippingAddress: shippingAddressSchema,
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["placed", "processing", "shipped", "delivered", "cancelled"]),
});
