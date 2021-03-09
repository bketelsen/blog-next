import Link from 'next/link'
import { kebabCase } from '@/lib/utils'

const Category = ({ slug, text }) => {
  return (
    <Link href={`${slug}`}>
      <a className="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400">
        {text}
      </a>
    </Link>
  )
}

export default Category
