import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import PostLayout from '@/layouts/PostLayout'
import MDXComponents from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import categories from '@/data/categories'
import articles from '@/data/articles'
import { dateSortDesc} from '@/lib/local-strapi'
import imgToJsx from '../lib/img-to-jsx'
const visit = require('unist-util-visit')


export async function getStaticPaths() {
  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const filteredPosts = articles.filter(
    (article) =>  article.category.slug === 'page'
  )
  return {
    paths: articles.map((p) => ({
      params: {
        slug: p.slug,
      },
    })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {

  articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  const filteredPosts = articles.filter(
    (article) =>  article.slug === params.slug
  )
  const mdxSource = await renderToString(filteredPosts[0].content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-code-titles'),
        require('remark-math'),
        imgToJsx,
      ],
      inlineNotes: true,
      rehypePlugins: [
        require('rehype-katex'),
        require('@mapbox/rehype-prism'),
        () => {
          return (tree) => {
            visit(tree, 'element', (node, index, parent) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [tokenClassNames[type]]
              }
            })
          }
        },
      ],
    },
  })

  filteredPosts[0].source=mdxSource
  const current = filteredPosts[0]
  const idx = articles.indexOf(current)
  var next = null
  var prev = null
  if (idx < articles.length-1) {
    next = articles[idx+1]
  }
  if (idx > 0) {
    prev = articles[idx-1]
  }

  
  return { props: { 
    post: filteredPosts[0], 
    next: next,
    prev: prev,
    slug: params.slug } }
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
