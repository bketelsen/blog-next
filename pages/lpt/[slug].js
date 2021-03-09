import { getArticleBySlug, getSortedArticles } from '@/lib/data'

import MDXComponents from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import PostLayout from '@/layouts/PostLayout'
import { RenderOptions } from '@/lib/render'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'

export async function getStaticPaths() {
  const articles = getSortedArticles()
  return {
    paths: articles.map((p) => ({
      params: {
        category: p.category.slug,
        slug: p.slug,
      },
    })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  const articles = getSortedArticles()
  const article = getArticleBySlug(params.slug)
  const mdxSource = await renderToString(article.content, RenderOptions())

  article.source = mdxSource
  const current = article
  const idx = articles.indexOf(current)
  var next = null
  var prev = null
  if (idx < articles.length - 1) {
    next = articles[idx + 1]
  }
  if (idx > 0) {
    prev = articles[idx - 1]
  }

  return {
    props: {
      post: article,
      next: next,
      prev: prev,
      slug: params.slug,
    },
  }
}

export default function Blog({ post, prev, next }) {
  const content = hydrate(post.source, {
    components: MDXComponents,
    scope: post.source,
  })

  return (
    <>
      <PostLayout post={post} prev={prev} next={next}>
        {content}
      </PostLayout>
    </>
  )
}
