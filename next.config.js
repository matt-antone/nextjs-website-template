const generateSitemap = require('./scripts/generate-sitemap')
const withMDX = require('@next/mdx')()

module.exports = {
  compress: true,
  target: 'serverless',
  future: {
    webpack5: true,
  },
  optimizeFonts: false,
  experiments: {
    topLevelAwait: true,
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/<cloud_name>/image/upload/',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateSitemap();
    }
    return config;
  }
}

