import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    typescript: {
      ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
  images: {
      remotePatterns: [
          { hostname: 'img.clerk.com' }
      ]
  }
};

export default nextConfig;
