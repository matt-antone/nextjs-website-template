const fs = require('fs');
import site from '@data/site-data'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, CONTENT_PATH } from '@lib/mdxSections'
import shortcodes from '@lib/shortcodes'
import dynamic from 'next/dynamic';
import BlockContainer from '@components/blocks/BlockContainer';
import {convertImage} from '@components/CloudinaryImage'
import { NextSeo, ArticleJsonLd } from 'next-seo';
import {
  isMobile
} from "react-device-detect";
import Head from 'next/head'
import Hero from '@components/Hero'
import Layout from '@components/Layout'

const ShareButtons = dynamic( () => import('@components/ShareButtons'),{ssr: false})

const PAGE_DIR = '/blog'

export default function PostPage({ source, data, url }) {
  const { SITE_NAME,SEO_LOGO } = site
  const hero = {hero_image: data.featured_image ? data.featured_image : ''} //possibly add default image?
  return (
    <Layout title={data.title} metaTitle={data.meta_title} description={data.page_description} hero={data.hero}>
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
      <Head>
        <title>{data.title}</title>
        { hero && hero.hero_image && isMobile ? (
          <link
          rel="preload"
          href={convertImage(hero.hero_image,608,510,'c_fill,g_auto')}
          as="image"
        />
        ) : ''}
      </Head>
      <Hero hero={hero}>
        <BlockContainer>
          <main className="prose prose-brand-secondary relative z-20 min-h-hero">
            <article>
              <header>
                <h1>{data.title}</h1>
              </header>
              <div className="post-header">
                {data.page_description && (
                  <p className="description">{data.page_description}</p>
                )}
              </div>
              <MDXRemote {...source} components={shortcodes}/>
              <footer>
                  <ShareButtons url={url} title={data.title}/>
              </footer>
            </article>
          </main>
        </BlockContainer>
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

  return {
    props: {
      slug: params.slug,
      url: process.env.BASE_URL+PAGE_DIR+'/'+params.slug,
      source: pageSource,
      data: data,
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
