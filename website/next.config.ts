import type { NextConfig } from "next";

// const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
// const repoName = 'bioe131-final-project-qja-fa24';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // basePath: isGithubActions ? `/${repoName}` : '',
  // assetPrefix: isGithubActions ? `/${repoName}` : '',
};

// export default nextConfig;
module.exports = nextConfig
