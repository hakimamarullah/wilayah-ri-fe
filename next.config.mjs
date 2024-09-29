/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS
        ? process.env.NEXT_PUBLIC_ALLOWED_ORIGINS.split(',')
        : []
    }
  },
  env: {
    AUTH_SERVICE_SERVER: process.env.NEXT_PUBLIC_AUTH_SERVICE_SERVER
  }
};

export default nextConfig;