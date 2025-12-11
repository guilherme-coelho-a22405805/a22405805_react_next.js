import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deisishop.pythonanywhere.com', // Autoriza o domínio da API
      }
    ]
  },
};
module.exports = nextConfig;
export default nextConfig;
