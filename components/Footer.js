import Link from './Link'
import SocialIcon from '@/components/social-icons'
import Subscribe from './Subscribe'
import global from '@/data/global'

export default function Footer() {
  return (
    <footer>
      <Subscribe />
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialIcon kind="mail" href={`mailto:${global.writer.email}`} size="6" />
          <SocialIcon kind="github" href={global.writer.github} size="6" />
          <SocialIcon kind="youtube" href={global.writer.youtube} size="6" />
          <SocialIcon kind="linkedin" href={global.writer.linkedin} size="6" />
          <SocialIcon kind="twitter" href={global.writer.twitter} size="6" />
        </div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{global.writer.name}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/bketelsen/blog-next">
            View on GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
