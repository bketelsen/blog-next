import {
  getArticleBySlug,
  getArticlesByCategorySlug,
  getCategories,
  getCategoryBySlug,
} from '@/lib/data'

import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import fs from 'fs'
import generateRss from '@/lib/generate-rss'
import path from 'path'
import siteMetadata from '@/data/siteMetadata'

const root = process.cwd()

export async function getStaticProps({ params }) {
  const articles = getArticlesByCategorySlug(params.category)
  const category = getCategoryBySlug(params.category)
  var page = getArticleBySlug(params.slug)

  if (page) {
    return {
      redirect: {
        destination: `/${page.category.slug}/${page.slug}`,
        permanent: true,
      },
    }
  }
  // rss
  if (!page) {
    const rss = generateRss(articles, `/${params.category}`, `tags/${params.category}/index.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.category)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
  }

  return { props: { posts: articles, category } }
}
export async function getStaticPaths() {
  const categories = getCategories()
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
      {posts && <ListLayout posts={posts} title={category ? category.plural : 'No Category'} />}
    </>
  )
}
