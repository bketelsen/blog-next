import { BlogSeo } from '@/components/SEO'
import Category from '@/components/Category'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetdata from '@/data/siteMetadata'

const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetdata.siteUrl}/blog/${slug}`)}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ children, post, next, prev }) {
  const { slug, published_at, title } = post.frontMatter
  const category = post.relationships.category[0].frontMatter
  const category_url = post.relationships.category[0].url
  const author = post.relationships.author[0].frontMatter
  const author_url = post.relationships.author[0].url
  const avatar = post.relationships.author[0].relationships.avatar[0].frontMatter
  return (
    <SectionContainer>
      <BlogSeo url={`${siteMetdata.siteUrl}/${category.slug}/${slug}`} post={post} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={published_at}>
                      {new Date(published_at).toLocaleDateString(
                        siteMetdata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <Image
                      details={post.relationships.author[0].relationships.avatar[0].frontMatter}
                      className="flex items-center space-x-2"
                    />
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {post.relationships.author[0].frontMatter.name}
                      </dd>
                      <dt className="sr-only">Twitter</dt>
                      <dd>
                        <Link
                          href={post.relationships.author[0].frontMatter.twitter}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {post.relationships.author[0].frontMatter.twitter.replace(
                            'https://twitter.com/',
                            '@'
                          )}
                        </Link>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose lg:prose-xl dark:prose-dark max-w-none">
                {post.relationships.image && (
                  <Image details={post.relationships.image[0].frontMatter} />
                )}
                {children}
              </div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
              </div>
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Category
                  </h2>
                  <div className="flex flex-wrap">
                    <Category key={category.slug} text={category.name} slug={category_url} />
                  </div>
                  {post.tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="space-x-3 xl:flex xl:flex-col xl:space-x-0">
                        {post.tags.map((tag) => (
                          <Tag key={tag} text={tag.name} slug={tag.slug} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                          <Link href={`/${prev.category.slug}/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                          <Link href={`/${next.category.slug}/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/${prev.category.slug}"
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  &larr; Back
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
