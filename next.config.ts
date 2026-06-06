import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Local images in /public are served directly — no remote domains needed
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
