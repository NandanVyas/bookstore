import "server-only";
import { connectDB } from "@/lib/db";
import BookModel from "@/models/Book";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";

export async function getAdminOverview() {
  await connectDB();
  const [books, lowStock, orders, users] = await Promise.all([
    BookModel.countDocuments({ isActive: { $ne: false } }),
    BookModel.countDocuments({
      isActive: { $ne: false },
      $or: [
        { stock: { $lte: 5 } },
        { stock: { $exists: false }, availableQuantity: { $lte: 5 } },
      ],
    }),
    OrderModel.countDocuments(),
    UserModel.countDocuments(),
  ]);
  return { books, lowStock, orders, users };
}
