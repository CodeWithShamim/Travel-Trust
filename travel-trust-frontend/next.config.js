/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn.pixabay.com", "images.unsplash.com"],
  },
  productionBrowserSourceMaps: false,
  telemetry: false,
  experimental: {
    serverActions: true, // if you use server actions
    turbo: true, // if you’re on Next 15+
  },
};

module.exports = nextConfig;
