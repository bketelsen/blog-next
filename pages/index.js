import { getGlobal, getSortedArticles } from '@/lib/data'

import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import fs from 'fs'
import generateRss from '@/lib/generate-rss'
import path from 'path'
import siteMetadata from '@/data/siteMetadata'

const root = process.cwd()

const MAX_DISPLAY = 7
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const articles = getSortedArticles(MAX_DISPLAY, 'page')
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
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {global.defaultSeo.metaTitle}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!articles.length && 'No posts found.'}
          {articles.map((article) => {
            const { slug, publishedAt, title, description, category } = article
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={publishedAt}>
                          {new Date(publishedAt).toLocaleDateString(
                            siteMetadata.locale,
                            postDateTemplate
                          )}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${category.slug}/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            <Tag key={category.slug} slug={category.slug} text={category.name} />
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/${category.slug}/${slug}`}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {articles.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
