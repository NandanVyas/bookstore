import { z } from "zod";
import { phoneSchema, postalCodeSchema } from "@/schemas/common";

export const profileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.union([z.literal(""), phoneSchema]),
  addressLine1: z.string().trim().max(160),
  addressLine2: z.string().trim().max(160),
  city: z.string().trim().max(80),
  state: z.string().trim().max(80),
  postalCode: z.union([z.literal(""), postalCodeSchema]),
});
