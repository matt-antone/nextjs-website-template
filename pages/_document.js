import Document, { Html, Head, Main, NextScript } from 'next/document'
import site from '../_data/site-data'

class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getSt(ctx)
    return { ...initialProps }
  }



  onComponentDidMount(){
    // this.initAos()
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://res.cloudinary.com"/>
          <link rel="dns-prefetch" href="https://res.cloudinary.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link rel="preload"
                as="style"
                href={site.GOOGLE_FONT} />
          <link rel="stylesheet"
                href={site.GOOGLE_FONT}
                media="print" onLoad="this.media='all'" />
          <noscript>
            <link rel="stylesheet"
                href={site.GOOGLE_FONT} />
          </noscript>

        </Head>
        <body className={`w-full pb-16`}>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument