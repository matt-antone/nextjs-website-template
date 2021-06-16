const generateSitemap = require('./scripts/generate-sitemap')
const withMDX = require('@next/mdx')()

module.exports = {
  compress: true,
  target: 'serverless',
  future: {
    webpack5: true,
  },
  // optimizeFonts: true,
  experiments: {
    topLevelAwait: true,
  },
  // trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateSitemap();
    }
    return config;
  }
}

