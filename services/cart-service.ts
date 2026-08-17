import "server-only";
import { connectDB } from "@/lib/db";
import CartModel from "@/models/Cart";
import BookModel from "@/models/Book";
import type { CartItem } from "@/types";

type CartInput = { bookId: string; quantity: number }[];

export async function saveCart(userId: string, items: CartInput): Promise<CartItem[]> {
  await connectDB();
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.bookId, item])).values(),
  );
  await CartModel.findOneAndUpdate(
    { userId },
    { userId, items: uniqueItems },
    { upsert: true, runValidators: true },
  );
  return hydrateCart(uniqueItems);
}

export async function mergeCart(userId: string, incoming: CartInput): Promise<CartItem[]> {
  await connectDB();
  const existing = await CartModel.findOne({ userId }).lean();
  const quantities = new Map<string, number>();
  const existingItems = (existing?.items ?? []) as Array<{ bookId: { toString(): string }; quantity: number }>;
  for (const item of existingItems) {
    quantities.set(item.bookId.toString(), item.quantity);
  }
  for (const item of incoming) {
    quantities.set(item.bookId, Math.min(10, (quantities.get(item.bookId) ?? 0) + item.quantity));
  }
  return saveCart(
    userId,
    Array.from(quantities, ([bookId, quantity]) => ({ bookId, quantity })),
  );
}

export async function getCart(userId: string): Promise<CartItem[]> {
  await connectDB();
  const cart = await CartModel.findOne({ userId }).lean();
  const storedItems = (cart?.items ?? []) as Array<{ bookId: { toString(): string }; quantity: number }>;
  return hydrateCart(
    storedItems.map((item) => ({
      bookId: item.bookId.toString(),
      quantity: item.quantity,
    })),
  );
}

async function hydrateCart(items: CartInput): Promise<CartItem[]> {
  if (!items.length) return [];
  const books = await BookModel.find({
    _id: { $in: items.map((item) => item.bookId) },
    isActive: { $ne: false },
  }).lean();
  const quantities = new Map(items.map((item) => [item.bookId, item.quantity]));
  return books.map((record) => {
    const book = record as typeof record & { img?: string; availableQuantity?: number };
    const stock = book.stock ?? book.availableQuantity ?? 0;
    return {
      bookId: book._id.toString(),
      slug: book.slug,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl ?? book.img ?? "",
      price: book.price,
      stock,
      quantity: Math.max(1, Math.min(quantities.get(book._id.toString()) ?? 1, stock || 1, 10)),
    };
  });
}
