import HomeCardList from '@/components/HomeCardList'
import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import { fetchAPI } from "@/lib/api";
import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
  ]);
  return {
    props: { articles, categories },
    revalidate: 1,
  };
}
export default function Home({ articles, categories }) {
  return (
    <>
      <PageSeo
        title={global.defaultSeo.metaTitle}
        description={global.defaultSeo.metaDescription}
        url={siteMetadata.siteUrl}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <HomeCardList
          articles={articles.slice(0, MAX_DISPLAY)}
          title={global.defaultSeo.metaTitle}
          subTitle={global.defaultSeo.metaDescription}
        />
      </div>
      <div className="pt-4 flex justify-center">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            type="button"
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <Link
              href="/blog"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="all posts"
            >
              Articles &rarr;
            </Link>
          </button>
          <button
            type="button"
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <Link
              href="/bytes"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="all bytes"
            >
              Bytes &rarr;
            </Link>
          </button>
          <button
            type="button"
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <Link
              href="/lpt"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="all life pro tips"
            >
              Life Pro Tips &rarr;
            </Link>
          </button>
          <button
            type="button"
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <Link
              href="/blog"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="all projects"
            >
              Pr  ojects &rarr;
            </Link>
          </button>
        </span>
      </div>
      {articles.length > MAX_DISPLAY && (
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
