// next.config.js
/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, './src');
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  transpilePackages: ['next-auth'],
  compiler: {
    removeConsole:
      process.env.NEXT_PUBLIC_DEPLOY_ENVIRONMENT === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
};

module.exports = nextConfig;
