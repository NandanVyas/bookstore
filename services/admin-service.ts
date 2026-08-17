import "server-only";
import BookModel from "@/models/Book";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";
import { prepareBookDatabase } from "@/services/book-compatibility";

export async function getAdminOverview() {
  await prepareBookDatabase();
  const [books, lowStock, orders, users] = await Promise.all([
    BookModel.countDocuments({ isActive: true }),
    BookModel.countDocuments({ isActive: true, stock: { $lte: 5 } }),
    OrderModel.countDocuments(),
    UserModel.countDocuments(),
  ]);
  return { books, lowStock, orders, users };
}
