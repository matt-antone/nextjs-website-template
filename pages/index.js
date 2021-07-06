// Data
import site from '@data/site-data'
import testimonials from '@data/testimonials'
// Utilities
import {
  isMobile
} from "react-device-detect";

// HTML Components
import Head from 'next/head'
import Layout from '@components/Layout'
import { LocalBusinessJsonLd } from 'next-seo'
import allpages from '@cache/data.json'

// const Testimonial = dynamic( () => import('@components/basic/Testimonial'),{ssr: false})
// const Blocks = dynamic( () => import('../components/blocks/Blocks'),{ssr: false,})
// const RecentPosts = dynamic(() => import ('@components/blocks/RecentPosts'),{ssr: false,})

const PAGE_DIR = '/'

export default function Index({posts,data,heroSource,}) {
  const { BASE_URL,SITE_NAME,SITE_DESC,BUSINESS } = site
  return (
    <Layout site={site} title={data.title} metaTitle={data.meta_title} description={data.page_description} hero={data.hero}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <LocalBusinessJsonLd
        type={BUSINESS.type}
        id={BUSINESS.id}
        name={SITE_NAME}
        description={SITE_DESC}
        url={BASE_URL}
        telephone={BUSINESS.phone}
        address={{
          streetAddress: BUSINESS.address.streetAddress,
          addressLocality: BUSINESS.address.addressLocality,
          addressRegion:  BUSINESS.address.addressRegion,
          postalCode: BUSINESS.address.postalCode,
          addressCountry: BUSINESS.address.addressCountry,
        }}
        images={BUSINESS.images}
        openingHours={BUSINESS.openingHours}
        reviews={testimonials.testimonials}
      />
      {/* <Blocks blocks={data.content_blocks}/>
      <Testimonial content={shuffle(testimonials.testimonials)[0]}/>
      <RecentPosts posts={posts}/> */}
    </Layout>
  )
}

export async function getStaticProps(context){
  const { params } = context

  // Get Posts
  const page = allpages.filter(page => page.id === '/' ? true : false)[0]
  const posts = allpages.filter(page => page.id.includes('blog') ? true : false)
  console.log(page)
  // const postFilePath = path.join(`${CONTENT_PATH}`, `index.md`)
  // const source = fs.readFileSync(postFilePath)
  // const { content, data } = matter(source)

  return {
    props: {
      posts: posts,
      data: page.data,
    },
  }
}