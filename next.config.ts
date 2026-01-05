import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lazorkit/wallet"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lazorkit/wallet': require.resolve('@lazorkit/wallet'),
    };
    return config;
  },
};

export default nextConfig;
