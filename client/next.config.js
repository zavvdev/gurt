/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    apiUrl: process.env.SERVER_API_ENDPOINT,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.CLIENT_API_ENDPOINT,
  },
};

module.exports = nextConfig;
