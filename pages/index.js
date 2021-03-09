import HomeCardList from '@/components/HomeCardList'
import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import { getAllMdxNodes } from 'next-mdx'
import siteMetadata from '@/data/siteMetadata'

const root = process.cwd()

const MAX_DISPLAY = 3
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const posts = await getAllMdxNodes('post')

  return {
    props: {
      posts: posts.filter((post) => post.frontMatter.featured),
    },
  }
}
export default function Home({ posts }) {
  return (
    <>
      <PageSeo title="title" description="description" url={siteMetadata.siteUrl} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <HomeCardList
          articles={posts.slice(0, MAX_DISPLAY)}
          title={'Latest'}
          subTitle={'Subtitle'}
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
