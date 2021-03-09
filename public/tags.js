import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import { getTags } from '@/lib/data'
import global from '@/data/global'
import { kebabCase } from '@/lib/utils'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticProps() {
  const tags = getTags()
  return { props: { tags } }
}

export default function Tags({ tags }) {
  //const sortedTags = tags.sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSeo
        title={`Tags - ${global.writer.name}`}
        description={global.defaultSeo.metaDescription}
        url={`${siteMetadata.siteUrl}/tags`}
      />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {tags.map((t) => {
            if (t.articles.length > 0) {
              return (
                <div key={t.slug} className="mt-2 mb-2 mr-5">
                  <Tag text={t.name} slug={t.slug} />
                  <Link
                    href={`/tags/${t.slug}`}
                    className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  >
                    {` (${t.articles.length})`}
                  </Link>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}
