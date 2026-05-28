import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  allowedDevOrigins: [
    "*.replit.dev",
    "*.kirk.replit.dev",
    "*.janeway.replit.dev",
    "*.replit.app",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.replit.dev",
        "*.replit.dev:*",
        "*.kirk.replit.dev",
        "*.kirk.replit.dev:*",
        "*.janeway.replit.dev",
        "*.janeway.replit.dev:*",
        "*.replit.app",
        "*.replit.app:*",
        "localhost",
        "localhost:3000",
        "localhost:*",
      ],
    },
  },
};

export default nextConfig;
