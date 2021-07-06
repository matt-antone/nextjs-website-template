import { DefaultSeo } from 'next-seo'
import Footer from '@components/Footer'
import Notifictation from '@components/Notification'
import SiteHeader from '@components/SiteHeader'
import SkipMenu from '@components/basic/SkipMenu'
import note from '@data/notification.json'
import site from '@data/site-data'

export default function Layout({ children,title = '',metaTitle = '', description = '', hero = {} }) {
  const { BASE_URL,SITE_NAME,SITE_DESC,SEO_LOGO,ORG } = site
  return (
    <>
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
      <div className="relative z-10 min-h-90 bg-white">
        { note.content ? (
          <Notifictation note={note}/>
        ) : ""}
        <SiteHeader/>
        <div id="content" className="relative z-50">
          {children}
        </div>
        <Footer/>
      </div>
    </>
  )
}
