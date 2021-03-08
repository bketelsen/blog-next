import { getGlobal, getSortedArticles } from '@/lib/data'

import HomeCardList from '@/components/HomeCardList'
import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import fs from 'fs'
import generateRss from '@/lib/generate-rss'
import path from 'path'
import siteMetadata from '@/data/siteMetadata'

const root = process.cwd()

const MAX_DISPLAY = 3
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const articles = getSortedArticles(null, 'page')
  const global = getGlobal()
  const rss = generateRss(articles, '', `index.xml`)
  const rssPath = path.join(root, 'public')
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)
  return { props: { global, articles } }
}

export default function Home({ global, articles }) {
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
          title={'Latest'}
          subTitle={global.defaultSeo.metaTitle}
        />
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
