import "server-only";
import { cache } from "react";
import type { SortOrder } from "mongoose";
import { connectDB } from "@/lib/db";
import { ApiError } from "@/lib/http";
import BookModel from "@/models/Book";
import type { Book } from "@/types";

type BookQuery = {
  q?: string;
  title?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availability: "in-stock" | "all";
  sort: "featured" | "newest" | "price-asc" | "price-desc";
  limit: number;
};

type LeanBook = {
  _id: { toString(): string };
  title: string;
  author: string;
  slug: string;
  description?: string;
  desc?: string;
  price: number;
  category: string;
  stock?: number;
  availableQuantity?: number;
  coverUrl?: string;
  img?: string;
  isbn?: string;
  publisher?: string;
  language?: string;
  pages?: number;
  featured?: boolean;
  createdAt: Date;
};

export function toBook(book: LeanBook): Book {
  return {
    id: book._id.toString(),
    title: book.title,
    author: book.author,
    slug: book.slug,
    description: book.description ?? book.desc ?? "",
    price: book.price,
    category: book.category,
    stock: book.stock ?? book.availableQuantity ?? 0,
    coverUrl: book.coverUrl ?? book.img ?? "",
    isbn: book.isbn || undefined,
    publisher: book.publisher || undefined,
    language: book.language || undefined,
    pages: book.pages || undefined,
    featured: Boolean(book.featured),
    createdAt: book.createdAt.toISOString(),
  };
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function listBooks(query: BookQuery): Promise<{ books: Book[]; categories: string[] }> {
  await connectDB();
  const filter: {
    isActive: { $ne: boolean };
    $or?: Array<{ title?: RegExp; author?: RegExp; isbn?: RegExp }>;
    $and?: Array<{
      $or: Array<{
        stock?: { $gt?: number; $exists?: boolean };
        availableQuantity?: { $gt: number };
      }>;
    }>;
    category?: RegExp;
    price?: { $gte?: number; $lte?: number };
  } = { isActive: { $ne: false } };
  const search = query.q || query.title;
  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    filter.$or = [{ title: regex }, { author: regex }, { isbn: regex }];
  }
  if (query.category) filter.category = new RegExp(`^${escapeRegex(query.category)}$`, "i");
  if (query.availability === "in-stock") {
    filter.$and = [{
      $or: [
        { stock: { $gt: 0 } },
        { stock: { $exists: false }, availableQuantity: { $gt: 0 } },
      ],
    }];
  }
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    filter.price = {};
    if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
    if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
  }

  const sorts: Record<BookQuery["sort"], Record<string, SortOrder>> = {
    featured: { featured: -1, createdAt: -1 },
    newest: { createdAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
  };

  const [records, categories] = await Promise.all([
    BookModel.find(filter).sort(sorts[query.sort]).limit(query.limit).lean(),
    BookModel.distinct("category", { isActive: { $ne: false } }),
  ]);
  return {
    books: (records as unknown as LeanBook[]).map(toBook),
    categories: categories.sort((a, b) => a.localeCompare(b)),
  };
}

export async function getFeaturedBooks(limit = 4): Promise<Book[]> {
  await connectDB();
  const records = await BookModel.find({ isActive: { $ne: false } }).sort({ featured: -1, createdAt: -1 }).limit(limit).lean();
  return (records as unknown as LeanBook[]).map(toBook);
}

export const getBookBySlug = cache(async (slug: string): Promise<Book | null> => {
  await connectDB();
  const record = await BookModel.findOne({ slug, isActive: { $ne: false } }).lean();
  return record ? toBook(record as unknown as LeanBook) : null;
});

export async function createBook(input: Record<string, unknown>): Promise<Book> {
  await connectDB();
  try {
    const record = await BookModel.create(input);
    return toBook(record.toObject() as unknown as LeanBook);
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === 11000) {
      throw new ApiError(409, "BOOK_EXISTS", "A book with this slug or ISBN already exists.");
    }
    throw error;
  }
}

export async function updateBook(id: string, input: Record<string, unknown>): Promise<Book> {
  await connectDB();
  const record = await BookModel.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  if (!record) throw new ApiError(404, "BOOK_NOT_FOUND", "Book not found.");
  return toBook(record.toObject() as unknown as LeanBook);
}

export async function archiveBook(id: string): Promise<void> {
  await connectDB();
  const result = await BookModel.updateOne({ _id: id }, { isActive: false });
  if (!result.matchedCount) throw new ApiError(404, "BOOK_NOT_FOUND", "Book not found.");
}
