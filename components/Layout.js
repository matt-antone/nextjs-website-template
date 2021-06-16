import {convertImage} from '@components/CloudinaryImage'

import { DefaultSeo,LocalBusinessJsonLd } from 'next-seo'
import Footer from '../components/Footer'
import Head from 'next/head'
import Notifictation from '../components/Notification'
import SiteHeader from '../components/SiteHeader'
import SkipMenu from './basic/SkipMenu'
import note from '@data/notification.json'
import site from '@data/site-data'

export default function Layout({ children,title = '',metaTitle = '', description = '', hero = {} }) {
  const { BASE_URL,SITE_NAME,SITE_DESC,SEO_LOGO,ORG } = site
  return (
    <>
      <Head>
        { hero && hero.hero_image ? (
          <link
          rel="preload"
          href={convertImage(hero.hero_image,608,510,'c_fill,g_auto')}
          as="image"
        />
        ) : ''}
      </Head>
      <DefaultSeo
        title={title}
        description={description}
        canonical={BASE_URL}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: ORG.url,
          site_name: SITE_NAME,
          description: SITE_DESC,
        }}
      />
      <SkipMenu/>
      <Notifictation note={note}/>
      <SiteHeader/>
      <div id="content" className="relative z-50 bg-white">{children}</div>
      <Footer/>
    </>
  )
}
