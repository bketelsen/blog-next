import HomeCardList from '@/components/HomeCardList'
import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import { getAllMdxNodes } from 'next-mdx'
import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllMdxNodes('blog')

  return {
    props: {
      posts: posts.filter((post) => post.frontMatter.featured),
    },
  }
}
export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={global.defaultSeo.metaTitle}
        description={global.defaultSeo.metaDescription}
        url={siteMetadata.siteUrl}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <HomeCardList
          articles={posts.slice(0, MAX_DISPLAY)}
          title={global.defaultSeo.metaTitle}
          subTitle={global.defaultSeo.metaDescription}
        />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Articles &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
