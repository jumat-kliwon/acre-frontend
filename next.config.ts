import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "akademicreator.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      }
    ]
  }
};

export default nextConfig;
