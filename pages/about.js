import Image from 'next/image'
import MDXComponents from '@/components/MDXComponents'
import { PageSeo } from '@/components/SEO'
import { RenderOptions } from '@/lib/render'
import SocialIcon from '@/components/social-icons'
import global from '@/data/global'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticProps() {
  const mdxSource = await renderToString(global.writer.bio, RenderOptions())

  return {
    props: {
      bio: mdxSource,
    },
  }
}

export default function About({ bio }) {
  const content = hydrate(bio, {
    components: MDXComponents,
    scope: bio,
  })
  return (
    <>
      <PageSeo
        title={`About ${global.writer.name}`}
        description={`About me - ${global.writer.name}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <Image
              src={global.writer.picture.url}
              height={global.writer.picture.height}
              width={global.writer.picture.width}
              className="w-48 h-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {global.writer.name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{global.writer.jobtitle}</div>
            <div className="text-gray-500 dark:text-gray-400">{global.writer.company}</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${global.writer.email}`} />
              <SocialIcon kind="github" href={global.writer.github} />
              <SocialIcon kind="youtube" href={global.writer.youtube} />
              <SocialIcon kind="linkedin" href={global.writer.linkedin} />
              <SocialIcon kind="twitter" href={global.writer.twitter} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{content}</div>
        </div>
      </div>
    </>
  )
}
