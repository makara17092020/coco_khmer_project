import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/product",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
