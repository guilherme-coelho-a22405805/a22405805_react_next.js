import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['deisishop.pythonanywhere.com'], // Autoriza o domínio da API
  },
};
module.exports = nextConfig;
export default nextConfig;
