import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import { fetchAPI } from "@/lib/api";
import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticProps({ params }) {
  const articles = await fetchAPI("/articles");
  const filteredArticles = articles.filter((a) => {
    return a.category.slug === 'lpt'
  })
  return {
    props: { posts: filteredArticles }
  }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSeo
        title={`Life ProTips - ${global.writer.name}`}
        description={global.defaultSeo.metaDescription}
        url={`${siteMetadata.siteUrl}/lpt`}
      />
      {posts && <ListLayout posts={posts} title={'Life ProTips'} />}
    </>
  )
}
