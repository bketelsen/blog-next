import Image from 'next/image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

const Card = ({ article }) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div className="flex-shrink-0">
      <Image
        src={article.image.formats.small.url}
        width={article.image.formats.small.width}
        height={article.image.formats.small.height} />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-indigo-600">
          {article.category && (
            <Link href={article.category.slug}>
              {article.category.name}
            </Link>
          )}
        </p>
        <a href={`/${article.category.slug}/${article.slug}`} className="block mt-2">
          <p className="text-xl font-semibold text-gray-900">{article.title}</p>
          <p className="mt-3 text-base text-gray-500">{article.description}</p>
        </a>
      </div>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <span className="sr-only">
            {article.author.name}
            <a href="/about" className="hover:underline">
              {article.author.name}
            </a>
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            <a href="/about" className="hover:underline">
              {article.author.name}
            </a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString(
                siteMetadata.locale,
                postDateTemplate
              )}
            </time>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Card
