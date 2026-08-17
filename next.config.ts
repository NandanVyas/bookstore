import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/all", destination: "/books", permanent: true },
      { source: "/cpp", destination: "/books?category=cpp", permanent: true },
      { source: "/java", destination: "/books?category=java", permanent: true },
      { source: "/python", destination: "/books?category=python", permanent: true },
      { source: "/others", destination: "/books?category=others", permanent: true },
      { source: "/search", destination: "/books", permanent: true },
      { source: "/product/:slug", destination: "/books/:slug", permanent: true },
      { source: "/profile", destination: "/account", permanent: true },
      { source: "/signup", destination: "/register", permanent: true },
      { source: "/forgotPassword", destination: "/forgot-password", permanent: true },
      { source: "/termsNc", destination: "/terms", permanent: true },
      { source: "/returnpolicy", destination: "/returns", permanent: true },
      { source: "/order", destination: "/orders", permanent: false }
    ];
  },
};

export default nextConfig;
