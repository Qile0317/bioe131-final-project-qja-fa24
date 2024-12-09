import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.GITHUB_ACTIONS ? '/bioe131-final-project-qja-fa24' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/bioe131-final-project-qja-fa24' : '',
};

export default nextConfig;
