import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import { getFile , dateSortDesc} from '@/lib/local-strapi'

export async function getStaticProps() {
  const articles = await getFile('articles.json')
  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const posts = articles.filter(
    (article) =>  article.category.slug === "blog"
  )

  return { props: { posts,articles } }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <ListLayout posts={posts} title="All Posts" />
    </>
  )
}
