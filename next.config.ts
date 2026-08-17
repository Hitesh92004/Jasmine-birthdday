import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images from public folder (default behaviour)
    // Add remote patterns here if needed in future
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
  },
  // Ensure static export works for Vercel
};

export default nextConfig;
