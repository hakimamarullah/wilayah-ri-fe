/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverActions: { allowedOrigins: ["*", "localhost:3001"], }
};

export default nextConfig;
