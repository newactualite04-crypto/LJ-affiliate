import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  allowedDevOrigins: ["*.replit.dev", "*.janeway.replit.dev"],
  experimental: {
    serverActions: {
      allowedOrigins: ["*.replit.dev", "*.janeway.replit.dev", "localhost:3000"],
    },
  },
};

export default nextConfig;
