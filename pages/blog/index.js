import ListLayout from '@/layouts/ListLayout'
import MDXComponents from '@/components/MDXComponents'
import { PageSeo } from '@/components/SEO'
import { getAllMdxNodes } from 'next-mdx'
import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticProps({ params }) {
  const posts = await getAllMdxNodes('blog', {
    components: MDXComponents,
  })

  /* rss
  if (!page) {
    const rss = generateRss(articles, `/${params.category}`, `tags/${params.category}/index.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.category)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
  }
*/
  return { props: { posts: posts } }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${global.writer.name}`}
        description={global.defaultSeo.metaDescription}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      {posts && <ListLayout posts={posts} title={'Articles'} />}
    </>
  )
}
