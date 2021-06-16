const fs = require('fs');
// Data
import site from '@data/site-data'
import testimonials from '@data/testimonials'
// Utilities
import dynamic from 'next/dynamic'
import matter from 'gray-matter'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { getPosts, CONTENT_PATH } from '@lib/pages'
import {convertImage} from '../components/CloudinaryImage'
import {
  isMobile
} from "react-device-detect";
import shuffle from 'shuffle-array'
// HTML Components
import Head from 'next/head'
import Hero from '@components/Hero'
import Layout from '@components/Layout'
import { LocalBusinessJsonLd } from 'next-seo'
const Testimonial = dynamic( () => import('@components/basic/Testimonial'),{ssr: false})
const Blocks = dynamic( () => import('../components/blocks/Blocks'),{ssr: false,})
const RecentPosts = dynamic(() => import ('@components/blocks/RecentPosts'),{ssr: false,})

const PAGE_DIR = '/'

export default function Index({posts,data,heroSource,}) {
  const { BASE_URL,SITE_NAME,SITE_DESC,BUSINESS } = site
  return (
    <Layout site={site} title={data.title} metaTitle={data.meta_title} description={data.page_description} hero={data.hero}>
      <Head>
        <title>{data.title}</title>
        { !isMobile ? (
          <link
          rel="preload"
          href={convertImage(data.hero.hero_image,608,510,'c_fill,g_auto')}
          as="image"
        />
        ) : ''}
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
      <Hero
        hero={data.hero}
        heroSource={heroSource}
        video={data.video}
        videoText={data.video_text ? data.video_text : ''}/>
      <Blocks blocks={data.content_blocks}/>
      <Testimonial content={shuffle(testimonials.testimonials)[0]}/>
      <RecentPosts posts={posts}/>
    </Layout>
  )
}

export async function getStaticProps(context){
  const { params } = context

  // Get Posts
  const posts = getPosts(`${PAGE_DIR}/updates/**/*`)

  const postFilePath = path.join(`${CONTENT_PATH}`, `index.md`)
  const source = fs.readFileSync(postFilePath)

  const { data } = matter(source)
  const heroSource = await serialize(data.hero.hero_text)

  return {
    props: {
      posts: posts,
      data: data,
      heroSource: heroSource,
    },
  }
}