import Document, { Head, Html, Main, NextScript } from 'next/document'

import { getCssText } from '../stitches.config'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    try {
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* Stitches CSS for SSR */}
            <style
              id="stitches"
              dangerouslySetInnerHTML={{ __html: getCssText() }}
            />
          </>
        ),
      }
    } finally {
    }
  }
  
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
