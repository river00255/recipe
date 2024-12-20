/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/**',
      },
    ],
  },
};

export default nextConfig;
