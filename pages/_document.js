import Document, { Html, Head, Main, NextScript } from 'next/document'

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
          <link rel="preconnect" href="https://unpkg.com"/>
          <link rel="preload"
                as="style"
                href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,800;1,400;1,500;1,800&display=swap" />
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,800;1,400;1,500;1,800&display=swap"
                media="print" onLoad="this.media='all'" />
          <link
                rel="preload"
                as="style"
                href="https://unpkg.com/aos@2.3.1/dist/aos.css"
                media="print" onLoad="this.media='all'"/>
          <noscript>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,800;1,400;1,500;1,800&display=swap" />
          </noscript>
        </Head>
        <body className={`w-full pb-16`}>
          <Main/>
          <NextScript/>
          <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument