import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed to support API Routes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
