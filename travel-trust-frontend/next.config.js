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
  transpilePackages: ['@zama-fhe/relayer-sdk'],
  // Webpack configuration to exclude scripts
  webpack: (config, { dev, isServer }) => {
    // Exclude scripts directory from compilation
    config.module.rules.push({
      test: /\.(ts|js)$/,
      include: /scripts/,
      use: 'null-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
