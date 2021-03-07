import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import PostLayout from '@/layouts/PostLayout'
import MDXComponents from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import categories from '@/data/categories'
import articles from '@/data/articles'
import { dateSortDesc} from '@/lib/local-strapi'

export async function getStaticPaths() {

  return {
    paths: articles.map((p) => ({
      params: {
        category: p.category.slug,
        slug: p.slug,
      },
    })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {

  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const filteredPosts = articles.filter(
    (article) =>  article.slug === params.slug
  )
  const mdxSource = await renderToString(filteredPosts[0].content, { MDXComponents })
  filteredPosts[0].source=mdxSource
  // rss 
  /*
  const rss = generateRss(filteredPosts, `tags/${params.tag}/index.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
*/
  return { props: { post: filteredPosts[0], slug: params.slug } }
}

/*
export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => post.slug === params.slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug)

  // rss
  const rss = generateRss(allPosts)
  fs.writeFileSync('./public/index.xml', rss)

  return { props: { post, prev, next } }
}
*/
export default function Blog({ post, prev, next }) {

  const content = hydrate(post.source, {
    components: MDXComponents,
    scope: post.source,
  })

  return (
    <>
        <PostLayout post={post} prev={post} next={post}>
          {content}
        </PostLayout>
    </>
  )
}
