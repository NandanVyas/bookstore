import "server-only";
import { connectDB } from "@/lib/db";
import BookModel from "@/models/Book";

let compatibilityPromise: Promise<void> | null = null;

/**
 * Upgrade the original bookstore's persisted book shape in place. The update is
 * idempotent, so it is safe for more than one serverless instance to run it.
 */
export async function prepareBookDatabase(): Promise<void> {
  await connectDB();

  if (!compatibilityPromise) {
    compatibilityPromise = BookModel.collection
      .updateMany(
        {
          $or: [
            { description: { $exists: false }, desc: { $exists: true } },
            { coverUrl: { $exists: false }, img: { $exists: true } },
            { stock: { $exists: false }, availableQuantity: { $exists: true } },
            { featured: { $exists: false } },
            { isActive: { $exists: false } },
          ],
        },
        [
          {
            $set: {
              description: { $ifNull: ["$description", "$desc"] },
              coverUrl: { $ifNull: ["$coverUrl", "$img"] },
              stock: { $ifNull: ["$stock", "$availableQuantity"] },
              featured: { $ifNull: ["$featured", false] },
              isActive: { $ifNull: ["$isActive", true] },
            },
          },
        ],
      )
      .then(() => undefined)
      .catch((error: unknown) => {
        compatibilityPromise = null;
        throw error;
      });
  }

  await compatibilityPromise;
}
