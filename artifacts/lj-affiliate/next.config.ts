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
        "*.kirk.replit.dev",
        "*.janeway.replit.dev",
        "*.replit.app",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
