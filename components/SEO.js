import { NextSeo, ArticleJsonLd } from 'next-seo'
import siteMetadata from '@/data/siteMetadata'
import global from '@/data/global'

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

export const PageSeo = ({ url, title, description}) => {
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

export const BlogSeo = ({ url,post}) => {
  const pubDate = new Date(post.publishedAt).toISOString()
  const modifiedAt = new Date(post.updated_at || pubDate).toISOString()
  let imagesArr =
      [post.seo.shareImage.url]

  
    const featuredImages = imagesArr.map((img) => {
    return {
      url: `${siteMetadata.siteUrl}${img}`,
      alt: post.seo.shareImage.alternativeText,
    }
  })

  return (
    <>
      <NextSeo
        title={`${post.seo.metaTitle} – ${global.siteName}`}
        description={post.description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: post.publishedAt,
            modifiedTime: modifiedAt,
            authors: [`${siteMetadata.siteUrl}/about`],
            tags:[post.category.name],
          },
          url,
          title:`${post.seo.metaTitle}`,
          description: post.description,
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
        dateModified={post.publishedAt}
        datePublished={modifiedAt}
        description={post.description}
        images={featuredImages}
        publisherName={global.writer.name}
        title={post.seo.metaTitle}
        url={url}
      />
    </>
  )
}
