import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  webpack: function (config) {
    Object.assign(config.module, {
      noParse: [/alasql/]
    });
    return config;
  },
};

// export default nextConfig;
module.exports = nextConfig
