import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image domains
  images: {
    domains: ['maps.googleapis.com', 'maps.gstatic.com'],
  },

  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Headers configuration
  async headers() {
    return [
      {
        source: '/api/placeholder/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
