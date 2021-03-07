import Link from 'next/link'
import { kebabCase } from '@/lib/utils'

const Tag = ({ slug, text }) => {
  return (
    <Link href={`/tags/${slug}`}>
      <a className="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400">
        {text}
      </a>
    </Link>
  )
}

export default Tag
