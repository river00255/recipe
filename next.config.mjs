/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/uploadimg/**',
      },
    ],
  },
};

export default nextConfig;
