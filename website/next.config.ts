import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.GITHUB_ACTIONS ? '/website' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/website' : '',
};

export default nextConfig;
