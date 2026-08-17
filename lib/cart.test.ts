import { describe, expect, it } from "vitest";
import { calculateOrderTotal, calculateShipping, calculateSubtotal, clampQuantity } from "@/lib/cart";

describe("cart pricing", () => {
  it("calculates subtotal from current quantities", () => { expect(calculateSubtotal([{ price: 499, quantity: 2 }, { price: 699, quantity: 1 }])).toBe(1697); });
  it("charges standard shipping below the threshold", () => { expect(calculateShipping(998)).toBe(99); });
  it("makes shipping free at the threshold", () => { expect(calculateOrderTotal([{ price: 500, quantity: 2 }])).toEqual({ subtotal: 1000, shipping: 0, total: 1000 }); });
  it("clamps quantities to stock and the per-item maximum", () => { expect(clampQuantity(20, 4)).toBe(4); expect(clampQuantity(0, 10)).toBe(1); });
});
