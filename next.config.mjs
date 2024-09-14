/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["*", "localhost:3000", "s6kt0pdb-3000.asse.devtunnels.ms"]
    }
  }
};

export default nextConfig;
