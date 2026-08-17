import { describe, expect, it } from "vitest";
import { toBook } from "@/services/book-service";

describe("book compatibility", () => {
  it("maps the original persisted book fields to the V2 shape", () => {
    const createdAt = new Date("2022-10-01T00:00:00.000Z");
    const book = toBook({
      _id: { toString: () => "legacy-book-id" },
      title: "Legacy title",
      author: "Legacy author",
      slug: "legacy-title",
      desc: "Original catalogue description",
      img: "https://example.test/legacy-cover.jpg",
      price: 499,
      category: "java",
      availableQuantity: 7,
      createdAt,
    });

    expect(book).toMatchObject({
      id: "legacy-book-id",
      description: "Original catalogue description",
      coverUrl: "https://example.test/legacy-cover.jpg",
      stock: 7,
      featured: false,
      createdAt: createdAt.toISOString(),
    });
  });
});
