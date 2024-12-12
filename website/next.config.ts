import type { NextConfig } from "next";

// if (typeof window !== 'undefined') {
//   isLocalhost = Boolean(
//     window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
//     window.location.hostname === '127.0.0.1'
//   );
// }


const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@jbrowse/core': require.resolve('@jbrowse/core'),
  //   };
  //   return config;
  // },
};

// export default nextConfig;
module.exports = nextConfig
