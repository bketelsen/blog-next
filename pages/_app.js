import '@/css/tailwind.css'

import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'
import { MDXProvider } from '@mdx-js/react'
import { SEO } from '@/components/SEO'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default MyApp
