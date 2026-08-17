import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/env";
import { listBooks } from "@/services/book-service";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const base = getAppUrl(); const staticPages = ["", "/books", "/about", "/contact", "/privacy", "/terms"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/books" ? "daily" as const : "monthly" as const, priority: path === "" ? 1 : .7 })); try { const { books } = await listBooks({ availability: "all", sort: "newest", limit: 100 }); return [...staticPages, ...books.map((book) => ({ url: `${base}/books/${book.slug}`, lastModified: new Date(book.createdAt), changeFrequency: "weekly" as const, priority: .8 }))]; } catch { return staticPages; } }
