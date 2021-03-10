import MDXComponents from '@/components/MDXComponents'
import PostLayout from '@/layouts/PostLayout'
import ReactMarkdown from "react-markdown";
import { fetchAPI } from "@/lib/api";

export const getStaticPaths = async () => {
  const articles = await fetchAPI("/articles");
  const filteredArticles = articles.filter((a) => {
    return a.category.slug === 'lpt'
  })
  // Get the paths we want to pre-render based on posts
  const paths = filteredArticles.map((article) => ({
    params: { slug: article.slug },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}`
  );
  const categories = await fetchAPI("/categories");
  return {
    props: { post: articles[0], categories },
    revalidate: 1,
  };
}



export default function Blog({ post, prev, next }) {
  return (
    <>
      <PostLayout post={post} prev={prev} next={next}>
        <ReactMarkdown source={post.content} escapeHtml={false} />
      </PostLayout>
    </>
  )
}
