import ImageWrapper, { sizes } from './ImageWrapper'

import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

const Card = ({ article }) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div className="flex-shrink-0">
      <ImageWrapper size={sizes.small} details={article.relationships.image[0].frontMatter} />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-indigo-600">
          {article.relationships.category.map((category, index) => (
            <Link key={index} href={category.url}>
              {category.frontMatter.name}
            </Link>
          ))}
        </p>
        <a href={`${article.url}`} className="block mt-2">
          <p className="text-xl font-semibold text-gray-900">{article.frontMatter.title}</p>
          <p className="mt-3 text-base text-gray-500">{article.frontMatter.excerpt}</p>
        </a>
      </div>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          {article.relationships.author.length
            ? article.relationships.author.map((author, index) => (
                <span key={index} className="sr-only">
                  {author.name}
                  <Link key={index} href={author.url}>
                    {author.frontMatter.name}
                  </Link>
                </span>
              ))
            : null}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            <a href="/about" className="hover:underline">
              {article.relationships.author.length
                ? article.relationships.author.map((author, index) => author.name)
                : null}
            </a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={article.frontMatter.published_at}>
              {new Date(article.frontMatter.published_at).toLocaleDateString(
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
