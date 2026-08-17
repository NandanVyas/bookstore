import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSession } from "@/lib/auth/session";
import { getAppUrl } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  title: { default: "NV Bookstore — Find your next great read", template: "%s | NV Bookstore" },
  description: "A thoughtfully curated demo bookstore with secure accounts, catalogue search, cart, orders, and inventory management.",
  applicationName: "NV Bookstore",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: "NV Bookstore",
    title: "NV Bookstore — Find your next great read",
    description: "A warm, modern bookstore for curious readers.",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "NV Bookstore — Find your next great read" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NV Bookstore",
    description: "A warm, modern bookstore for curious readers.",
    images: ["/og-card.png"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <CartProvider authenticated={Boolean(session)}>
          <SiteHeader session={session} />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
