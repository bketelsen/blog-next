import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import categories from '@/data/categories'
import articles from '@/data/articles'
import { dateSortDesc} from '@/lib/local-strapi'


export async function getStaticProps({ params }) {

  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const posts = articles.filter(
    (article) =>  article.category.slug === params.category
  )
  const catFilter = categories.filter(
    (cat) =>  cat.slug === params.category
  )
  const category = catFilter[0]
  return { props: { posts,category } }
}
export async function getStaticPaths() {

  return {
    paths: categories.map((p) => ({
      params: {
        category: p.slug,
      },
    })),
    fallback: false,
  }
}
export default function Blog({ posts,category }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <ListLayout posts={posts} title={`All ${category.name} Entries`} />
    </>
  )
}
