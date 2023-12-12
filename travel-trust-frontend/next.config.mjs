/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "images.pexels.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
  },
};

export default withPlaiceholder(nextConfig);
