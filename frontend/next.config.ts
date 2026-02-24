import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No 'output: export' needed — Vercel and Netlify both handle Next.js SSR natively
};

export default nextConfig;
