import { describe, expect, it } from "vitest";
import { registerSchema } from "@/schemas/auth";
import { bookQuerySchema, createBookSchema } from "@/schemas/book";
import { createOrderSchema, shippingAddressSchema } from "@/schemas/order";

describe("request validation", () => {
  it("normalizes registration email", () => { expect(registerSchema.parse({ name: "Nandan Vyas", email: "  OWNER@EXAMPLE.COM ", password: "portfolio2026" }).email).toBe("owner@example.com"); });
  it("rejects a weak password", () => { expect(registerSchema.safeParse({ name: "NV", email: "nv@example.com", password: "short" }).success).toBe(false); });
  it("rejects invalid price and stock", () => { expect(createBookSchema.safeParse({ title: "A Book", author: "An Author", slug: "a-book", description: "A sufficiently long description for a book.", price: -1, category: "General", stock: -2, coverUrl: "" }).success).toBe(false); });
  it("treats blank catalogue prices as absent filters", () => { expect(bookQuerySchema.parse({ minPrice: "", maxPrice: "" })).toMatchObject({ minPrice: undefined, maxPrice: undefined }); });
  it("rejects duplicate book lines in an order", () => { const bookId = "507f1f77bcf86cd799439011"; expect(createOrderSchema.safeParse({ items: [{ bookId, quantity: 1 }, { bookId, quantity: 1 }], shippingAddress: { name: "Reader Name", phone: "+91 9876543210", addressLine1: "42 Library Road", city: "Delhi", state: "Delhi", postalCode: "012345" } }).success).toBe(false); });
  it("validates Indian postal codes without coercing away leading zeroes", () => { expect(shippingAddressSchema.safeParse({ name: "Reader Name", phone: "+91 9876543210", addressLine1: "42 Library Road", city: "Delhi", state: "Delhi", postalCode: "012345" }).success).toBe(true); });
});
