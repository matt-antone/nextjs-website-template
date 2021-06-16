const { data } = require('autoprefixer');
const fs = require('fs');
const globby = require('globby');
const matter = require('gray-matter');

const baseUrl = {
  development: "http://localhost:3000",
  production: "https://navalign-next-js.vercel.app",
}[process.env.NODE_ENV];

const generateSitemap = async () => {
  // Fetch all routes based on patterns
  // Your folder structure might be different so change bellow to match your needs
  const pages = await globby([
    'pages/**/*.{js,ts,tsx,mdx}', // All routes inside /pages
    '_content/**/*.md', // All MDX files inside my /_content
    '!pages/**/[*.{js,jsx,ts,tsx}', // Ignore my dynamic route index Example /pages/blog/[slug].tsx
    '!pages/_*.{js,jsx,ts,tsx}', // Ignore next.js files
    '!pages/api', // Ignore API routes
    '!pages/admin.tsx' // Ignore pages not meant to be indexed
  ]);

  const isMarkdown = (path) => {
    const pathParts = path.split('.')
    const ext = pathParts[pathParts.length - 1]
    return ext === 'md' ? true : false
  }

  const isDraft = data => {
    return data.draft ? true : false
  }

  const getFrontMatter = (file) => {
    return matter(file).data
  }

  const getPageXML = (page) => {
    // isMarkdown
    if(isMarkdown(page)){
      const data = getFrontMatter(page)
      if(isDraft(data)){
        return null
      }
    }
    // Remove none route related parts of filename.
    const path = page
    .replace('pages', '')
    .replace('_content', '')
    .replace(/(.jsx|.js)/, '')
    .replace(/(.tsx|.ts)/, '')
    .replace('.md', '')
    .replace('/index','')
  // Remove the word index from route
  const route = path === '/index' ? '' : path;
  // Build url portion of sitemap.xml
  return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  `;
  }

  const urlSet = pages
    .map((page) => {
      return getPageXML(page)
    })
    .join('');

  // Add urlSet to entire sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  // Create sitemap file
  fs.writeFileSync('public/sitemap.xml', sitemap);
};

module.exports = generateSitemap;