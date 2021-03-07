import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'

import { PageSeo } from '@/components/SEO'
import categories from '@/data/categories'
import articles from '@/data/articles'
import { dateSortDesc } from '@/lib/local-strapi'
import generateRss from '@/lib/generate-rss'
import path from 'path'
import fs from 'fs'


const root = process.cwd()

export async function getStaticProps({ params }) {

  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const posts = articles.filter(
    (article) => article.category.slug === params.category
  )
  var page = null
  const pages = articles.filter(
    (article) => article.slug === params.category
  )
  if (pages.length > 0) {
    page = pages[0]
 
  }
  if (page) {
    return {
      redirect: {
        destination: `/${page.category.slug}/${page.slug}`,
        permanent: true,
      },
    }
  }
  const catFilter = categories.filter(
    (cat) => cat.slug === params.category
  )
  var category = null
  if (catFilter.length > 0) {
    category = catFilter[0]
  }
  // rss 
  if (!page) {
    const rss = generateRss(posts, `/${params.category}`, `tags/${params.category}/index.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.category)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
  }

  return { props: {  posts, category } }
}
export async function getStaticPaths() {

  return {
    paths: categories.map((p) => ({
      params: {
        category: p.slug,
      },
    })),
    fallback: true,
  }
}
export default function Blog({ posts, category }) {

  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
        { posts &&  
        <ListLayout posts={posts} title={category? category.plural : "No Category"} />
}
    </>
  )
}
