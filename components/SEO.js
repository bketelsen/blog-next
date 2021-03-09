import { ArticleJsonLd, NextSeo } from 'next-seo'

import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'

export const SEO = {
  title: global.siteName,
  description: global.defaultSeo.metaDescription,
  openGraph: {
    type: 'website',
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: global.siteName,
    description: global.defaultSeo.metaDescription,
    images: [
      {
        url: global.defaultSeo.shareImage.url,
        alt: global.defaultSeo.shareImage.alternativeText,
        width: global.defaultSeo.shareImage.width,
        height: global.defaultSeo.shareImage.height,
      },
    ],
  },
  twitter: {
    handle: `${global.writer.twitter.replace('https://twitter.com/', '@')}`,
    site: global.writer.twitter,
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: global.writer.name,
    },
  ],
}

export const PageSeo = ({ url, title, description }) => {
  return (
    <NextSeo
      title={`${title} – ${global.siteName}`}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
      }}
    />
  )
}

export const BlogSeo = ({ url, post }) => {
  const pubDate = new Date(post.frontMatter.published_at).toISOString()
  const modifiedAt = new Date(post.frontMatter.updated_at || pubDate).toISOString()
  let imagesArr = [post.frontMatter.share_image.url]

  const featuredImages = imagesArr.map((img) => {
    return {
      url: `${siteMetadata.siteUrl}${img}`,
      alt: post.frontMatter.share_image.alternativeText,
    }
  })

  return (
    <>
      <NextSeo
        title={`${post.frontMatter.seo.metaTitle} – ${global.siteName}`}
        description={post.description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: post.frontMatter.published_at,
            modifiedTime: modifiedAt,
            authors: [`${siteMetadata.siteUrl}/about`],
            tags: [post.relationships.category[0].name],
          },
          url,
          title: `${post.frontMatter.seo.metaTitle}`,
          description: post.frontMatter.seo.metaDescription,
          images: featuredImages,
        }}
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: featuredImages[0].url,
          },
        ]}
      />
      <ArticleJsonLd
        authorName={global.writer.name}
        dateModified={post.frontMatter.published_at}
        datePublished={modifiedAt}
        description={post.frontMatter.seo.metaDescription}
        images={featuredImages}
        publisherName={global.writer.name}
        title={post.frontMatter.seo.metaTitle}
        url={url}
      />
    </>
  )
}
