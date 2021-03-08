import Image from 'next/image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

const Card = ({ article }) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div className="flex-shrink-0">
      <Image
        src={article.image.url}
        alt="avatar"
        layout="intrinsic"
        className="h-48 w-full object-cover"
        width={article.image.width}
        height={article.image.height}
      />
    </div>
    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-indigo-600">
          <a href={`/${article.category.slug}`} className="hover:underline">
            {article.category.name}
          </a>
        </p>
        <a href={`/${article.category.slug}/${article.slug}`} className="block mt-2">
          <p className="text-xl font-semibold text-gray-900">{article.title}</p>
          <p className="mt-3 text-base text-gray-500">{article.description}</p>
        </a>
      </div>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <a href="/about">
            <span className="sr-only">{article.author.name}</span>
            <Image
              src={article.author.picture.url}
              alt="avatar"
              layout="intrinsic"
              className="w-10 h-10 rounded-full"
              width="40"
              height="40"
            />
          </a>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            <a href="/about" className="hover:underline">
              {article.author.name}
            </a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(
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
