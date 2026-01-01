import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Reverted
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['pdfjs-dist', 'canvas'],
};

export default nextConfig;
