import {
  getArticleBySlug,
  getArticlesByCategorySlug,
  getArticlesByTagSlug,
  getCategoryBySlug,
  getTagBySlug,
  getTags,
} from '@/lib/data'

import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import generateRss from '@/lib/generate-rss'
import siteMetadata from '@/data/siteMetadata'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = getTags()
  return {
    paths: tags.map((tag) => ({
      params: {
        tag: tag.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const tag = getTagBySlug(params.tag)
  const articles = getArticlesByTagSlug(params.tag)
  // rss
  /*
  const rss = generateRss(filteredPosts, `tags/${params.tag}/index.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
*/
  return { props: { posts: articles, tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = `# ${tag.name}`
  return (
    <>
      <PageSeo
        title={`${tag.name} - ${siteMetadata.title}`}
        description={`${tag.name} tags - ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/tags/${tag}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
