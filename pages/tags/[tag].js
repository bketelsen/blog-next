import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import generateRss from '@/lib/generate-rss'
import categories from '@/data/categories'
import articles from '@/data/articles'
import { dateSortDesc} from '@/lib/local-strapi'

const root = process.cwd()

export async function getStaticPaths() {
  return {
    paths: categories.map((tag) => ({
      params: {
        tag: tag.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const filteredPosts = articles.filter(
    (article) =>  article.category.slug === params.tag
  )
  const catFilter = categories.filter(
    (cat) =>  cat.slug === params.tag
  )
  const category = catFilter[0]
  // rss 
  /*
  const rss = generateRss(filteredPosts, `tags/${params.tag}/index.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
*/
  return { props: { posts: filteredPosts, tag: category } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = `# ${tag.plural}`
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
