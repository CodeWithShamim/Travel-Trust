/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'cdn.pixabay.com',
      'images.unsplash.com',
      'source.unsplash.com',
    ],
  },
  productionBrowserSourceMaps: false,
  telemetry: false,
  // experimental: {
  //   serverActions: true, // if you use server actions
  //   turbo: true, // if you’re on Next 15+
  // },
  transpilePackages: ['@zama-fhe/relayer-sdk']

};

module.exports = nextConfig;
