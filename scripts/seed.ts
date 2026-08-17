import { connectDB } from "@/lib/db";
import BookModel from "@/models/Book";
import { seedBooks } from "@/data/seed-books";

async function main() {
  await connectDB();
  if (process.argv.includes("--reset")) await BookModel.deleteMany({});
  for (const book of seedBooks) {
    await BookModel.updateOne({ slug: book.slug }, { $set: { ...book, isActive: true } }, { upsert: true, runValidators: true });
  }
  console.info(`Seeded ${seedBooks.length} catalogue records.`);
  process.exit(0);
}

main().catch((error) => { console.error(error instanceof Error ? error.message : "Seed failed."); process.exit(1); });
