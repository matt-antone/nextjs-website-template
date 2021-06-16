const fs = require('fs');
import site from '@data/site-data'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, CONTENT_PATH } from '@lib/mdxSections'
import shortcodes from '@lib/shortcodes'
import dynamic from 'next/dynamic';

import Hero from '../components/Hero'
import Layout from '../components/Layout'
import { NextSeo, ArticleJsonLd } from 'next-seo';

const Blocks = dynamic(() => import('@components/blocks/Blocks'),{ssr: false})
const ShareButtons = dynamic(() => import('@components/ShareButtons'),{ssr: false})
// import Blocks from '../components/blocks/Blocks'
// import ShareButtons from '../components/ShareButtons'


const PAGE_DIR = '/'
const { BASE_URL,SITE_NAME,SITE_DESC,SEO_LOGO,ORG,BUSINESS } = site

export default function PostPage({ heroSource, source, data, url }) {
  return (
    <Layout site={site} title={data.title} metaTitle={data.meta_title} description={data.page_description} hero={data.hero}>
      <NextSeo
        title={(data.meta_title || data.title)+' | '+SITE_NAME}
        description={data.page_description}
      />
      <ArticleJsonLd
        title={data.title}
        url={url}
        images={data.images}
        datePublished={data.date}
        dateModified=""
        publisherName={SITE_NAME}
        publisherLogo={SEO_LOGO}
        description={ data.page_description || ''}
      />
      <Hero hero={data.hero}>
      <div  className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
        <main className="prose prose-brand-secondary relative z-20">
          <article>
            <header>
              <h1>{data.title}</h1>
            </header>
            {
              heroSource ? (
                <MDXRemote {...heroSource} components={shortcodes} />
              ) : ''
            }
            <MDXRemote {...source} components={shortcodes}/>
            <Blocks blocks={data.content_blocks} landingPage={false}/>
            <footer>
                <ShareButtons url={url} title={data.title}/>
            </footer>
          </article>
        </main>
      </div>
      </Hero>
    </Layout>

  )
}

export const getStaticProps = async (context) => {
  const {params} = context
  const postFilePath = path.join(`${CONTENT_PATH}${PAGE_DIR}`, `${params.slug}.md`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)
  const pageSource = await serialize(content)
  const heroSource = await serialize(data.hero.hero_text)

  console.log(pageSource)

  return {
    props: {
      slug: params.slug,
      url: process.env.BASE_URL+PAGE_DIR+params.slug,
      source: pageSource,
      data: data,
      heroSource: heroSource,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths(PAGE_DIR,fs)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.(md|mdx)$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}