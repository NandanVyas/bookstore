import { z } from "zod";

const coverUrlSchema = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => {
      if (!value || /^\/(?!\/)/.test(value)) return true;
      try {
        const url = new URL(value);
        return url.protocol === "https:" && [
          "covers.openlibrary.org",
          "images-na.ssl-images-amazon.com",
          "m.media-amazon.com",
        ].includes(url.hostname);
      } catch {
        return false;
      }
    },
    "Use a local path or an approved HTTPS book-cover host.",
  );

const optionalNonNegativeInteger = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().nonnegative().optional(),
);

const optionalPositiveInteger = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().positive().max(20_000).optional(),
);

const optionalTrimmedString = (maxLength: number) => z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().max(maxLength).optional(),
);

const bookFields = {
  title: z.string().trim().min(1).max(180),
  author: z.string().trim().min(1).max(120),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  description: z.string().trim().min(20).max(5_000),
  price: z.coerce.number().int().nonnegative().max(1_000_000),
  category: z.string().trim().min(1).max(80),
  stock: z.coerce.number().int().nonnegative().max(100_000),
  coverUrl: coverUrlSchema,
  isbn: optionalTrimmedString(20),
  publisher: optionalTrimmedString(120),
  language: optionalTrimmedString(60),
  pages: optionalPositiveInteger,
  featured: z.boolean(),
};

export const createBookSchema = z.object({
  ...bookFields,
  coverUrl: coverUrlSchema.default(""),
  featured: z.boolean().default(false),
});

export const updateBookSchema = z.object(bookFields).partial().refine(
  (value) => Object.keys(value).length > 0,
  "Provide at least one field to update.",
);

export const bookQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  title: z.string().trim().max(100).optional(),
  category: z.string().trim().max(80).optional(),
  minPrice: optionalNonNegativeInteger,
  maxPrice: optionalNonNegativeInteger,
  availability: z.enum(["in-stock", "all"]).default("all"),
  sort: z.enum(["featured", "newest", "price-asc", "price-desc"]).default("featured"),
  limit: z.coerce.number().int().min(1).max(100).default(48),
});
