import type { CartItem } from "@/types";

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING = 99;

export function calculateSubtotal(items: Pick<CartItem, "price" | "quantity">[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return STANDARD_SHIPPING;
}

export function calculateOrderTotal(items: Pick<CartItem, "price" | "quantity">[]) {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}

export function clampQuantity(quantity: number, stock: number): number {
  return Math.max(1, Math.min(Math.floor(quantity), Math.max(stock, 1), 10));
}
