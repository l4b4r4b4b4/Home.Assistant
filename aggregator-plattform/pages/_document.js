import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='de'>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          /> */}
          {/* <link
            rel='preload'
            href='/fonts/BrowalliaNew.woff2'
            as='font'
            crossOrigin='anonymous'
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/fonts/BrowalliaNew.woff'
            as='font'
            crossOrigin='anonymous'
            type='font/woff'
          />
          <link
            rel='preload'
            href='/fonts/BrowalliaNew.ttf'
            as='font'
            crossOrigin='anonymous'
            type='font/ttf'
          /> */}
        </Head>
        <body>
          <div style={{ maxHeight: '100vh' }} id='overlays' />
          <div id='drawer-hook' />
          <div id='newsletter-popup' />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
