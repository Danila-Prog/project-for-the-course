/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    TOKEN: process.env.TOKEN,
    URL_API_ADDRESS: process.env.URL_ADDRESS,
  },
};

export default nextConfig;
