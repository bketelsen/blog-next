import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import { fetchAPI } from "@/lib/api";
import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticProps({ params }) {
  const articles = await fetchAPI("/articles");
  const filteredArticles = articles.filter((a) => {
    return a.category.slug === 'byte'
  })
  return {
    props: { posts: filteredArticles }
  }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSeo
        title={`Quick Bytes - ${global.writer.name}`}
        description={global.defaultSeo.metaDescription}
        url={`${siteMetadata.siteUrl}/bytes`}
      />
      {posts && <ListLayout posts={posts} title={'Quick Bytes'} />}
    </>
  )
}
