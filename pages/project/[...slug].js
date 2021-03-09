import { getMdxNode, getMdxPaths } from 'next-mdx/server'

import MDXComponents from '@/components/MDXComponents'
import PostLayout from '@/layouts/PostLayout'
import { useHydrate } from 'next-mdx/client'

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('project'),
    fallback: false,
  }
}
export async function getStaticProps(context) {
  const post = await getMdxNode('project', context)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}

export default function Blog({ post, prev, next }) {
  const content = useHydrate(post, {
    components: MDXComponents,
  })

  return (
    <>
      <PostLayout post={post} prev={prev} next={next}>
        {content}
      </PostLayout>
    </>
  )
}
