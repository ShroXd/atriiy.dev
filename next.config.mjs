/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'bebopfzj.oss-cn-hangzhou.aliyuncs.com',
      },
    ],
  },
}

export default nextConfig
