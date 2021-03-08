const fs = require('fs')

const generateSitemap = async () => {
  console.log('generating sitemap')
  const data = fs.readFileSync('data/articles.json', { encoding: 'utf8', flag: 'r' })
  const articles = JSON.parse(data)
  const urlSet = articles
    .map((article) => {
      // Build url portion of sitemap.xml
      return `<url><loc>https://www.brian.dev/${article.category.slug}/${article.slug}</loc></url>`
    })
    .join('')

  const cats = fs.readFileSync('data/categories.json', { encoding: 'utf8', flag: 'r' })
  const categories = JSON.parse(cats)
  const curlSet = categories
    .map((cat) => {
      // Build url portion of sitemap.xml
      return `<url><loc>https://www.brian.dev/${cat.slug}</loc></url>`
    })
    .join('')
  const home = `<url><loc>https://www.brian.dev</loc></url>`
  const about = `<url><loc>https://www.brian.dev/about</loc></url>`

  // Add urlSet to entire sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}${curlSet}${home}${about}</urlset>`

  // Create sitemap file
  fs.writeFileSync('public/sitemap.xml', sitemap)
}

module.exports = generateSitemap
