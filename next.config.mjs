/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverActions: { allowedOrigins: ["*", "localhost:3000"], }
};

export default nextConfig;
