import { model, models, Schema, type InferSchemaType } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    author: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true, maxlength: 5_000 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, index: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    coverUrl: { type: String, default: "", trim: true },
    isbn: { type: String, trim: true, sparse: true, unique: true },
    publisher: { type: String, trim: true },
    language: { type: String, trim: true },
    pages: { type: Number, min: 1 },
    featured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

bookSchema.index({ title: "text", author: "text", isbn: "text" });
bookSchema.index({ category: 1, isActive: 1, createdAt: -1 });

export type BookDocument = InferSchemaType<typeof bookSchema> & { _id: Schema.Types.ObjectId };
const BookModel = models.Book || model("Book", bookSchema);
export default BookModel;
