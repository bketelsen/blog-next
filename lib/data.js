import articles from '@/data/articles'
import categories from '@/data/categories'
import global from '@/data/global'
import siteMetadata from '@/data/siteMetadata'
import tags from '@/data/tags'
import writers from '@/data/writers'

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
export function sortOn(arr, prop) {
  arr.sort(function (a, b) {
    if (a[prop] < b[prop]) {
      return -1
    } else if (a[prop] > b[prop]) {
      return 1
    } else {
      return 0
    }
  })
}

export function getSortedArticles(max = null, excludeCategory = null) {
  var sorted = articles.sort((a, b) => dateSortDesc(a.publishedAt, b.publishedAt))
  if (max) {
    sorted = sorted.slice(0, max)
  }
  if (excludeCategory) {
    sorted = sorted.filter((a) => a.category.slug !== excludeCategory)
  }
  return sorted
}
export function getArticleBySlug(slug) {
  const article = articles.find((a) => a.slug === slug)

  return article
}
export function getArticlesByTagSlug(slug) {
  const tag = getTagBySlug(slug)
  return tag.articles.map((article) => getArticleBySlug(article.slug))
}
export function getArticlesByCategorySlug(slug) {
  const posts = articles.filter((article) => article.category.slug === slug)
  return posts
}
export function getCategories() {
  return categories
}
export function getCategory(id) {
  var category = categories.find((c) => c.id === id)
  return category
}
export function getCategoryBySlug(slug) {
  var category = categories.find((c) => c.slug === slug)
  return category
}
export function getGlobal() {
  return global
}
export function getWriters() {
  return writers
}
export function getTags() {
  return tags
}
export function getTagBySlug(slug) {
  var tag = tags.find((c) => c.slug === slug)
  return tag
}
export function getWriter(id) {
  var writer = writers.find((w) => w.id === id)
  return writer
}
