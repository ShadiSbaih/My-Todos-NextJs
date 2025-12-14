/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true,
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  // Optimize images
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Production error handling
  productionBrowserSourceMaps: false,
  // Disable x-powered-by header
  reactStrictMode: true,
};

module.exports = config;