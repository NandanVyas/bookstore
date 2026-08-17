import { z } from "zod";

export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid identifier.");
export const emailSchema = z.string().trim().toLowerCase().email().max(254);
export const passwordSchema = z
  .string()
  .min(10, "Use at least 10 characters.")
  .max(128, "Use at most 128 characters.")
  .regex(/[A-Za-z]/, "Include at least one letter.")
  .regex(/\d/, "Include at least one number.");

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s-]{7,18}$/, "Enter a valid phone number.");

export const postalCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter a valid six-digit postal code.");
