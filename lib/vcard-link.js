import { convertImage } from '@components/CloudinaryImage'
import site from '@data/site-data'
const {BASE_URL,ORG,BUSINESS} = site
//console.log(ORG)



const vcardParams = (data) => {
  // //console.log(data)
  let query = ''
  data.first_name ? query += `firstName=${data.first_name}&` : ''
  data.middle_name ? query += `middleName=${data.middle_name}&` : ''
  data.last_name ? query += `lastName=${data.last_name}&` : ''
  data.email ? query += `email=${data.email}&` : ''
  data.position ? query += `position=${data.position}&` : ''
  ORG.name ? query += `company=${ORG.name}&` : ''
  BUSINESS.phone ? query += `phone=${BUSINESS.phone.replace('+','')}&` : ''
  BASE_URL ? query += `permalink=${BASE_URL}&` : ''
  BUSINESS.address.streetAddress ? query += `address1=${BUSINESS.address.streetAddress}&` : ''
  BUSINESS.address.addressLocality ? query+= `city=${BUSINESS.address.addressLocality}&` : ''
  BUSINESS.address.addressRegion ? query += `state=${BUSINESS.address.addressRegion}&` : ''
  BUSINESS.address.postalCode ? query += `zip=${BUSINESS.address.postalCode}&` : ''
  BUSINESS.address.addressCountry ? query += `country=${BUSINESS.address.addressCountry}&` : ''
  data.linked_in ? query += `linkedin=${encodeURIComponent(data.linked_in)}&` : ''
  data.featured_image ? query += `image=${encodeURIComponent(convertImage(data.featured_image,100,100))}&` : ''
  return query
}
export default vcardParams