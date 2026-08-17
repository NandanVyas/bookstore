import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/env";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: ["/", "/books", "/about", "/contact", "/privacy", "/terms"], disallow: ["/admin", "/account", "/checkout", "/orders", "/api"] }, sitemap: `${getAppUrl()}/sitemap.xml` }; }
