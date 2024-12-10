import type { NextConfig } from "next";

let isLocalhost = false;

if (typeof window !== 'undefined') {
  isLocalhost = Boolean(
    window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
    window.location.hostname === '127.0.0.1'
  );
}


const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isLocalhost ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: isLocalhost ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '',
  // basePath: isGithubActions ? `/${repoName}` : '',
  // assetPrefix: isGithubActions ? `/${repoName}` : '',
};

// export default nextConfig;
module.exports = nextConfig
