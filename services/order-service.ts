import "server-only";
import { randomBytes } from "node:crypto";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import { ApiError } from "@/lib/http";
import { calculateShipping } from "@/lib/cart";
import BookModel from "@/models/Book";
import CartModel from "@/models/Cart";
import OrderModel from "@/models/Order";
import type { Order, OrderItem, ShippingAddress } from "@/types";

type OrderInput = { bookId: string; quantity: number }[];

type OrderBook = {
  _id: { toString(): string };
  slug: string;
  title: string;
  author: string;
  coverUrl?: string;
  img?: string;
  price: number;
  stock?: number;
  availableQuantity?: number;
};

type LeanOrder = {
  _id: { toString(): string };
  orderNumber: string;
  items: Array<{
    bookId: { toString(): string };
    slug: string;
    title: string;
    author: string;
    coverUrl?: string;
    priceAtPurchase: number;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  status: Order["status"];
  paymentStatus: Order["paymentStatus"];
  createdAt: Date;
  updatedAt: Date;
};

export function toOrder(order: LeanOrder): Order {
  return {
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    items: order.items.map((item) => ({
      bookId: item.bookId.toString(),
      slug: item.slug,
      title: item.title,
      author: item.author,
      coverUrl: item.coverUrl ?? "",
      priceAtPurchase: item.priceAtPurchase,
      quantity: item.quantity,
    })),
    shippingAddress: order.shippingAddress,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    status: order.status,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

function orderNumber() {
  const year = new Date().getFullYear();
  return `NV-${year}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function createDemoOrder(
  userId: string,
  input: OrderInput,
  shippingAddress: ShippingAddress,
): Promise<Order> {
  await connectDB();
  const ids = input.map((item) => item.bookId);
  const books = (await BookModel.find({
    _id: { $in: ids },
    isActive: { $ne: false },
  }).lean()) as unknown as OrderBook[];
  if (books.length !== new Set(ids).size) {
    throw new ApiError(400, "INVALID_CART", "One or more books are no longer available.");
  }

  const byId = new Map(books.map((book) => [book._id.toString(), book]));
  const snapshots: OrderItem[] = input.map((item) => {
    const book = byId.get(item.bookId);
    const stock = book?.stock ?? book?.availableQuantity ?? 0;
    if (!book || stock < item.quantity) {
      throw new ApiError(409, "INSUFFICIENT_STOCK", `${book?.title ?? "A book"} is no longer available in that quantity.`);
    }
    return {
      bookId: item.bookId,
      slug: book.slug,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl ?? book.img ?? "",
      priceAtPurchase: book.price,
      quantity: item.quantity,
    };
  });

  const decremented: {
    bookId: string;
    quantity: number;
    stockField: "stock" | "availableQuantity";
  }[] = [];
  try {
    for (const item of input) {
      const book = byId.get(item.bookId);
      const stockField = book?.stock === undefined ? "availableQuantity" : "stock";
      const updated = await BookModel.collection.findOneAndUpdate(
        {
          _id: new Types.ObjectId(item.bookId),
          isActive: { $ne: false },
          [stockField]: { $gte: item.quantity },
        },
        { $inc: { [stockField]: -item.quantity } },
      );
      if (!updated) throw new ApiError(409, "INSUFFICIENT_STOCK", "Stock changed while placing the order. Please review your cart.");
      decremented.push({ ...item, stockField });
    }

    const subtotal = snapshots.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0,
    );
    const shipping = calculateShipping(subtotal);
    const record = await OrderModel.create({
      userId,
      orderNumber: orderNumber(),
      items: snapshots,
      shippingAddress,
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "placed",
      paymentStatus: "demo_paid",
      paymentReference: `DEMO-${randomBytes(8).toString("hex").toUpperCase()}`,
    });
    await CartModel.updateOne({ userId }, { items: [] });
    return toOrder(record.toObject() as unknown as LeanOrder);
  } catch (error) {
    if (decremented.length) {
      await Promise.all(
        decremented.map((item) =>
          BookModel.collection.updateOne(
            { _id: new Types.ObjectId(item.bookId) },
            { $inc: { [item.stockField]: item.quantity } },
          ),
        ),
      );
    }
    throw error;
  }
}

export async function listOrders(userId: string, all = false): Promise<Order[]> {
  await connectDB();
  const records = await OrderModel.find(all ? {} : { userId }).sort({ createdAt: -1 }).lean();
  return (records as unknown as LeanOrder[]).map(toOrder);
}

export async function getOrder(id: string, userId: string, admin = false): Promise<Order> {
  await connectDB();
  const record = await OrderModel.findOne(admin ? { _id: id } : { _id: id, userId }).lean();
  if (!record) throw new ApiError(404, "ORDER_NOT_FOUND", "Order not found.");
  return toOrder(record as unknown as LeanOrder);
}

export async function setOrderStatus(id: string, status: Order["status"]): Promise<Order> {
  await connectDB();
  const record = await OrderModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();
  if (!record) throw new ApiError(404, "ORDER_NOT_FOUND", "Order not found.");
  return toOrder(record as unknown as LeanOrder);
}
