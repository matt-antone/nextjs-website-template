import site from './site-data.json'
import testimonials from './testimonials'

module.exports = {
  SITE_NAME: site.SITE_NAME,
  GOOGLE_KEY: site.GOOGLE_KEY,
  ORG: {
    name: site.ORG.name,
    context: site.ORG.context,
    type: site.ORG.type,
    description: site.SITE_DESC,
    url: site.ORG.url,
    logo: site.ORG.logo
  },
  BUSINESS: {
    type: site.BUSINESS.type,
    id: site.BUSINESS.id,
    phone: site.BUSINESS.phone,
    reviews: testimonials
  },
}