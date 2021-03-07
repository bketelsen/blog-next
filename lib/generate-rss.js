import siteMetadata from '@/data/siteMetadata'
import global from '@/data/global'

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/${post.category.slug}/${post.slug}</guid>
    <title>${post.title}</title>
    <link>${siteMetadata.siteUrl}/${post.category.slug}/${post.slug}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    <category>${post.category.name}</category>
  </item>
`

const generateRss = (posts,path, page = 'index.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${global.siteName}</title>
      <link>${siteMetadata.siteUrl}${path}</link>
      <description>${global.defaultSeo.metaDescription}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${global.writer.email} (${global.writer.name})</managingEditor>
      <webMaster>${global.writer.email} (${global.writer.name})</webMaster>
      <lastBuildDate>${new Date(posts[0].updated_at).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss
