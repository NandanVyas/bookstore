import "server-only";
import CartModel from "@/models/Cart";
import BookModel from "@/models/Book";
import { prepareBookDatabase } from "@/services/book-compatibility";
import type { CartItem } from "@/types";

type CartInput = { bookId: string; quantity: number }[];

export async function saveCart(userId: string, items: CartInput): Promise<CartItem[]> {
  await prepareBookDatabase();
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
  await prepareBookDatabase();
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
  await prepareBookDatabase();
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
    isActive: true,
  }).lean();
  const quantities = new Map(items.map((item) => [item.bookId, item.quantity]));
  return books.map((book) => ({
    bookId: book._id.toString(),
    slug: book.slug,
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl ?? "",
    price: book.price,
    stock: book.stock,
    quantity: Math.max(1, Math.min(quantities.get(book._id.toString()) ?? 1, book.stock || 1, 10)),
  }));
}
